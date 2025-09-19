using System.Net.NetworkInformation;
using System.Text.RegularExpressions;

namespace Minecraft_Website_API.Models
{
    public class PasswordValidate
    {
        public bool ValidatePassword(string Password)
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

        public bool ValidatePIN(string PIN)
        {
            if (PIN.Length < 5)
            {
                return false;
            }

            return true;
        }
    }
}
