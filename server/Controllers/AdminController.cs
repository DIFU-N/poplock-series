using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DTO;
using server.Models;
using server.Repositories;
using server.Services;

namespace server.Controllers;

[ApiController]
[Route("api/admin")]
[Authorize(Roles = "admin")]
public class AdminController : ControllerBase
{
    private readonly UserRepository _users;
    private readonly JwtService _jwt;

    public AdminController(UserRepository users, JwtService jwt)
    {
        _users = users;
        _jwt = jwt;
    }

    [HttpPost("register-admin")]
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
            Role = UserRoles.Admin,
        };

        await _users.CreateAsync(admin);

        return Ok(new { message = "Admin created successfully" });
    }

    [HttpDelete("delete-account")]
    public async Task<IActionResult> DeleteAdmin(string username)
    {
        var existing = await _users.GetByUsernameAsync(username);

        if (existing == null)
            return BadRequest("User doesn't exist");

        await _users.DeleteAccount(existing.Username);

        return Ok(new { message = "User deleted successfully" });
    }

    [HttpPost("ban-account")]
    public async Task<IActionResult> BanAccount(string username)
    {
        var existing = await _users.GetByUsernameAsync(username);

        if (existing == null)
            return BadRequest("User doesn't exist");

        await _users.BanAccount(existing.Username);

        return Ok(new { message = $"{existing.Username} Account Banned" });
    }

    [HttpPost("unban-account")]
    public async Task<IActionResult> UnbanAccount(string username)
    {
        var existing = await _users.GetByUsernameAsync(username);

        if (existing == null)
            return BadRequest("User doesn't exist");

        await _users.UnbanAccount(existing.Username);

        return Ok(new { message = $"{existing.Username} Account Unbanned" });
    }
}
