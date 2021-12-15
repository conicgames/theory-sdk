using System;

namespace TheorySDK
{
    public class Logger
    {
        public Action<string> MessageLogged;

        public void Log(string message)
        {
            MessageLogged?.Invoke(message);
            Console.WriteLine(message);
        }
    }
}
