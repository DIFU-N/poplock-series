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

    private readonly ShowService _showService;

    private List<ShowRanks> MapToRanks(List<string> showIds)
    {
        return showIds
            .Select((id, index) => new ShowRanks { ShowId = id, Rank = index + 1 })
            .ToList();
    }

    private FFRankDTO ToDto(ShowRanks rank, Show show)
    {
        return new FFRankDTO
        {
            ShowId = rank.ShowId,
            ShowName = show?.Title ?? "",
            ShowImage = show?.Image ?? "",
            Rank = rank.Rank,
        };
    }

    public FFRanksController(
        InviteRepository inviteRepository,
        FFShowRankingRepository rankingRepository,
        ShowRepository showRepository,
        InviteTokenService tokenService,
        ShowService showService
    )
    {
        _invites = inviteRepository;
        _ffRanking = rankingRepository;
        _showRepository = showRepository;
        _tokenService = tokenService;
        _showService = showService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateRanking([FromBody] CreateRankingDTO rankedObj)
    {
        var token = rankedObj.Token;
        // var submission = rankedObj.Submission;
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

        var showIds = await _showService.ResolveTvMazeIds(rankedObj.TvMazeIds);

        // attach name from invite, so you don't have them input their names on the frontend
        var ranking = new FFRanking
        {
            ParticipantsName = invite.RecipientName,
            RankingList = MapToRanks(showIds),
        };

        await _ffRanking.CreateAsync(ranking);

        await _invites.MarkInviteUsedAsync(invite.Id);

        return Ok(new { message = "Ranking submitted successfully" });
    }

    [HttpGet]
    public async Task<ActionResult<List<FFRankDTO>>> GetAll()
    {
        var data = await _ffRanking.GetAllAsync();

        var allShowIds = data.SelectMany(x => x.RankingList)
            .Select(x => x.ShowId)
            .Distinct()
            .ToList();

        var shows = await _showRepository.GetByIdsAsync(allShowIds);
        var showMap = shows.ToDictionary(x => x.Id);

        var result = data.SelectMany(ranking =>
                ranking.RankingList.Select(rank =>
                {
                    showMap.TryGetValue(rank.ShowId, out var show);

                    return new FFRankDTO
                    {
                        ShowId = rank.ShowId,
                        ShowName = show?.Title ?? "",
                        ShowImage = show?.Image ?? "",
                        Rank = rank.Rank,
                    };
                })
            )
            .ToList();

        return Ok(result);
    }

    [HttpGet("name")]
    public async Task<ActionResult<FFRankDTO>> GetByParticipantName([FromQuery] string name)
    {
        var data = await _ffRanking.GetByName(name);

        var showIds = data.RankingList.Select(x => x.ShowId).ToList();
        var shows = await _showRepository.GetByIdsAsync(showIds);
        var showMap = shows.ToDictionary(x => x.Id);

        var result = data.RankingList.Select(rank =>
        {
            showMap.TryGetValue(rank.ShowId, out var show);

            return new FFRankDTO
            {
                ShowId = rank.ShowId,
                ShowName = show?.Title ?? "",
                ShowImage = show?.Image ?? "",
                Rank = rank.Rank,
            };
        });

        return Ok(result);
    }

    [HttpGet("top10")]
    public async Task<ActionResult<List<FFPointsDTO>>> GetTopTen()
    {
        var rankings = await _ffRanking.GetTopTenAsync();

        var showIds = rankings.Select(x => x.ShowId).ToList();

        var shows = await _showRepository.GetByIdsAsync(showIds);

        var result = rankings
            .Select(rank =>
            {
                var show = shows.FirstOrDefault(x => x.Id == rank.ShowId);

                return new FFPointsDTO
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

    [HttpDelete("{id}")]
    [Authorize(Roles = "admin,s.admin")]
    public async Task<IActionResult> DeleteFriend(string id)
    {
        await _ffRanking.DeleteRanking(id);

        return Ok("Friend deleted");
    }

    [HttpPost("ranking/admin")]
    [Authorize(Roles = "admin,s.admin")]
    public async Task<IActionResult> CreateAdminRanking([FromBody] AdminRankingRequest request)
    {
        if (request.TvMazeIds.Count != 10)
        {
            return BadRequest("Ranking must contain exactly 10 shows.");
        }

        var showIds = await _showService.ResolveTvMazeIds(request.TvMazeIds);

        var ranking = new FFRanking
        {
            ParticipantsName = "Dadaman",
            RankingList = MapToRanks(showIds),
        };

        await _ffRanking.CreateAsync(ranking);

        return Ok(ranking);
    }

    [HttpGet("dadaman")]
    public async Task<ActionResult<FFRankDTO>> GetDadamans()
    {
        var data = await _ffRanking.GetDadamanRanking();

        var showIds = data.RankingList.Select(x => x.ShowId).ToList();
        var shows = await _showRepository.GetByIdsAsync(showIds);
        var showMap = shows.ToDictionary(x => x.Id);

        var result = data.RankingList.Select(rank =>
        {
            showMap.TryGetValue(rank.ShowId, out var show);

            return new FFRankDTO
            {
                ShowId = rank.ShowId,
                ShowName = show?.Title ?? "",
                ShowImage = show?.Image ?? "",
                Rank = rank.Rank,
            };
        });

        return Ok(result);
    }
}
