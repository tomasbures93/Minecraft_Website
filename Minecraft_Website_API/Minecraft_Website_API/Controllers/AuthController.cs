using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Minecraft_Website_API.Models;
using Minecraft_Website_API.Services;

namespace Minecraft_Website_API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [EnableRateLimiting("PerIpLimit")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public AuthController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        // This only allowed for short period of time
        [HttpPost]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            if(await _appDbContext.Users.AnyAsync(u => u.UserName == model.UserName))
            {
                return BadRequest("User already exists!");
            }

            if (!model.ValidPassword())
            {
                return BadRequest("Must contain at least one uppercase letter (A–Z), Must contain at least one number (0–9), Must contain at least one special character from the set: ! ? _ $ /");
            }

            User user = new User { UserName = model.UserName };
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);
            user.PINHash = BCrypt.Net.BCrypt.HashString(model.PIN.ToString());

            _appDbContext.Users.Add(user);
            _appDbContext.SaveChanges();

            return Ok("You are now registred!");
        }

        [HttpPost]
        public IActionResult Login(LoginModel model)
        {
            var User = _appDbContext.Users.FirstOrDefault(u => u.UserName == model.UserName);

            if(User == null ||
                !BCrypt.Net.BCrypt.Verify(model.Password, User.PasswordHash) ||
                !BCrypt.Net.BCrypt.Verify(model.PIN.ToString(), User.PINHash))
            {
                return BadRequest("User or Password is wrong");
            }

            // JWTtoken 
            var token = JWTHelper.GenerateJwtToken(User);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = false,         // false = http ... in production should be HTTPs
                Expires = DateTime.UtcNow.AddDays(1)
            };

            //HTTP only cookie
            Response.Cookies.Append("jwt", token, cookieOptions);

            return Ok("logged in");
        }

        [HttpPost]
        [Authorize]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok("Logout");
        }
    }
}
