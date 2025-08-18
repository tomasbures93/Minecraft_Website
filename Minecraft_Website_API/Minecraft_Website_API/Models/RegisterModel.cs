using System.Text.RegularExpressions;

namespace Minecraft_Website_API.Models
{
    public class RegisterModel
    {
        public string UserName { get; set; }

        public string Password { get; set; }

        public int PIN { get; set; }

        public bool ValidPassword()
        {
            string UpperCase = "[A-Z]";
            string number = "[0-9]";
            string specialCharacters = "[!?_$/]";
            if (Password.Length < 8)
            {
                return false;
            }

            if (Regex.IsMatch(Password, UpperCase) && Regex.IsMatch(Password, number) && Regex.IsMatch(Password, specialCharacters))
            {
                return true;
            }

            return false;
        }

        public bool ValidPIN()
        {
            string PINstr = PIN.ToString();
            if (PINstr.Length < 3)
            {
                return false;
            }

            return true;
        }
    }
}
