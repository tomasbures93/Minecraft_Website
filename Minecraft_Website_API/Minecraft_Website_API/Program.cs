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

            builder.Services.AddControllers();

            // CORS for my FrontEnd
            string website = builder.Configuration.GetSection("CORS").GetSection("website").Value;
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontEnd", options =>
                {
                    options.WithOrigins(website).AllowAnyHeader().AllowAnyMethod();
                });
            });

            // DB connection
            //builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("inMemoryDb"));

            string connectionString = builder.Configuration.GetConnectionString("MySQL");
            builder.Services.AddDbContext<AppDbContext>(options => options.UseMySQL(connectionString));

            // JWT Auth
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

            builder.Services.AddHostedService<ServerStatusChecker>();

            var app = builder.Build();

            using (var scope = app.Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                context.Database.EnsureCreated();
            }


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
