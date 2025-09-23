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
        private readonly PasswordValidate _validate;

        public AuthController(AppDbContext appDbContext, PasswordValidate validate)
        {
            _appDbContext = appDbContext;
            _validate = validate;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody]RegisterModel model)
        {
            int count = _appDbContext.Users.Count();
            if (count > 0)
            {
                return BadRequest("Admin User already exists!");
            }
            if(await _appDbContext.Users.AnyAsync(u => u.UserName == model.UserName))
            {
                return BadRequest("User already exists!");
            }
            if (!_validate.ValidatePassword(model.Password))
            {
                return BadRequest("Must be atleast 8 characters long, Must contain at least one uppercase character (A–Z), Must contain at least one number (0–9), Must contain at least one special character from the set: ! ? _ $ /");
            }

            if (!_validate.ValidatePIN(model.PIN.ToString()))
            {
                return BadRequest("PIN has to be atleast 5 digits long");
            }

            User user = new User { UserName = model.UserName };
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);
            user.PINHash = BCrypt.Net.BCrypt.HashString(model.PIN.ToString());

            _appDbContext.Users.Add(user);
            _appDbContext.SaveChanges();

            return Ok("You are now registred!");
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginModel model)
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
                Secure = true,         // false = http ... in production should be HTTPs
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddDays(1)
            };

            //HTTP only cookie
            Response.Cookies.Append("jwt", token, cookieOptions);

            return Ok("logged in");
        }

        [HttpPut]
        [Authorize]
        public IActionResult ChangePassword([FromBody] ChangePasswordModel model)
        {
            User user = _appDbContext.Users.FirstOrDefault();
            if(user == null 
                || !BCrypt.Net.BCrypt.Verify(model.OldPassword, user.PasswordHash)
                || !BCrypt.Net.BCrypt.Verify(model.PIN, user.PINHash)) {
                return BadRequest("Old password or PIN does not match.");
            }
            if(BCrypt.Net.BCrypt.Verify(model.NewPassword, user.PasswordHash))
            {
                return BadRequest("Your new Password cant be the same as your Old Password");
            }
            if (model.NewPassword != model.NewPasswordSecondTime)
            {
                return BadRequest("New password does not match");
            }
            if (!_validate.ValidatePassword(model.NewPassword))
            {
                return BadRequest("Must be atleast 8 characters long, Must contain at least one uppercase character (A–Z), Must contain at least one number (0–9), Must contain at least one special character from the set: ! ? _ $ /");
            }
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.NewPassword);
            _appDbContext.Users.Update(user);
            _appDbContext.SaveChanges();
            return Ok("Password Changed");
        }

        [HttpPut]
        [Authorize]
        public IActionResult ChangePin([FromBody] ChangePINModel model)
        {
            var user = _appDbContext.Users.FirstOrDefault();
            if(user == null
                || !BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash)
                || !BCrypt.Net.BCrypt.Verify(model.OldPIN, user.PINHash))
            {
                return BadRequest("Password or old PIN does not match.");
            }
            if(BCrypt.Net.BCrypt.Verify(model.NewPIN, user.PINHash))
            {
                return BadRequest("Your new PIN cant be the same as your Old PIN");
            }
            if(model.NewPIN != model.NewPINSecondTime)
            {
                return BadRequest("New PIN does not match");
            }
            if (!_validate.ValidatePIN(model.NewPIN))
            {
                return BadRequest("PIN has to be atleast 5 digits long");
            }
            user.PINHash = BCrypt.Net.BCrypt.HashString(model.NewPIN);
            _appDbContext.Users.Update(user);
            _appDbContext.SaveChanges();
            return Ok("PIN changed");
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
