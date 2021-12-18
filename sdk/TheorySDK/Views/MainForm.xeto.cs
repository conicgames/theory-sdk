using Eto.Forms;
using Eto.Drawing;
using Eto.Serialization.Xaml;
using System;
using static System.Reflection.Assembly;
using System.Collections.Generic;
using System.Text;

namespace TheorySDK.Views
{
    public partial class MainForm : Form
    {
        private readonly App _app = null;

        private readonly ComboBox IpComboBox = null;
        private readonly TextBox Port = null;
        private readonly TextBox TheoryPath = null;
        private readonly Label ServerStatus = null;
        private readonly TextArea Log = null;
        private readonly Label CommandLineSpacer = null;
        private readonly StackLayout CommandLineLayout = null;
        private readonly TextBox CommandLine = null;
        private readonly ImageView QuestionImage = null;
        private readonly ScriptPanel ScriptPanel = null;

        private List<string> _history;
        private readonly int _maxHistoryCount = 10;
        private int _historyIndex = 0;
        private bool _inhibitHistory = false;
        private bool _isUpdatingFields = false;
        private UITimer _autosaveTimer = new UITimer();
        private StringBuilder _pendingLogs = new StringBuilder();
        private string _commandLinePlaceholder = "Enter a command...";
        private string _theoryPathPlaceholder = "Click to select a file...";

        public MainForm()
        {
            XamlReader.Load(this);

            Title += " - " + Version.VersionString;
            Icon = new Icon(GetExecutingAssembly().GetManifestResourceStream("TheorySDK.Resources.icon48x48.ico"));
            QuestionImage.Image = new Icon(GetExecutingAssembly().GetManifestResourceStream("TheorySDK.Resources.question.png"));
            
            if (Eto.Platform.Instance.IsWpf)
                Log.Font = new Font("consolas", Log.Font.Size);
            else
                Log.Font = new Font("monospace", Log.Font.Size);
            
            _app = new App();

            _app.ClientConnected += UpdateServerStatus;
            _app.ClientDisconnected += UpdateServerStatus;
            _app.DataLoaded += UpdateFields;
            _app.Logger.MessageLogged += OnMessageLogged;

            _app.OnStart();
            
            _autosaveTimer.Interval = 30;
            _autosaveTimer.Elapsed += (s,e) => _app.Save();
            _autosaveTimer.Start();

            ScriptPanel.Init(_app);

            OnCommandLineLostFocus(CommandLine, new EventArgs());
            InitializeHistory();
            UpdateFields();
            UpdateServerStatus();
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
            _isUpdatingFields = true;
            IpComboBox.Items.Clear();
            IpComboBox.Items.Add("Any", "");

            foreach (var ip in TcpServer.GetIPAddressList())
                IpComboBox.Items.Add(ip, ip);

            IpComboBox.SelectedKey = _app.Data.IpAddress ?? "";
            Port.Text = _app.Data.Port.ToString();
            UpdateTheoryPath();
            _isUpdatingFields = false;
        }

        private void UpdateTheoryPath()
        {
            TheoryPath.Text = _app.Data.TheoryPath;

            // Workaround for now having control over the color of the property "placeholder"
            if (string.IsNullOrEmpty(TheoryPath.Text))
            {
                TheoryPath.Text = _theoryPathPlaceholder;
                TheoryPath.TextColor = Colors.Gray;
            }
            else
            {
                TheoryPath.TextColor = Colors.White;
            }
        }

