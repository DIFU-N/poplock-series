using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using server.DTO;
using server.Repositories;
using server.Services;

[ApiController]
[Route("api/invite")]
public class InviteController : ControllerBase
{
    private readonly InviteRepository _invite;
    private readonly InviteTokenService _tokenService;

    public InviteController(InviteRepository invite, InviteTokenService tokenService)
    {
        _invite = invite;
        _tokenService = tokenService;
    }

    [HttpGet("{token}")]
    public async Task<IActionResult> GetInvite(string token)
    {
        var tokenHash = _tokenService.HashToken(token);

        var invite = await _invite.GetValidInviteAsync(tokenHash);

        if (invite == null)
        {
            return NotFound("Invalid or expired invite.");
        }

        return Ok(invite);
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateInvite([FromBody] CreateInviteRequest request)
    {
        var tokenHash = _tokenService.HashToken(request.Token);

        var currentInvite = await _invite.GetValidInviteAsync(tokenHash);
        if (currentInvite == null)
            return Unauthorized("Invalid invite");

        var alreadyCreated = await _invite.GetByParentInviteIdAsync(currentInvite.Id);

        if (alreadyCreated != null)
        {
            return BadRequest("You already invited someone.");
        }

        var normalized = request.Name.ToLower().Trim();

        var nameExists = await _invite.GetByRecipientNameAsync(normalized);

        if (nameExists != null && !nameExists.Used && nameExists.ExpiresAt > DateTime.UtcNow)
        {
            return BadRequest(
                "Person with this name has been invited already. Invite someone else."
            );
        }

        var newToken = _tokenService.GenerateToken();

        var invite = new Invite
        {
            TokenHash = _tokenService.HashToken(newToken),
            CreatedFromInviteId = currentInvite.Id,
            CreatedBy = currentInvite.RecipientName,
            ExpiresAt = DateTime.UtcNow.AddDays(10),
            Used = false,
            RecipientName = normalized,
        };

        await _invite.CreateAsync(invite);

        return Ok(new { link = $"https://poplockseries.netlify.app/invite/{newToken}" });
    }
}
