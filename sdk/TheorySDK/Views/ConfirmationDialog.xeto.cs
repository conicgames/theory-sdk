using System;
using System.Collections.Generic;
using Eto.Forms;
using Eto.Drawing;
using Eto.Serialization.Xaml;
using System.Threading.Tasks;

namespace TheorySDK.Views
{	
	public class ConfirmationDialog : Dialog
	{
		private bool Answer { get; set; } = false;
		private Label MessageLabel = null;

		public static async Task<bool> Show(Control owner, string text)
        {
			var dialog = new ConfirmationDialog();
			dialog.MessageLabel.Text = text;
			await dialog.ShowModalAsync(owner);
			return dialog.Answer;
		}

		private ConfirmationDialog()
		{
			XamlReader.Load(this);
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
