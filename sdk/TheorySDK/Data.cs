using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheorySDK
{
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

        public List<string> CommandHistory { get; set; } = new List<string>() { "" };
    }
}
