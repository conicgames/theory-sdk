using System;
using System.Collections.Generic;
using Eto.Forms;
using Eto.Drawing;
using Eto.Serialization.Xaml;
using System.Threading.Tasks;

namespace TheorySDK.Views
{	
	public class InformationDialog : Dialog
	{
		private Label MessageLabel = null;

		public static async Task Show(Control owner, string title, string text)
        {
			var dialog = new InformationDialog();
			dialog.Title = title;
			dialog.MessageLabel.Text = text;
			await dialog.ShowModalAsync(owner);
		}

		private InformationDialog()
		{
			XamlReader.Load(this);
		}

		private void OnOkClicked(object sender, EventArgs e)
		{
			Close();
		}
	}
}
