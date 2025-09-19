namespace Minecraft_Website_API.Models
{
    public class ChangePINModel
    {
        public int OldPIN { get; set; }
        public int NewPIN{ get; set; }
        public int NewPINSecondTime { get; set; }
        public string Password { get; set; }
    }
}
