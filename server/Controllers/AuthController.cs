// Handles authentication HTTP endpoints:
// /register → creates a new user
// /login → validates credentials and returns a JWT
// This is the entry point for auth requests.
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DTO;
using server.Models;
using server.Repositories;
using server.Services;

namespace server.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly UserRepository _users;
    private readonly JwtService _jwt;

    public AuthController(UserRepository users, JwtService jwt)
    {
        _users = users;
        _jwt = jwt;
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        var existing = await _users.GetByUsernameAsync(dto.Username);
        if (existing != null)
            return BadRequest("User already exists");

        var user = new User
        {
            Username = dto.Username,
            PasswordHash = PasswordService.HashPassword(dto.Password),
            Banned = false,
            Role = UserRole.User,
        };

        await _users.CreateAsync(user);
        return Ok(new { message = "User registered successfully" });
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _users.GetByUsernameAsync(dto.Username);
        if (user == null || !PasswordService.Verify(dto.Password, user.PasswordHash))
            return Unauthorized();

        var token = _jwt.GenerateToken(user);

        Response.Cookies.Append(
            "auth_token",
            token,
            new CookieOptions
            {
                HttpOnly = true,
                Secure = true, // true in production (HTTPS)
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddDays(1000),
            }
        );

        return Ok(new { message = "Logged in successfully" });
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("auth_token");
        return Ok(new { message = "Logged out" });
    }

    [HttpPost("register-admin")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> RegisterAdmin(RegisterDto dto)
    {
        var existing = await _users.GetByUsernameAsync(dto.Username);

        if (existing != null)
            return BadRequest("User already exists");

        var admin = new User
        {
            Username = dto.Username,
            PasswordHash = PasswordService.HashPassword(dto.Password),
            Banned = false,
            Role = UserRole.Admin,
        };

        await _users.CreateAsync(admin);

        return Ok(new { message = "Admin created successfully" });
    }

    [HttpPost("delete-account")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteAdmin(RegisterDto dto)
    {
        var existing = await _users.GetByUsernameAsync(dto.Username);

        if (existing == null)
            return BadRequest("User doesn't exist");

        await _users.DeleteAccount(existing.Username);

        return Ok(new { message = "User deleted successfully" });
    }
}
