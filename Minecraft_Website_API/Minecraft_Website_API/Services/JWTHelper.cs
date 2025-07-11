using Microsoft.IdentityModel.Tokens;
using Minecraft_Website_API.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Minecraft_Website_API.Services
{
    public static class JWTHelper
    {
        private static readonly IConfiguration configuration;

        static JWTHelper()
        {
            configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json")
                .Build();
        }

        public static string GenerateJwtToken(User user)
        {
            string key = configuration.GetSection("JWTtoken").GetSection("SecretKey").Value;

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var token = new JwtSecurityToken(
                issuer: configuration.GetSection("JWTtoken").GetSection("Issuer").Value,
                audience: configuration.GetSection("JWTtoken").GetSection("Audience").Value,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
