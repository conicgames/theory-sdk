using System.IO;
using System.Text.Json;

namespace TheorySDK
{
    public static class Serializer
    {
        private static readonly string _configFilename = "config.json";

        public static void Serialize(Data data)
        {
            File.WriteAllText(_configFilename, JsonSerializer.Serialize(data));
        }

        public static void Deserialize(out Data data)
        {
            data = JsonSerializer.Deserialize<Data>(File.ReadAllText(_configFilename));
        }
    }
}
