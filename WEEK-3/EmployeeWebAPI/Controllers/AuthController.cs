using Microsoft.AspNetCore.Mvc;
using EmployeeWebAPI.Models;

namespace EmployeeWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login([FromBody] Login login)
        {
            if (login.Username == "admin" && login.Password == "password")
            {
                return Ok(new { Token = "dummy-jwt-token-for-testing", User = login.Username });
            }
            return Unauthorized("Invalid credentials");
        }
    }
}
