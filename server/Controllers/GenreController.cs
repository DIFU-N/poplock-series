using Microsoft.AspNetCore.Mvc;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("api/genres")]
public class GenreController : ControllerBase
{
    private readonly GenreRepository _genres;

    public GenreController(GenreRepository genres)
    {
        _genres = genres;
    }

    [HttpGet]
    public async Task<IActionResult> GetGenres()
    {
        var genres = await _genres.GetAllAsync();
        return Ok(genres);
    }
}
