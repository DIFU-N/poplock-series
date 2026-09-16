using Microsoft.AspNetCore.Mvc;
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
}