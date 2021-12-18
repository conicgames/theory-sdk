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
            {
                var specialFolder = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);
                var appFolder = specialFolder + "/TheorySDK/";
                
                if (!System.IO.Directory.Exists(appFolder))
                    System.IO.Directory.CreateDirectory(appFolder);
                
                path = appFolder + path;
            }

            return path;
        }
    }
}
