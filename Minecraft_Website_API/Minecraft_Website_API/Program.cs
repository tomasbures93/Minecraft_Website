using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Minecraft_Website_API.Services;
using System.Text;

namespace Minecraft_Website_API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontEnd", options =>
                {
                    options.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod();
                });
            });

            builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("inMemoryDb"));

            string key = builder.Configuration.GetSection("JWTtoken").GetSection("SecretKey").Value;
            byte[] bytes = Encoding.UTF8.GetBytes(key);

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).
                AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidIssuer = builder.Configuration.GetSection("JWTtoken").GetSection("Issuer").Value,
                        ValidAudience = builder.Configuration.GetSection("JWTtoken").GetSection("Audience").Value,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(bytes)
                    };
                });

            var app = builder.Build();

            // Configure the HTTP request pipeline.

            app.UseMiddleware<CookieJWTMiddleware>();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors("AllowFrontEnd");

            app.MapControllers();

            app.Run();
        }
    }
}
