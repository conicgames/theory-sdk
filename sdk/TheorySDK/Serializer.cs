using System;
using System.IO;
using System.Text.Json;

namespace TheorySDK
{
    public static class Serializer
    {
        public static void Serialize(Data data)
        {
            File.WriteAllText(GetPath(), JsonSerializer.Serialize(data));
        }

        public static void Deserialize(out Data data)
        {
            data = JsonSerializer.Deserialize<Data>(File.ReadAllText(GetPath()));
        }

        private static string GetPath()
        {
            var path = "config.json";

            if (Eto.Platform.Instance.IsMac)
                path = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + "/TheorySDK/" + path;

            return path;
        }
    }
}
