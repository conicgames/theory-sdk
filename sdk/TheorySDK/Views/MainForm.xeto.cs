using Eto.Forms;
using Eto.Drawing;
using Eto.Serialization.Xaml;
using System;
using static System.Reflection.Assembly;
using System.Collections.Generic;

namespace TheorySDK.Views
{
    public partial class MainForm : Form
    {
        private readonly App _app = null;

        private readonly ComboBox IpComboBox = null;
        private readonly TextBox Port = null;
        private readonly TextBox TheoryPath = null;
        private readonly Label ServerStatus = null;
        private readonly RichTextArea Log = null;
        private readonly TextBox CommandLine = null;

        private List<string> _history;
        private readonly int _maxHistoryCount = 10;
        private int _historyIndex = 0;
        private bool _isSettingHistory = false;

        public MainForm()
        {
            XamlReader.Load(this);
            Icon = new Icon(GetExecutingAssembly().GetManifestResourceStream("TheorySDK.Resources.icon48x48.ico"));
            _app = new App();

            _app.TcpServerChanging += OnTcpServerChanging;
            _app.TcpServerChanged += OnTcpServerChanged;
            _app.DataLoaded += UpdateFields;
            _app.Logger.MessageLogged += OnMessageLogged;

            _app.OnStart();

            InitializeHistory();
            UpdateFields();
            UpdateServerStatus();
            OnTcpServerChanged();
        }

        private void InitializeHistory()
        {
            _history = _app.Data.CommandHistory;

            if (_history.Count == 0)
                _history.Add("");

            _historyIndex = _app.Data.CommandHistory.Count - 1;
        }

        private void UpdateFields()
        {
            IpComboBox.Items.Clear();
            IpComboBox.Items.Add("Any", "");

            foreach (var ip in TcpServer.GetIPAddressList())
                IpComboBox.Items.Add(ip, ip);

            IpComboBox.SelectedKey = _app.Data.IpAddress;
            Port.Text = _app.Data.Port.ToString();
            TheoryPath.Text = _app.Data.TheoryPath;
        }

        private void UpdateServerStatus()
        {
            Application.Instance.AsyncInvoke(() =>
            {
                bool hasClient = _app.TcpServer?.HasClient ?? false;
                ServerStatus.Text = hasClient ? "Connected" : "Waiting for client...";
                CommandLine.Visible = hasClient;
            });
        }

        private void OnPortTextChanging(object sender, TextChangingEventArgs e)
        {
            string data = e.NewText.Trim();
            
            if (!string.IsNullOrEmpty(data))
            {
                if (int.TryParse(data, out int p) && p >= 0 && p <= 0xFFFF)
                    _app.Data.Port = p;
                else
                    e.Cancel = true;
            }
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

        private void OnIpChanged(object sender, EventArgs e)
        {
            _app.Data.IpAddress = IpComboBox.SelectedKey;
        }

        private void OnTheoryPathClicked(object sender, EventArgs e)
        {
            var openFileDialog = new OpenFileDialog();
            openFileDialog.Filters.Add(new FileFilter("Theory files (*.js)", new string[] { "js" }));
            openFileDialog.Filters.Add(new FileFilter("All files (*.*)", new string[] { "*" }));

            if (openFileDialog.ShowDialog(null) == DialogResult.Ok)
            {
                _app.Data.TheoryPath = openFileDialog.FileName;
                TheoryPath.Text = openFileDialog.FileName;
            }

            // Deselect the text
            TheoryPath.Selection = new Range<int>(0, -1);
        }

        private void OnMessageLogged(string message)
        {
            Application.Instance.AsyncInvoke(new Action(() =>
            {
                var time = DateTime.Now.ToString("hh:mm:ss");
                string value = (Log.Text.Length == 0 ? "" : "\n") + "[" + time + "] " + message;
                Log.Append(value, true);
            }));
        }

        private void OnCommandLineKeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyData == Keys.Up)
                MoveHistory(-1);
            else if (e.KeyData == Keys.Down)
                MoveHistory(1);
        }

        private void MoveHistory(int inc)
        {
            var previousIndex = _historyIndex;

            _historyIndex = Math.Max(0, Math.Min(_historyIndex + inc, _history.Count - 1));

            if (_historyIndex != previousIndex)
            {
                _isSettingHistory = true;
                CommandLine.Text = _history[_historyIndex];
                _isSettingHistory = false;
                CommandLine.CaretIndex = CommandLine.Text.Length;
            }
        }

        private void OnCommandLineTextChanging(object sender, TextChangingEventArgs e)
        {
            if (e.Text == "\r" || e.Text == "\n" || e.Text == "\r\n")
            {
                _app.ExecuteScript(e.OldText);
                _history[_history.Count - 1] = e.OldText;
                _history.Add("");

                if (_history.Count > _maxHistoryCount)
                    _history.RemoveRange(0, _history.Count - _maxHistoryCount);
                
                _historyIndex = _history.Count - 1;
                CommandLine.Text = "";
            }
            else if (!_isSettingHistory)
            {
                _historyIndex = _history.Count - 1;
                _history[_historyIndex] = e.NewText;
            }
        }

        protected override void OnClosed(EventArgs e)
        {
            _app.OnExit();
        }
    }
}
