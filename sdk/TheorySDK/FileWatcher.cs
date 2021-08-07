using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExponentialIdle
{
    public class FileWatcher : IDisposable
    {
        public delegate void FileChangedDelegate();
        public FileChangedDelegate FileChanged;

        private Logger _logger;
        private string _path;
        private FileSystemWatcher _watcher;

        public FileWatcher(Logger logger, string path)
        {
            _logger = logger;
            _path = path;

            _watcher = new FileSystemWatcher(Path.GetDirectoryName(path));
            _watcher.NotifyFilter = NotifyFilters.LastWrite;
            _watcher.Changed += OnChanged;
            _watcher.Filter = Path.GetFileName(path);
            _watcher.EnableRaisingEvents = true;
            _logger.Log("Started watching file: " + _path);
        }

        private void OnChanged(object sender, FileSystemEventArgs e)
        {
            if (e.ChangeType != WatcherChangeTypes.Changed)
                return;

            _watcher.EnableRaisingEvents = false;
            _logger.Log("File change detected: " + _path);
            FileChanged?.Invoke();
            _watcher.EnableRaisingEvents = true;
        }

        public void Dispose()
        {
            _watcher.Dispose();
            _logger.Log("Stopped watching file: " + _path);
        }
    }
}
