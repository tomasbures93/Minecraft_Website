namespace Minecraft_Website_API.Models
{
    public class ChangePasswordModel
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public string NewPasswordSecondTime { get; set; }
        public string PIN { get; set; }
    }
}
