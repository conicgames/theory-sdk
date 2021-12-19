using System;
using System.Linq;
using System.Collections.Generic;
using static System.Reflection.Assembly;
using Eto.Forms;
using Eto.Drawing;
using Eto.Serialization.Xaml;
using System.Threading.Tasks;

namespace TheorySDK.Views
{	
	public class ScriptPanel : Panel
	{
		private App _app = null;
		private bool _internalSelectionChanged = false;

		private readonly ImageView QuestionImage = null;
		private readonly StackLayout LocalScriptLabel = null;
		private readonly ListBox ScriptList = null;
		private readonly TextBox ScriptName = null;
		private readonly Button AddScriptButton = null;
		private readonly Button RemoveScriptButton = null;
		private readonly Button ExecuteScriptButton = null;
		private readonly Button CancelScriptButton = null;
		private readonly TextArea ScriptCode = null;

		public ScriptPanel()
		{
			XamlReader.Load(this);

			var textBoxHeight = (int)Math.Round(ScriptName.GetPreferredSize().Height);
			LocalScriptLabel.Height = textBoxHeight;
			QuestionImage.Image = new Bitmap(GetExecutingAssembly().GetManifestResourceStream("TheorySDK.Resources.question.png"));

			if (Eto.Platform.Instance.IsWpf)
				ScriptCode.Font = new Font("consolas", ScriptCode.Font.Size);
			else
				ScriptCode.Font = new Font("monospace", ScriptCode.Font.Size);

			if (!Eto.Platform.Instance.IsGtk)
            {
				var _333 = new Color(3.0f / 15, 3.0f / 15, 3.0f / 15);
				ExecuteScriptButton.BackgroundColor = _333;
				ExecuteScriptButton.TextColor = Colors.White;
				CancelScriptButton.BackgroundColor = _333;
				CancelScriptButton.TextColor = Colors.White;
				AddScriptButton.BackgroundColor = _333;
				AddScriptButton.TextColor = Colors.White;
				RemoveScriptButton.BackgroundColor = _333;
				RemoveScriptButton.TextColor = Colors.White;
				ScriptList.BackgroundColor = _333;
				ScriptList.TextColor = Colors.White;
				ScriptName.BackgroundColor = _333;
				ScriptName.TextColor = Colors.White;
				ScriptName.ShowBorder = false;
				ScriptCode.BackgroundColor = _333;
				ScriptCode.TextColor = Colors.White;
			}
		}

		public void Init(App app)
        {
			_app = app;
			UpdateScriptList();
        }

		private void OnAddClicked(object sender, EventArgs e)
        {
			_app.Data.Scripts.Add(new Script());
			UpdateScriptList();
			ScriptList.SelectedIndex = _app.Data.Scripts.Count - 1;
		}

		private async void OnRemoveClicked(object sender, EventArgs e)
		{
			if (GetSelectedScript() == null)
				return;

			if (await ConfirmationDialog.Show(this, "Remove Local Script", "Do you want to remove this script?"))
			{
				int index = ScriptList.SelectedIndex;

				if (index >= 0 && index < _app.Data.Scripts.Count)
				{
					_app.Data.Scripts.RemoveAt(index);
					UpdateScriptList();
				}
			}
		}

		private void UpdateScriptList()
        {
			ScriptList.Items.Clear();

			foreach (var script in _app.Data.Scripts)
				ScriptList.Items.Add(new ListItem() { Text = script.Name });
        }

		private void UpdateCurrentScriptListItem()
        {
			int index = ScriptList.SelectedIndex;

			if (index >= 0 && index < _app.Data.Scripts.Count)
			{
				_internalSelectionChanged = true;
				ScriptList.Items[index] = new ListItem() { Text = _app.Data.Scripts[index].Name };
				ScriptList.SelectedIndex = index;
				_internalSelectionChanged = false;
			}
		}

		private async void ShowInstructions(object sender, EventArgs e)
        {
			await InformationDialog.Show(this, "Local Scripts Instructions",
				"Use local scripts to automate some parts of theory development. For example, you can write a script that\n" +
				"simulates a theory by requesting the game to do a tick, buy upgrades, publish, and buy milestones.\n\n" +
				"As opposed to commands, local scripts are executed by the SDK application itself. To send a command\n" +
				"to the game, use the 'remote' function. Some examples:\n\n" +
				"remote(\"tick(10,1)\") // Does a tick of 10 seconds without ad bonus\n" +
				"let currency = remote(\"currency.value\") // Queries game data. All results are returned strings\n\n" +
				"Press Ctrl-Enter to execute the script and Esc to cancel the execution.");
        }

