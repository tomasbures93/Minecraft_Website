﻿namespace Minecraft_Website_API.Models
{
    public class User
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string PasswordHash { get; set; }

        public string PINHash { get; set; }
    }
}
