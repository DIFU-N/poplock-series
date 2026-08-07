// Example of a protected endpoint.
// Requires a valid JWT ([Authorize])
// Used to confirm auth is working
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("api/secure")]
[Authorize]
public class SecureController : ControllerBase
{
    private readonly UserRepository _users;

    public SecureController(UserRepository users)
    {
        _users = users;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok("You are authenticated");
    }

    [Authorize]
    [HttpGet("me")]
    public IActionResult Me()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var username = User.FindFirstValue(ClaimTypes.Name);

        return Ok(new { id = userId, username = username });
    }

    [AllowAnonymous]
    [HttpGet("health")]
    public IActionResult Health()
    {
        return Ok(new { status = "Healthy", time = DateTime.UtcNow });
    }

    [HttpDelete("me")]
    public async Task<IActionResult> DeleteMyAccount()
    {
        var username = User.FindFirstValue(ClaimTypes.Name);

        if (username == null)
            return Unauthorized();

        await _users.DeleteAccount(username);

        return NoContent();
    }
}
