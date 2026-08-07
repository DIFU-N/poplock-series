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
    private readonly TvdbService _tvdb;
    private readonly ShowRepository _repo;

    public ShowController(TvdbService tvdb, ShowRepository repo)
    {
        _tvdb = tvdb;
        _repo = repo;
    }

    [HttpGet("search")]
    [AllowAnonymous]
    public async Task<IActionResult> Search([FromQuery] string query)
    {
        if (string.IsNullOrWhiteSpace(query))
            return Ok(new List<object>());

        var json = await _tvdb.SearchShowsByName(query);

        return Content(json, "application/json");
    }

    [HttpPost("import")]
    public async Task<IActionResult> Import([FromQuery] string slug)
    {
        var json = await _tvdb.SearchShow(slug);

        var result = JsonSerializer.Deserialize<TvdbSlugResponse>(
            json,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
        );

        var debugJson = JsonSerializer.Serialize(
            result,
            new JsonSerializerOptions { WriteIndented = true }
        );
        Console.WriteLine(json);

        var item = result?.Data;
        if (item == null)
            return NotFound("No show found");

        var show = new Show
        {
            Title = item.Name,
            Image = item.Image ?? "",
            Overview = item.Overview ?? "",
            FirstAired = item.FirstAired,
            LastAired = item.LastAired,
            OriginalCountry = item.OriginalCountry,
            OriginalLanguage = item.OriginalLanguage,
            AverageRuntime = item.AverageRuntime ?? 0,
            Score = item.Score ?? 0,
            Featured = false,
        };

        await _repo.AddAsync(show);

        return Ok(show);
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
    {
        var show = await _repo.GetAllShow();
        return Ok(show);
    }

    [HttpPut("feature/{id}")]
    public async Task<IActionResult> FeatureShow(string id)
    {
        var show = await _repo.GetByIdAsync(id);
        if (show == null)
            return NotFound();

        show.Featured = !show.Featured;
        await _repo.UpdateAsync(show);

        return Ok(show);
    }

    [HttpGet("featured")]
    [AllowAnonymous]
    public async Task<IActionResult> GetFeaturedShows()
    {
        var allShows = await _repo.GetAllShow();
        var featured = allShows.Where(s => s.Featured).Take(3).ToList();

        return Ok(featured);
    }

    [HttpPut("featured")]
    public async Task<IActionResult> SetFeatured([FromBody] List<string> showIds)
    {
        if (showIds.Count > 3)
            return BadRequest("Max 3 featured shows allowed");

        await _repo.ClearAllFeatured();

        await _repo.SetFeatured(showIds);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteShow(string id)
    {
        var show = await _repo.GetByIdAsync(id);
        if (show == null)
            return NotFound();

        await _repo.DeleteAsync(id);

        return NoContent(); // 204 is standard for delete
    }
}