        private void UpdateServerStatus()
        {
            Application.Instance.AsyncInvoke(() =>
            {
                var hasClient = _app.HasClient();
                ServerStatus.Text = hasClient ? "Connected" : "Waiting for client...";
                CommandLineSpacer.Visible = hasClient;
                CommandLineLayout.Visible = hasClient;
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

        private void OnIpChanged(object sender, EventArgs e)
        {
            if (!_isUpdatingFields)
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
                UpdateTheoryPath();
            }

            // Deselect the text
            TheoryPath.Selection = new Range<int>(0, -1);
        }

        private void OnMessageLogged(string message)
        {
            lock (_pendingLogs)
            {
                var time = DateTime.Now.ToString("hh:mm:ss");
                string log = "[" + time + "] " + message;
                _pendingLogs.AppendLine(log);
            }
            Application.Instance.AsyncInvoke(new Action(() =>
            {
                string logs = null;

                lock (_pendingLogs)
                {
                    if (_pendingLogs.Length > 0)
                    {
                        logs = _pendingLogs.ToString();
                        _pendingLogs.Clear();
                    }
                }

                if (logs != null)
                {
                    Log.Append(logs, true);

                    // We remove half of the text whenever we pass a threshold instead of
                    // simply removing the excess. This avoid having to modify the text
                    // at each iteration when the limit is reached.
                    // 
                    var maxLength = 8000;

                    if (Log.Text.Length > maxLength)
                        Log.Text = Log.Text.Substring(Log.Text.Length - maxLength / 2);
                }
            }));
        }

        private void OnCommandLineKeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyData == Keys.Up)
                MoveHistory(-1);
            else if (e.KeyData == Keys.Down)
                MoveHistory(1);
        }

        // Workaround for now having control over the color of the property "placeholder"
        private void OnCommandLineGotFocus(object sender, EventArgs e)
        {
            if (CommandLine.Text == _commandLinePlaceholder)
            {
                _inhibitHistory = true;
                CommandLine.Text = "";
                _inhibitHistory = false;
            }

            CommandLine.TextColor = Colors.White;
        }

        private void OnCommandLineLostFocus(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(CommandLine.Text))
            {
                _inhibitHistory = true;
                CommandLine.Text = _commandLinePlaceholder;
                _inhibitHistory = false;

                CommandLine.TextColor = Colors.Gray;
            }
        }

        private void MoveHistory(int inc)
        {
            var previousIndex = _historyIndex;

            _historyIndex = Math.Max(0, Math.Min(_historyIndex + inc, _history.Count - 1));

            if (_historyIndex != previousIndex)
            {
                _inhibitHistory = true;
                CommandLine.Text = _history[_historyIndex];
                _inhibitHistory = false;
                CommandLine.CaretIndex = CommandLine.Text.Length;
            }
        }

        private async void ShowCommandLineInstructions(object sender, EventArgs e)
        {
            await InformationDialog.Show(this, "Command Line Instructions",
                "A command is Javascript expression sent to your device and executed within\n" +
                "the current context of the theory. Commands are useful for inspecting\n" +
                "the state of the theory without having to put logging expressions in the\n" +
                "script itself. They are also useful for modifying values at runtime to change\n" +
                "the current state of the theory. Some useful examples:\n\n" +
                "theory.reset(); // Resets the theory\n" +
                "currency.value = 1e100; // Sets the currency to test a specific part of the theory\n" +
                "log(aVariable) // Displays the value in the logs of the SDK.\n\n" +
                "Use the up and down arrows to navigate through your command history.");
        }

        private void OnCommandLineTextChanging(object sender, TextChangingEventArgs e)
        {
            if (e.Text == "\r" || e.Text == "\n" || e.Text == "\r\n")
            {
                if (_app.HasClient())
                {
                    _app.Logger.Log("Executing remote script...");
                    _app.ExecuteRemoteScript(e.OldText);
                    _history[_history.Count - 1] = e.OldText;
                    _history.Add("");

                    if (_history.Count > _maxHistoryCount)
                        _history.RemoveRange(0, _history.Count - _maxHistoryCount);

                    _historyIndex = _history.Count - 1;
                    CommandLine.Text = "";
                }
                else
                {
                    _app.Logger.Log("Error: Cannot send command without client.");
                }
            }
            else if (!_inhibitHistory)
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
