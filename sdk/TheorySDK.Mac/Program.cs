using Eto.Forms;
using System;

namespace TheorySDK.Mac
{
    class Program
    {
        [STAThread]
        public static void Main(string[] args)
        {
            new Application(Eto.Platforms.Mac64).Run(new Views.MainForm());
        }
    }
}
