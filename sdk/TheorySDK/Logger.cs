using System;

namespace ExponentialIdle
{
    public class Logger
    {
        public delegate void MessageLoggedDelegate(string message);
        public MessageLoggedDelegate MessageLogged;

        public void Log(string message)
        {
            MessageLogged?.Invoke(message);
            Console.WriteLine(message);
        }
    }
}
