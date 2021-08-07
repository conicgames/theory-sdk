using Eto.Forms;
using Eto.Serialization.Xaml;
using System;
using System.Collections.ObjectModel;

namespace TheorySDK
{
    public class MainForm : Form
    {
        private ExponentialIdle.App _app;
        private ExponentialIdle.MainWindowContext _context;

        private readonly ComboBox ipComboBox;
        private readonly TextBox port;
        private readonly Button selectFile;
        private readonly Label selectedFile;
        private readonly Label serverStatus;
        private readonly RichTextArea log;

        public MainForm()
        {
            XamlReader.Load(this);
            _app = new ExponentialIdle.App();
            _context = new ExponentialIdle.MainWindowContext(_app);

            _app.TcpServerChanging += OnTcpServerChanging;
            _app.TcpServerChanged += OnTcpServerChanged;
            _app.DataLoaded += UpdateData;
            _app.Logger.MessageLogged += OnMessageLogged;

            UpdateIpAddressList();
            UpdateData();
            UpdateServerStatus();
            OnTcpServerChanged();

            selectFile.Click += OnTheoryPathClicked;

            port.TextChanging += (sender, textChangingEventArgs) =>
            {
                string data = textChangingEventArgs.NewText.Trim();
                if(data != string.Empty)
                {
                    int p;
                    if (int.TryParse(data, out p) && p >= 0 && p <= 0xFFFF)
                    {
                        _context.Port = p;
                    } else
                    {
                        textChangingEventArgs.Cancel = true;
                    }
                }
            };

            _app.OnStart();

            try
            {
                ipComboBox.SelectedIndex = 0;
            } catch
            {

            }

            selectFile.Focus();

            Closed += HandleQuit;
        }

        private void ipChanged(object sender, EventArgs e)
        {
            _context.IpAddress = _context.IpAddressList[ipComboBox.SelectedIndex].IpAddress;
        }

        private void UpdateIpAddressList()
        {
            _context.IpAddressList.Add(new ExponentialIdle.MainWindowContext.IpAddressComboItem("Any", ""));

            foreach (var ip in ExponentialIdle.TcpServer.GetIPAddressList())
                _context.IpAddressList.Add(new ExponentialIdle.MainWindowContext.IpAddressComboItem(ip, ip));

            ipComboBox.Items.Clear();
            foreach (var ip in _context.IpAddressList)
            {
                ipComboBox.Items.Add(ip.Name);
            }
        }

        private void UpdateData()
        {
            _context.IpAddress = _app.Data.IpAddress;
            _context.Port = _app.Data.Port;
            _context.TheoryPath = _app.Data.TheoryPath;
        }

        private void UpdateServerStatus()
        {
            _context.ServerStatus = (_app.TcpServer?.HasClient ?? false) ? "Connected" : "Waiting for client...";
            Application.Instance.AsyncInvoke(() =>
            {
                serverStatus.Text = _context.ServerStatus;
            });
            _context.HasClient = _app.TcpServer?.HasClient ?? false;
        }

        private void OnTcpServerChanging()
        {
            if (_app.TcpServer != null)
            {
                _app.TcpServer.ClientConnected -= UpdateServerStatus;
                _app.TcpServer.ClientDisconnected -= UpdateServerStatus;
            }
        }

        private void OnTcpServerChanged()
        {
            if (_app.TcpServer != null)
            {
                _app.TcpServer.ClientConnected += UpdateServerStatus;
                _app.TcpServer.ClientDisconnected += UpdateServerStatus;
            }
        }

        private void OnTheoryPathClicked(object sender, EventArgs e)
        {
            var openFileDialog = new OpenFileDialog();
            openFileDialog.Filters.Add(new FileFilter("Theory files (*.js)", new string[] { "js" }));
            openFileDialog.Filters.Add(new FileFilter("All files (*.*)"));

            if (openFileDialog.ShowDialog(null) == DialogResult.Ok)
            {
                _context.TheoryPath = openFileDialog.FileName;
                selectedFile.Text = openFileDialog.FileName;
            }
                
        }

        private void OnResetTheoryClicked(object sender, EventArgs e)
        {
            _app.SendResetTheoryCommand();
        }

        private void OnMessageLogged(string message)
        {
            Application.Instance.AsyncInvoke(new Action(() =>
            {
                var time = DateTime.Now.ToString("hh:mm:ss");
                string value = (_context.LogMessages.Length == 0 ? "" : "\n") + "[" + time + "] " + message;
                _context.LogMessages += value;
                log.Append(value, true);
            }));
        }

        protected void HandleQuit(object sender, EventArgs e)
        {
            _app.OnExit();
            Application.Instance.Quit();
        }
    }
}

namespace ExponentialIdle {
    internal class MainWindowContext : NotifyPropertyChangedBase
    {
        public class IpAddressComboItem
        {
            public string Name { get; set; } = "";
            public string IpAddress { get; set; } = "";
            public IpAddressComboItem(string name, string ip)
            {
                Name = name;
                IpAddress = ip;
            }
        }

        private App _app;

        public MainWindowContext(App app)
        {
            _app = app;
        }

        private ObservableCollection<IpAddressComboItem> _ipAddressList = new ObservableCollection<IpAddressComboItem>();
        public ObservableCollection<IpAddressComboItem> IpAddressList { get => _ipAddressList; set => SetField(ref _ipAddressList, value); }

        private string _ipAddress = "";
        public string IpAddress { get => _ipAddress; set { SetField(ref _ipAddress, value); _app.Data.IpAddress = value; } }

        private int _port = 0;
        public int Port { get => _port; set { SetField(ref _port, value); _app.Data.Port = value; } }

        private string _theoryPath = "";
        public string TheoryPath { get => _theoryPath; set { SetField(ref _theoryPath, value); _app.Data.TheoryPath = value; } }

        private string _serverStatus = "";
        public string ServerStatus { get => _serverStatus; set { SetField(ref _serverStatus, value); } }

        private bool _hasClient = false;
        public bool HasClient { get => _hasClient; set { SetField(ref _hasClient, value); } }

        private string _logMessages = "";
        public string LogMessages { get => _logMessages; set => SetField(ref _logMessages, value); }
    }
}
