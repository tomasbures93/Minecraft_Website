using System.Text.Json.Serialization;

namespace Minecraft_Website_API.Models
{
    public class ServerInfo
    {
        public int Id { get; set; }

        public string IP { get; set; }
        public string Port { get; set; }

        public string GameVersion { get; set; }

        public string ServerName { get; set; }

        [JsonPropertyName("discord")]
        public string DiscordLink { get; set; }

        [JsonPropertyName("email")]
        public string ContactEmail { get; set; }

    }
}
