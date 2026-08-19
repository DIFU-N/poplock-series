using Microsoft.AspNetCore.Mvc;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("api/episodes")]
public class EpisodeController : ControllerBase
{
    private readonly EpisodeRepository _episodes;
    private readonly TvMazeService _tvmaze;

    public EpisodeController(EpisodeRepository episodes, TvMazeService tvMaze)
    {
        _episodes = episodes;
        _tvmaze = tvMaze;
    }

    [HttpGet]
    public async Task<IActionResult> GetEpisodes()
    {
        var episodes = await _episodes.GetAll();

        return Ok(new { message = "here are your episodes", episodes });
    }

    
}
