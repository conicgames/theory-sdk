using Eto.Forms;
using System;

namespace TheorySDK.Gtk
{
    class Program
    {
        [STAThread]
        public static void Main(string[] args)
        {
            new Application(Eto.Platforms.Gtk).Run(new Views.MainForm());
        }
    }
}
