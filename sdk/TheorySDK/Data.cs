using System;
using System.Collections.Generic;

namespace TheorySDK
{
    public class Script
    {
        public string Name { get; set; } = "Script name";
        public string Code { get; set; } = "";
    }

    public class Data
    {
        public Action IpAddressChanged;
        public Action PortChanged;
        public Action TheoryPathChanged;

        private string _ipAddress = "";
        public string IpAddress { get => _ipAddress; set { if (value != _ipAddress) { _ipAddress = value; IpAddressChanged?.Invoke(); } } }

        private int _port = 5555;
        public int Port { get => _port; set { if (value != _port) { _port = value; PortChanged?.Invoke(); } } }

        private string _theoryPath = "";
        public string TheoryPath { get => _theoryPath; set { if (_theoryPath != value) { _theoryPath = value; TheoryPathChanged?.Invoke(); } } }

        public List<Script> Scripts { get; set; } = new List<Script>();
        
        public List<string> CommandHistory { get; set; } = new List<string>() { "" };
    }
}