		private void OnScriptSelectionChanged(object sender, EventArgs e)
        {
			if (!_internalSelectionChanged)
			{
				var script = GetSelectedScript();
				ScriptName.Text = script?.Name ?? "";
				ScriptCode.Text = script?.Code ?? "";
				ScriptName.ReadOnly = script == null;
				ScriptCode.ReadOnly = script == null;
			}
		}

		private void OnScriptListKeyDown(object sender, KeyEventArgs e)
        {
			int direction = 0;
			
			if (e.Key == Keys.Up && e.Modifiers == Keys.Alt)
				direction = -1;
			else if (e.Key == Keys.Down && e.Modifiers == Keys.Alt)
				direction = 1;

			if (direction != 0)
            {
				var scripts = _app.Data.Scripts;
				int index0 = ScriptList.SelectedIndex;
				int index1 = index0 + direction;

				if (index0 >= 0 && index1 >= 0 &&
					index0 < scripts.Count &&
					index1 < scripts.Count)
                {
					var tmp = scripts[index0];
					scripts[index0] = scripts[index1];
					scripts[index1] = tmp;

					_internalSelectionChanged = true;
					ScriptList.Items[index0] = new ListItem() { Text = scripts[index0].Name };
					ScriptList.Items[index1] = new ListItem() { Text = scripts[index1].Name };
					ScriptList.SelectedIndex = index1;
					_internalSelectionChanged = false;
				}
            }
		}

		private async void OnScriptListDoubleClick(object sender, EventArgs e)
        {
			await ExecuteSelectedScript();
		}

		private void OnScriptNameChanging(object sender, TextChangingEventArgs e)
        {
			if (e.Text == "\r" || e.Text == "\n" || e.Text == "\r\n")
				return;

			var script = GetSelectedScript();

			if (script != null)
            {
				script.Name = e.NewText;
				UpdateCurrentScriptListItem();
            }
        }

		private void OnScriptCodeChanged(object sender, EventArgs e)
		{
			var script = GetSelectedScript();

			if (script != null)
				script.Code = ScriptCode.Text;
		}

		private async void OnScriptCodeKeyDown(object sender, KeyEventArgs e)
		{
			if (e.KeyData == Keys.Escape)
				_app.CancelScriptExecution();
			if (e.Key == Keys.Enter && e.Modifiers == Keys.Control)
				await ExecuteSelectedScript();
			else if (e.Key == Keys.Enter)
            {
				// Basic auto-indentation
				if (ScriptCode.Selection.Length() <= 0 && ScriptCode.CaretIndex > 0)
				{
					var caret = ScriptCode.CaretIndex;
					var first = ScriptCode.Text.LastIndexOf('\n', caret - 1);
					var next = first + 1;
					string indent = "";

					while (next >= 0 && next < ScriptCode.Text.Length)
					{
						var nextChar = ScriptCode.Text[next];

						if (nextChar != ' ' && nextChar != '\t')
							break;

						indent += nextChar;
						next++;
					}

					var newText = System.Environment.NewLine + indent;
					ScriptCode.Text = ScriptCode.Text.Insert(caret, newText);
					ScriptCode.CaretIndex = caret + newText.Length;
					e.Handled = true;
				}
			}
		}

		private async void OnExecuteScriptClicked(object sender, EventArgs e)
        {
			await ExecuteSelectedScript();
		}

		private void OnCancelScriptClicked(object sender, EventArgs e)
		{
			_app.CancelScriptExecution();
		}

		private async Task ExecuteSelectedScript()
        {
			var script = GetSelectedScript();

			if (script == null)
				_app.Logger.Log("Error: No script selected.");
			else if (_app.IsExecutingLocalScript())
				_app.Logger.Log("Error: A local script is already being executed.");
			else
			{
				_app.Logger.Log("Executing local script...");
				ExecuteScriptButton.Visible = false;
				CancelScriptButton.Visible = true;
				await _app.ExecuteLocalScript(script.Code);
				CancelScriptButton.Visible = false;
				ExecuteScriptButton.Visible = true;
			}
		}

		private Script GetSelectedScript()
		{
			int index = ScriptList.SelectedIndex;
			if (index >= 0 && index < _app.Data.Scripts.Count)
				return _app.Data.Scripts[index];
			return null;
		}
	}
}
