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

    [HttpPost("delete-account")]
    public async Task<IActionResult> DeleteAdmin(RegisterDto dto)
    {
        var existing = await _users.GetByUsernameAsync(dto.Username);

        if (existing == null)
            return BadRequest("User doesn't exist");

        await _users.DeleteAccount(existing.Username);

        return Ok(new { message = "User deleted successfully" });
    }
}
