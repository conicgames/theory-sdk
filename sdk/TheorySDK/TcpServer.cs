using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Threading;

namespace TheorySDK
{
    public class TcpServer : IDisposable
    {
        public delegate void TcpServerStateDelegate();
        public delegate void MessageReceivedDelegate(string message);
        public TcpServerStateDelegate ClientConnected;
        public TcpServerStateDelegate ClientDisconnected;
        public MessageReceivedDelegate MessageReceived;
        public bool HasClient { get => _client != null; }

        private readonly Logger _logger;
        private readonly IPAddress _ipAddress;
        private readonly int _port;
        private readonly Thread _serverThread;
        private Socket _server = null;
        private Socket _client = null;
        private BlockingCollection<string> _messageQueue = new BlockingCollection<string>();

        public TcpServer(Logger logger, string ipAddress, int port)
        {
            _logger = logger;
            _ipAddress = string.IsNullOrEmpty(ipAddress) ? IPAddress.Any : IPAddress.Parse(ipAddress);
            _port = port;

            _serverThread = new Thread(new ThreadStart(ServerThread));
            _serverThread.Start();
        }

        public void SendMessage(string message)
        {
            _messageQueue.Add(message);
        }

        public void Dispose()
        {
            if (_client != null)
                _client.Close();

            _server.Close();
            _serverThread.Join();
        }

        public void ServerThread()
        {
            _logger.Log("Starting server...");

            IPEndPoint localEndPoint = new IPEndPoint(_ipAddress, _port);

            try
            {
                _server = new Socket(_ipAddress.AddressFamily, SocketType.Stream, ProtocolType.Tcp);
                _server.Bind(localEndPoint);
                _server.Listen(1);

                while (true)
                {
                    _logger.Log("Waiting for client...");
                    _client = _server.Accept();
                    _logger.Log("Client connected.");
                    _messageQueue = new BlockingCollection<string>();
                    ClientConnected?.Invoke();
                    var stream = new NetworkStream(_client);

                    var sendThread = new Thread(new ThreadStart(() =>
                    {
                        var writer = new StreamWriter(stream);
                        foreach (var message in _messageQueue.GetConsumingEnumerable())
                        {
                            writer.WriteLine(message);
                            writer.Flush();
                            //_logger.Log("Message sent.");
                        }
                    }));

                    var receiveThread = new Thread(new ThreadStart(() =>
                    {
                        var reader = new StreamReader(stream);
                        try
                        {
                            while (true)
                            {
                                string message = reader.ReadLine();
                                if (string.IsNullOrEmpty(message))
                                    break;
                                //_logger.Log("Message received.");
                                MessageReceived?.Invoke(message);
                            }
                        }
                        catch (Exception) { }
                    }));

                    sendThread.Start();
                    receiveThread.Start();
                    receiveThread.Join();
                    _messageQueue.CompleteAdding();
                    sendThread.Join();

                    _client.Shutdown(SocketShutdown.Both);
                    _client.Close();
                    _client = null;
                    _messageQueue = null;
                    _logger.Log("Client disconnected.");
                    ClientDisconnected?.Invoke();
                }
            }
            catch (SocketException e)
            {
                if (e.SocketErrorCode != SocketError.Interrupted)
                    Console.WriteLine(e.ToString());
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }

            _client = null;
            _messageQueue = null;

            _logger.Log("Stopping server.");
        }

        public static List<string> GetIPAddressList()
        {
            var host = Dns.GetHostEntry(Dns.GetHostName());
            return host.AddressList.Select(ip => ip.ToString()).ToList();
        }
    }
}
