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
		private Button OkButton = null;

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

			if (!Eto.Platform.Instance.IsGtk)
			{
				var _333 = new Color(3.0f / 15, 3.0f / 15, 3.0f / 15);
				OkButton.BackgroundColor = _333;
				OkButton.TextColor = Colors.White;
			}
		}

		private void OnOkClicked(object sender, EventArgs e)
		{
			Close();
		}
	}
}
