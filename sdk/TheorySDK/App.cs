using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading;

namespace TheorySDK
{
    public class App
    {
        public delegate void ChangeDelegate();
        public ChangeDelegate DataLoaded;
        public ChangeDelegate TcpServerChanging;
        public ChangeDelegate TcpServerChanged;

        private Data _data = new Data();
        public Data Data { get => _data; private set => _data = value; }
        public TcpServer TcpServer { get; private set; } = null;
        public FileWatcher FileWatcher { get; private set; } = null;
        public Logger Logger { get; private set; } = new Logger();

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
            if (TcpServer != null)
                TcpServer.Dispose();

            if (FileWatcher != null)
                FileWatcher.Dispose();

            try
            {
                Serializer.Serialize(Data);
            }
            catch (Exception)
            {
            }
        }

        public void CreateTcpServer()
        {
            TcpServerChanging?.Invoke();

            if (TcpServer != null)
            {
                TcpServer.Dispose();
                TcpServer = null;
            }
            
            TcpServer = new TcpServer(Logger, Data.IpAddress, Data.Port);
            TcpServer.ClientConnected += SendTheory;
            TcpServer.MessageReceived += OnMessageReceived;
            TcpServerChanged?.Invoke();
        }

        private void CreateFileWatcher()
        {
            if (FileWatcher != null)
            {
                FileWatcher.Dispose();
                FileWatcher = null;
            }

            if (File.Exists(Data.TheoryPath))
            {
                FileWatcher = new FileWatcher(Logger, Data.TheoryPath);
                FileWatcher.FileChanged += SendTheory;
            }
        }

        private void SendCommand(string key, string value)
        {
            var command = new Dictionary<string, string>() { { key, value } };
            TcpServer.SendMessage(JsonSerializer.Serialize(command));
        }

        private void SendTheory()
        {
            if (!TcpServer.HasClient || !File.Exists(Data.TheoryPath))
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
                    SendCommand("CustomTheoryScript", theory);
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

        public void SendResetTheoryCommand()
        {
            Logger.Log("Sending command: Reset Theory...");
            SendCommand("ResetTheory", "");
        }

        private void OnMessageReceived(string message)
        {
            try
            {
                var commands = JsonSerializer.Deserialize<Dictionary<string, string>>(message);

                foreach (var command in commands)
                {
                    switch (command.Key)
                    {
                        case "Log":
                            Logger.Log(command.Value);
                            break;
                        default:
                            Logger.Log("Unkown message: " + command.Key);
                            break;
                    }
                }
            }
            catch(Exception)
            {
                Logger.Log("Error decoding message: " + message);
            }
        }
    }
}
