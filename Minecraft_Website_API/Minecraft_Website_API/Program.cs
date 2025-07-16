using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Minecraft_Website_API.Services;
using System.Text;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.RateLimiting;

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
                    options.WithOrigins(website).AllowAnyHeader().AllowAnyMethod().AllowCredentials();
                });
            });

            // DB connection
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

            //Rate Limiting ( 1x per Second per IP )
            builder.Services.AddRateLimiter(options =>
            {
                options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
                options.AddPolicy("PerIpLimit", context =>
                    RateLimitPartition.Get<string>(
                        context.Connection.RemoteIpAddress?.ToString() ?? "unknown",
                        key => new FixedWindowRateLimiter(
                            new FixedWindowRateLimiterOptions
                            {
                                PermitLimit = 3,
                                Window = TimeSpan.FromSeconds(1),
                                QueueLimit = 2,
                                AutoReplenishment = true
                            })));
            });

            var app = builder.Build();

            using (var scope = app.Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                context.Database.EnsureCreated();
            }


            // Configure the HTTP request pipeline.
            app.UseCors("AllowFrontEnd");

            app.UseMiddleware<CookieJWTMiddleware>();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseRateLimiter();


            app.MapControllers();

            app.Run();
        }
    }
}
