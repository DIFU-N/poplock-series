using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Repositories;
using server.Services;

[ApiController]
[Route("api/musthavs")]
[Authorize]
public class MustHavsController : ControllerBase
{
    private readonly MustHavsRepository _musthavs;

    private readonly ShowRepository _show;

    private readonly InviteTokenService _tokenService;

    private readonly InviteRepository _invites;

    private readonly ShowRankingRepository _showRankings;

    public MustHavsController(
        MustHavsRepository musthavs,
        ShowRepository show,
        InviteTokenService tokenService,
        InviteRepository invites,
        ShowRankingRepository showRanking
    )
    {
        _musthavs = musthavs;
        _show = show;
        _tokenService = tokenService;
        _invites = invites;
        _showRankings = showRanking;
    }

    [HttpPost("/add")]
    // [AllowAnonymous]
    public async Task<IActionResult> AddMustHav(MustHavs mustHavs)
    {
        await _musthavs.AddMustHavs(mustHavs);

        return Ok(new { message = "Added Must Hav List", mustHavs });
    }

    [HttpPost("/add/top10")]
    public async Task<IActionResult> AddTop10FamFriends(string token, ShowRanking showRanking)
    {
        var tokenHash = _tokenService.HashToken(token);

        var invite = await _invites.UseInviteAsync(tokenHash);

        if (invite == null)
        {
            return Unauthorized("invalid, expired, or already used invite");
        }
        showRanking.ParticipantsName = invite.RecipientName;

        await _showRankings.CreateAsync(showRanking);

        return Ok(new { message = "Ranking submitted successfully", showRanking });
    }
}
