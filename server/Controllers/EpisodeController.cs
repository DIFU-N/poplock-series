using Microsoft.AspNetCore.Mvc;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("api/episodes")]
public class EpisodeController : ControllerBase
{
    private readonly EpisodeRepository _episodes;
    private readonly TvMazeService _tvmaze;
    private readonly ShowRepository _shows;

    public EpisodeController(EpisodeRepository episodes, TvMazeService tvMaze, ShowRepository shows)
    {
        _episodes = episodes;
        _tvmaze = tvMaze;
        _shows = shows;
    }

    [HttpGet]
    public async Task<IActionResult> GetEpisodes()
    {
        var episodes = await _episodes.GetAll();

        return Ok(new { message = "here are your episodes", episodes });
    }

    [HttpGet("scheduled")]
    public async Task<IActionResult> GetScheduledEpisodes()
    {
        var scheduled = _episodes.GetSchedules();

        return Ok(new { message = "the scheduled", scheduled });
    }
}
