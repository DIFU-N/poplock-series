using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using server.DTO;
using server.Models;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("api/show")]
[Authorize]
public class ShowController : ControllerBase
{
    private readonly TvMazeService _tvmaze;
    private readonly ShowRepository _repo;

    private readonly GenreRepository _genre;

    public ShowController(TvMazeService tvmaze, ShowRepository repo, GenreRepository genre)
    {
        _tvmaze = tvmaze;
        _repo = repo;
        _genre = genre;
    }

    [HttpGet("search")]
    [AllowAnonymous]
    public async Task<IActionResult> Search([FromQuery] string query)
    {
        if (string.IsNullOrWhiteSpace(query))
            return Ok(new List<object>());

        var json = await _tvmaze.SearchShow(query);

        return Content(json, "application/json");
    }

    [HttpPost("import")]
    public async Task<IActionResult> Import(int tvMazeId)
    {
        var existing = await _repo.GetByTvMazeIdAsync(tvMazeId);

        if (existing != null)
        {
            return Ok(existing);
        }

        var json = await _tvmaze.GetShow(tvMazeId);

        // it needs to be deserialized because cs reads json responses as strings.

        var result = JsonSerializer.Deserialize<TvMazeSlugResponse>(
            json,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
        );

        var item = result;
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

        await _repo.AddAsync(show);

        return Ok(show);
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
    {
        var show = await _repo.GetAllShows();
        return Ok(show);
    }

    // [HttpPut("feature/{id}")]
    // public async Task<IActionResult> FeatureShow(string id)
    // {
    //     var show = await _repo.GetByIdAsync(id);
    //     if (show == null)
    //         return NotFound();

    //     show.Featured = !show.Featured;
    //     await _repo.UpdateAsync(show);

    //     return Ok(show);
    // }

    // [HttpGet("featured")]
    // [AllowAnonymous]
    // public async Task<IActionResult> GetFeaturedShows()
    // {
    //     var allShows = await _repo.GetAllShow();
    //     var featured = allShows.Where(s => s.Featured).Take(3).ToList();

    //     return Ok(featured);
    // }

    // [HttpPut("featured")]
    // public async Task<IActionResult> SetFeatured([FromBody] List<string> showIds)
    // {
    //     if (showIds.Count > 3)
    //         return BadRequest("Max 3 featured shows allowed");

    //     await _repo.ClearAllFeatured();

    //     await _repo.SetFeatured(showIds);

    //     return Ok();
    // }

    // [HttpDelete("{id}")]
    // public async Task<IActionResult> DeleteShow(string id)
    // {
    //     var show = await _repo.GetByIdAsync(id);
    //     if (show == null)
    //         return NotFound();

    //     await _repo.DeleteAsync(id);

    //     return NoContent(); // 204 is standard for delete
    // }
}
