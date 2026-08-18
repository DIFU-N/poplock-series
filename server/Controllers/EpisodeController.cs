using Microsoft.AspNetCore.Mvc;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("api/episodes")]
public class EpisodeController : ControllerBase
{
    private readonly EpisodeRepository _episodes;

    public EpisodeController(EpisodeRepository episodes)
    {
        _episodes = episodes;
    }

    [HttpGet]
    public async Task<IActionResult> GetEpisodes()
    {
        var episodes = await _episodes.GetAll();

        return Ok(new { message = "here are your episodes", episodes });
    }
}
