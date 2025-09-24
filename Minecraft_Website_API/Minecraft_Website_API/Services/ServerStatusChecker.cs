
using System.Net.Sockets;

namespace Minecraft_Website_API.Services
{
    public class ServerStatusChecker : BackgroundService
    {
        public static string CurrentStatus = "Unknown";

        private readonly IConfiguration configuration;
        private readonly ILogger<ServerStatusChecker> logger;

        public ServerStatusChecker(ILogger<ServerStatusChecker> logger)
        {
            configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json")
                .Build();
            this.logger = logger;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    using (TcpClient client = new TcpClient())
                    {
                        var result = client.BeginConnect(
                            configuration.GetSection("Server").GetSection("IP").Value,
                            int.Parse(configuration.GetSection("Server").GetSection("Port").Value), null, null);
                        bool success = result.AsyncWaitHandle.WaitOne(2000);
                        if (success)
                        {
                            CurrentStatus = "Online";
                            client.EndConnect(result);
                        } else
                        {
                            CurrentStatus = "Offline";
                        }
                    }
                }
                catch 
                {
                    CurrentStatus = "Unknown";
                }

                await Task.Delay(TimeSpan.FromSeconds(50), stoppingToken);
            }
        }
    }
}
