using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NKCourseApp.Models;
using NKCourseApp.Services;

namespace NKCourseApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileServices _services;
        public ProfileController(IProfileServices profileServices) {
            _services = profileServices;
        }

        [Route("GetProfileInfo")]
        [HttpGet]
        public async Task<IActionResult> GetProfileInfo(string email)
        {
            if (email == null)
                return BadRequest("Invalid client request");
            
            var profileInfo = await _services.GetProfileInfo(email);

            if (profileInfo != null)
                return Ok(profileInfo);

            return Ok("Error");
        }
    }
}
