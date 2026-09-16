using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DTO;
using server.Models;
using server.Repositories;
using server.Services;

namespace server.Controllers;

[ApiController]
[Route("api/fnfranks")]
public class FFRanksController : ControllerBase
{
    private readonly InviteRepository _invites;
    private readonly FFShowRankingRepository _ffRanking;
    private readonly ShowRepository _showRepository;
    private readonly InviteTokenService _tokenService;

    public FFRanksController(
        InviteRepository inviteRepository,
        FFShowRankingRepository rankingRepository,
        ShowRepository showRepository,
        InviteTokenService tokenService
    )
    {
        _invites = inviteRepository;
        _ffRanking = rankingRepository;
        _showRepository = showRepository;
        _tokenService = tokenService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateRanking(string token, FFRanking submission)
    {
        if (string.IsNullOrEmpty(token))
        {
            return BadRequest("Token required");
        }

        var tokenHash = _tokenService.HashToken(token);

        var invite = await _invites.GetValidInviteAsync(tokenHash);

        if (invite == null)
        {
            return Unauthorized("Invite invalid, expired, or already used");
        }

        // attach name from invite, so you don't have them input their names on the frontend
        submission.ParticipantsName = invite.RecipientName;

        await _ffRanking.CreateAsync(submission);

        await _invites.MarkInviteUsedAsync(invite.Id);

        return Ok(new { message = "Ranking submitted successfully" });
    }

    [HttpGet]
    public async Task<ActionResult<List<FFRanking>>> GetAll()
    {
        var data = _ffRanking.GetAllAsync();
        return Ok(data);
    }

    [HttpGet("name")]
    public async Task<ActionResult<FFRanking>> GetByParticipantName(string name)
    {
        var data = _ffRanking.GetByName(name);
        return Ok(data);
    }

    [HttpGet("top10")]
    public async Task<ActionResult<List<FFRankDTO>>> GetTopTen()
    {
        var rankings = await _ffRanking.GetTopTenAsync();

        var showIds = rankings.Select(x => x.ShowId).ToList();

        var shows = await _showRepository.GetByIdsAsync(showIds);

        var result = rankings
            .Select(rank =>
            {
                var show = shows.FirstOrDefault(x => x.Id == rank.ShowId);

                return new FFRankDTO
                {
                    ShowId = rank.ShowId,
                    ShowName = show?.Title ?? "",
                    ShowImage = show?.Image ?? "",
                    Points = rank.Points,
                };
            })
            .ToList();

        return Ok(result);
    }

    [HttpDelete("$id")]
    [Authorize(Roles = "admin,s.admin")]
    public async Task<IActionResult> DeleteFriend(string id)
    {
        await _ffRanking.DeleteRanking(id);

        return Ok("Friend deleted");
    }
}
