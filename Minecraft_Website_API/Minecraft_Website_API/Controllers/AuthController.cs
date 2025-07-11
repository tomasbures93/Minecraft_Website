using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Minecraft_Website_API.Models;
using Minecraft_Website_API.Services;

namespace Minecraft_Website_API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public AuthController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            if(await _appDbContext.Users.AnyAsync(u => u.UserName == model.UserName))
            {
                return BadRequest("User already exists!");
            }

            // TODO -> password length etc.

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
                Secure = false,         // For HTTPs in production
                Expires = DateTime.UtcNow.AddDays(1)
            };

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
