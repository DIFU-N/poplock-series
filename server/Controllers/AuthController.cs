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

        if (dto.Username.Length > 30)
            return BadRequest("Username cannot exceed 30 characters.");

        if (dto.Username.Length < 3)
            return BadRequest("Username must be at least 3 characters.");

        if (dto.Password.Length > 64)
            return BadRequest("Password cannot exceed 64 characters.");

        if (dto.Password.Length < 8)
            return BadRequest("Password must be at least 8 characters.");

        var user = new User
        {
            Username = dto.Username,
            PasswordHash = PasswordService.HashPassword(dto.Password),
            Banned = false,
            Role = UserRoles.User,
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

        return Ok(
            new
            {
                message = "Logged in successfully",
                token = token,
                user,
            }
        );
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("auth_token");
        return Ok(new { message = "Logged out" });
    }
}
