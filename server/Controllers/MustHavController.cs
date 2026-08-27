using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DTO;
using server.Models;
using server.Repositories;
using server.Services;

[ApiController]
[Route("/api/musthavs")]
[Authorize]
public class MustHavsController : ControllerBase
{
    private readonly MustHavsRepository _musthavs;

    private readonly ShowRepository _show;

    private readonly InviteTokenService _tokenService;

    private readonly InviteRepository _invites;

    private readonly ShowRankingRepository _showRankings;

    private readonly TvMazeService _tvmaze;

    private readonly GenreRepository _genre;

    public MustHavsController(
        MustHavsRepository musthavs,
        ShowRepository show,
        InviteTokenService tokenService,
        InviteRepository invites,
        ShowRankingRepository showRanking,
        TvMazeService tvmaze,
        GenreRepository genre
    )
    {
        _musthavs = musthavs;
        _show = show;
        _tokenService = tokenService;
        _invites = invites;
        _showRankings = showRanking;
        _tvmaze = tvmaze;
        _genre = genre;
    }

    [HttpPost("add")]
    // [AllowAnonymous]
    public async Task<IActionResult> AddMustHav(MustHavs mustHavs)
    {
        var showIds = mustHavs.TvMazeIds;
        var stringIds = new List<string>();
        foreach (var i in showIds)
        {
            var showInShow = await _show.GetByTvMazeIdAsync(i);
            if (showInShow == null)
            {
                TvMazeSlugResponse? item = await _tvmaze.GetShow(i);

                if (item == null)
                    return NotFound("No show found");

                var genreIds = new List<string>();

                foreach (var genreName in item.Genres)
                {
                    var genre = await _genre.GetByNameAsync(genreName);

                    if (genre == null)
                    {
                        genre = new Genre { Name = genreName };

                        await _genre.CreateAsync(genre);
                    }

                    genreIds.Add(genre.Id);
                }

                var show = new Show
                {
                    Title = item.Name,
                    Image = item.Image?.Original ?? "",
                    AverageRuntime = item.AverageRuntime ?? 0,
                    Ended = item.Ended,
                    GenreIds = genreIds,
                    // Id = item.Id,
                    Language = item.Language,
                    Network = item.Network,
                    OfficialSite = item.OfficialSite,
                    Premiered = item.Premiered,
                    Rating = item.Rating?.Average,
                    Runtime = item.Runtime,
                    Status = item.Status,
                    Summary = item.Summary,
                    TvMazeId = item.Id,
                };

                await _show.AddAsync(show);
                stringIds.Add(show.Id);
            }
            else
            {
                stringIds.Add(showInShow.Id);
            }
        }
        var mustHavDK = new MustHavsShow
        {
            Description = mustHavs.Description,
            Id = mustHavs.Id,
            Name = mustHavs.Name,
            ShowIds = stringIds,
        };

        await _musthavs.AddMustHavs(mustHavDK);

        return Ok(new { message = "Added Must Hav List", mustHavs });
    }

    [HttpPost("add/top10")]
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

    [HttpGet("all")]
    [AllowAnonymous]
    public async Task<IActionResult> GetAllMustHavs()
    {
        var all = await _musthavs.GetAllMustHavs();

        return Ok(new { message = "Good hooops", all });
    }
}
