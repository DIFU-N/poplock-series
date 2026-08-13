using System.Security.Claims;
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

    private readonly InviteRepository _invites;
    private readonly InviteTokenService _tokenService;

    public AdminController(
        UserRepository users,
        JwtService jwt,
        InviteRepository invites,
        InviteTokenService tokenService
    )
    {
        _users = users;
        _jwt = jwt;
        _invites = invites;
        _tokenService = tokenService;
    }

    [HttpPost("make-admin")]
    public async Task<IActionResult> RegisterAdmin(string username)
    {
        var found = await _users.PromoteUser(username, UserRoles.Admin);

        if (!found)
        {
            return NotFound();
        }

        return Ok(new { message = "Admin created successfully" });
    }

    [HttpDelete("delete-account")]
    public async Task<IActionResult> DeleteAdmin(string username)
    {
        var existing = await _users.GetByUsernameAsync(username);

        if (existing == null)
            return BadRequest("User doesn't exist");

        if (existing.Role == "s.admin")
        {
            return BadRequest("Can't delete user");
        }

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

    [HttpPost("create-invite")]
    public async Task<IActionResult> CreateInvite(string name)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
        {
            return Unauthorized();
        }

        var token = _tokenService.GenerateToken();

        var invite = new Invite
        {
            TokenHash = _tokenService.HashToken(token),
            CreatedBy = userId,
            ExpiresAt = DateTime.UtcNow.AddDays(1),
            Used = false,
            RecipientName = name,
        };

        await _invites.CreateAsync(invite);

        return Ok(new { link = $"http://localhost:3000/invite/{token}" });
    }
}
