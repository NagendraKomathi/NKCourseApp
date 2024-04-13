using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NKCourseApp.Models;
using NKCourseApp.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace NKCourseApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private  readonly IAccountServices _services;

        public AccountController(IAccountServices accountServices)
        {
            _services = accountServices;
        }

        [Route("GetUserLogin")]
        [HttpPost]
        public async Task<IActionResult> GetUserLogin([FromBody] login login)
        {
            if (login == null)
                return BadRequest("Invalid client request");
            var user = await _services.LoginValidation(login);
            if (user == null)
                return NotFound(new { Message = "User Not Found!" });

            return Ok(new
            {
                Message = "Login Success!"
            });
        }
        [Route("LoginAuthentication")]
        [HttpPost]
        public async Task<IActionResult> LoginAuthentication([FromBody] login login)
        {
            if (login == null)
                return BadRequest("Invalid client request");
            //var user = await _services.LoginValidation(login);
            var user = await _services.LoginValidation(login);
            if(user != null)
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokenOption = new JwtSecurityToken(
                    issuer: "https://localhost:7070",
                    audience: "https://localhost:7070",
                    claims: new List<Claim>(),
                    expires: DateTime.UtcNow.AddMinutes(5),
                    signingCredentials: signingCredentials
                );
                var token = new JwtSecurityTokenHandler().WriteToken(tokenOption);
                return Ok(new
                {
                    Token = token,
                    user = user.FirstName + " " + user.LastName
                });
            }
            return Unauthorized();
        }
    }
}
