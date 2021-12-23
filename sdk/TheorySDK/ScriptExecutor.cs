using System;
using System.Globalization;
using Jint.Runtime.Interop;
using Jint;
using System.Threading;
using System.Text.Json;

namespace TheorySDK
{
    public static class ScriptExecutor
    {
        public static void Execute(string script, CancellationToken cancellationToken, Action<object> log, Func<string, CancellationToken, string> executeRemote)
        {
            try
            {
                var culture = CultureInfo.GetCultureInfo("en-US");
                var engine = new Jint.Engine(cfg =>
                {
                    cfg.Culture(culture);
                    cfg.AllowClr(typeof(System.IO.File).Assembly);
                    cfg.CatchClrExceptions();
                    cfg.CancellationToken(cancellationToken);
                });
                engine.SetValue("log", log);
                engine.SetValue("remote", new Func<string, string>((s) =>
                {
                    var result = executeRemote(s, cancellationToken);

                    if (result == null)
                        return null;

                    return JsonSerializer.Deserialize<string>(result);
                }));
                engine.Execute(script);
            }
            catch (Exception e)
            {
                log("Error: " + GetErrorMessage(e));
            }

            System.GC.Collect();
            System.GC.WaitForPendingFinalizers();
        }

        private static string GetErrorMessage(Exception e)
        {
            if (e is Jint.Runtime.JavaScriptException jsException)
            {
                int line = jsException.LineNumber;
                int column = jsException.Column;

                if (line == 0 && jsException.StackTrace != null)
                {
                    var parts = jsException.StackTrace.Split(':');

                    if (parts.Length >= 2)
                        int.TryParse(parts[1], out line);
                    if (parts.Length >= 3)
                        int.TryParse(parts[2], out column);
                }

                return "(Line " + line + ", Col " + column + ") " + e.Message;
            }

            return e.Message;
        }
    }
}
