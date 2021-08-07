using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExponentialIdle
{
    public class Data
    {
        public delegate void DataChangedDelegate();
        public DataChangedDelegate IpAddressChanged;
        public DataChangedDelegate PortChanged;
        public DataChangedDelegate TheoryPathChanged;

        private string _ipAddress = "";
        public string IpAddress { get => _ipAddress; set { if (value != _ipAddress) { _ipAddress = value; IpAddressChanged?.Invoke(); } } }

        private int _port = 5555;
        public int Port { get => _port; set { if (value != _port) { _port = value; PortChanged?.Invoke(); } } }

        private string _theoryPath = "";
        public string TheoryPath { get => _theoryPath; set { if (_theoryPath != value) { _theoryPath = value; TheoryPathChanged?.Invoke(); } } }
    }
}
