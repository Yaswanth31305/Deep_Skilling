using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JwtAuthenticationDemo.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SecureController : ControllerBase
    {
        [HttpGet("data")]
        public IActionResult GetSecureData()
        {
            var user = User.Identity?.Name ?? "Authenticated User";
            return Ok(new
            {
                Message = $"Access Granted to protected endpoint for {user}!",
                Timestamp = DateTime.UtcNow
            });
        }
    }
}
