using Eto.Forms;
using System;
using System.Collections.Concurrent;
using System.IO;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace TheorySDK
{
    public class App
    {
        public Action DataLoaded;
        public Action ClientConnected;
        public Action ClientDisconnected;

        private Data _data = new Data();
        public Data Data { get => _data; private set => _data = value; }
        public Logger Logger { get; private set; } = new Logger();

        private long _messageId = 0;
        private ConcurrentDictionary<long, string> _remoteResults = new ConcurrentDictionary<long, string>();
        private Semaphore _remoteResultsSemaphore = new Semaphore(0, int.MaxValue);

        public FileWatcher _fileWatcher { get; set; } = null;
        private TcpServer _tcpServer { get; set; } = null;
        private object _tcpServerMutex = new object();

        private CancellationTokenSource _remoteCancellationTokenSource = null;
        private object _remoteCancellationTokenSourceMutex = new object();

        public void OnStart()
        {
            try
            {
                Serializer.Deserialize(out _data);
            }
            catch(Exception)
            {
                Data = new Data();
            }

            DataLoaded?.Invoke();
            Data.IpAddressChanged += CreateTcpServer;
            Data.PortChanged += CreateTcpServer;
            Data.TheoryPathChanged += () =>
            {
                CreateFileWatcher();
                SendTheory();
            };

            CreateTcpServer();
            CreateFileWatcher();
        }

        public void OnExit()
        {
            if (_tcpServer != null)
                _tcpServer.Dispose();

            if (_fileWatcher != null)
                _fileWatcher.Dispose();

            Save();
        }

        public void Save()
        {
            try
            {
                Serializer.Serialize(Data);
            }
            catch (Exception e)
            {
                Logger.Log("Error while saving data: " + e.Message);
            }
        }

        public void CreateTcpServer()
        {
            lock (_tcpServerMutex)
            {
                if (_tcpServer != null)
                {
                    _tcpServer.Dispose();
                    _tcpServer = null;
                }

                _tcpServer = new TcpServer(Logger, Data.IpAddress, Data.Port);
                _tcpServer.ClientConnected += OnClientConnected;
                _tcpServer.ClientDisconnected += OnClientDisconnected;
                _tcpServer.MessageReceived += OnMessageReceived;
            }
        }

        private void CreateFileWatcher()
        {
            if (_fileWatcher != null)
            {
                _fileWatcher.Dispose();
                _fileWatcher = null;
            }

            if (File.Exists(Data.TheoryPath))
            {
                _fileWatcher = new FileWatcher(Logger, Data.TheoryPath);
                _fileWatcher.FileChanged += SendTheory;
            }
        }

        public bool HasClient()
        {
            lock (_tcpServerMutex)
                return _tcpServer?.HasClient ?? false;
        }

        private long SendCommand(string key, string value)
        {
            var id = _messageId++;
            var command = Tuple.Create(id, key, value);
            
            lock (_tcpServerMutex)
            {
                if (!_tcpServer.HasClient)
                    throw new Exception("Cannot send command without client.");

                _tcpServer.SendMessage(JsonSerializer.Serialize(command));
            }
            return id;
        }

        private void SendTheory()
        {
            if (!File.Exists(Data.TheoryPath) || !HasClient())
                return;

            Logger.Log("Sending theory...");
            Thread.Sleep(100);

            bool success = false;
            string error = null;

            for (int i = 0; i < 3 && !success; ++i)
            {
                try
                {
                    string theory = File.ReadAllText(Data.TheoryPath);
                    SendCommand("SetDevelopmentTheoryScript", theory);
                    success = true;
                }
                catch (Exception e)
                {
                    error = "Error: Cannot send theory. Details: " + e.Message;
                    Thread.Sleep(100);
                }
            }

            if (!success)
                Logger.Log(error);
        }

        public long ExecuteRemoteScript(string script)
        {
            return SendCommand("ExecuteScript", script);
        }

        public async Task ExecuteLocalScript(string script)
        {
            lock (_remoteCancellationTokenSourceMutex)
            {
                if (_remoteCancellationTokenSource != null)
                    return;
                _remoteCancellationTokenSource = new CancellationTokenSource();
            }

            await Task.Run(() =>
            {
                var lastLogTime = DateTime.UtcNow;
                ScriptExecutor.Execute(script,
                                       _remoteCancellationTokenSource.Token,
                                       (o) => Logger.Log(o.ToString()),
                                       (s, c) => WaitForResult(ExecuteRemoteScript(s), c));

                lock (_remoteCancellationTokenSourceMutex)
                    _remoteCancellationTokenSource = null;
            });
        }

        public bool IsExecutingLocalScript()
        {
            lock (_remoteCancellationTokenSourceMutex)
                return _remoteCancellationTokenSource != null;
        }

        public void CancelScriptExecution()
        {
            lock (_remoteCancellationTokenSourceMutex)
                _remoteCancellationTokenSource?.Cancel();
        }

        private string WaitForResult(long id, CancellationToken cancellationToken)
        {
            while (!_remoteResults.ContainsKey(id) && !cancellationToken.IsCancellationRequested)
                _remoteResultsSemaphore.WaitOne(500);

            if (_remoteResults.TryGetValue(id, out string result))
                return result;

            return null;
        }

        private void OnClientConnected()
        {
            SendTheory();
            ClientConnected?.Invoke();
        }

        private void OnClientDisconnected()
        {
            CancelScriptExecution();
            ClientDisconnected?.Invoke();
        }

        private void OnMessageReceived(string message)
        {
            try
            {
                var commandInfo = JsonSerializer.Deserialize<Tuple<long, string, string>>(message);
                var id = commandInfo.Item1;
                var key = commandInfo.Item2;
                var value = commandInfo.Item3;

                switch (key)
                {
                    case "Log":
                        Logger.Log(value);
                        break;
                    case "Result":
                        var result = JsonSerializer.Deserialize<Tuple<long, string>>(value);
                        _remoteResults.TryAdd(result.Item1, result.Item2);
                        _remoteResultsSemaphore.Release();
                        break;
                    default:
                        Logger.Log("Unkown message: " + key);
                        break;
                }
            }
            catch(Exception)
            {
                Logger.Log("Error decoding message: " + message);
            }
        }
    }
}
