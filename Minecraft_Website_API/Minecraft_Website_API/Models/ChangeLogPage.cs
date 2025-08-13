using System.Text.Json.Serialization;

namespace Minecraft_Website_API.Models
{
    public class ChangeLogPage
    {
        public int Id { get; set; }

        public string Text { get; set; }

        [JsonPropertyName("title")]
        public string Datum { get; set; }
    }
}
