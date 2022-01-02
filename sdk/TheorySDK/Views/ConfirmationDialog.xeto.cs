using Eto.Drawing;
using Eto.Forms;
using Eto.Serialization.Xaml;
using System;
using System.Threading.Tasks;

namespace TheorySDK.Views
{
    public class ConfirmationDialog : Dialog
    {
        private bool Answer { get; set; } = false;
        private Button YesButton = null;
        private Button NoButton = null;
        private Label MessageLabel = null;

        public static async Task<bool> Show(Control owner, string title, string text)
        {
            var dialog = new ConfirmationDialog();
            dialog.Title = title;
            dialog.MessageLabel.Text = text;
            await dialog.ShowModalAsync(owner);
            return dialog.Answer;
        }

        private ConfirmationDialog()
        {
            XamlReader.Load(this);

            if (!Eto.Platform.Instance.IsGtk)
            {
                var _333 = new Color(3.0f / 15, 3.0f / 15, 3.0f / 15);
                YesButton.BackgroundColor = _333;
                YesButton.TextColor = Colors.White;
                NoButton.BackgroundColor = _333;
                NoButton.TextColor = Colors.White;
            }
        }

        private void OnYesClicked(object sender, EventArgs e)
        {
            Answer = true;
            Close();
        }

        private void OnNoClicked(object sender, EventArgs e)
        {
            Close();
        }
    }
}
