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

    private readonly EpisodeRepository _episode;

    public ShowController(
        TvMazeService tvmaze,
        ShowRepository repo,
        GenreRepository genre,
        EpisodeRepository episode
    )
    {
        _tvmaze = tvmaze;
        _repo = repo;
        _genre = genre;
        _episode = episode;
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

    [HttpPost("search/in")]
    [AllowAnonymous]
    public async Task<IActionResult> SearchInDb([FromBody] SearchInDbRequest request)
    {
        var id = request.Id;

        var show = await _repo.GetByIdAsync(id);
        return Ok(show);
    }

    [HttpPost("import")]
    [AllowAnonymous]
    public async Task<IActionResult> Import([FromBody] ImportShowRequest request)
    {
        var tvMazeId = request.TvMazeId;

        var existing = await _repo.GetByTvMazeIdAsync(tvMazeId);

        if (existing != null)
        {
            // Console.WriteLine(JsonSerializer.Serialize(existing));
            return Ok(existing);
        }

        var item = await _tvmaze.GetShow(tvMazeId);

        // it needs to be deserialized because cs reads json responses as strings.

        // var result = JsonSerializer.Deserialize<TvMazeSlugResponse>(
        //     json,
        //     new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
        // );

        // var item = result;
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

    [HttpPut("feature/{id}")]
    public async Task<IActionResult> FeatureShow(string id)
    {
        var show = await _repo.GetByIdAsync(id);
        if (show == null)
            return NotFound();

        show.ScheduleFeatured = !show.ScheduleFeatured;
        await _repo.UpdateAsync(show);

        // var episodes = await _tvmaze.GetEpisodes(show.TvMazeId);

        // foreach (var episode in episodes)
        // {
        //     episode.ShowId = show.Id;

        //     await _episode.UpserEpisode(episode);
        // }

        return Ok(show);
    }

    [HttpGet("featured")]
    [AllowAnonymous]
    public async Task<IActionResult> GetFeaturedShows()
    {
        var allShows = await _repo.GetAllShows();
        var featured = allShows.Where(s => s.ScheduleFeatured).Take(10).ToList();

        return Ok(featured);
    }

    [HttpPut("featured/set")]
    [Authorize(Roles = "admin,s.admin")]
    public async Task<IActionResult> SetFeatured([FromBody] List<string> showIds)
    {
        if (showIds.Count > 10)
            return BadRequest("Max 3 featured shows allowed");

        await _repo.ClearAllFeatured();

        await _repo.SetFeatured(showIds);

        return Ok();
    }

    [HttpPost("featured/sync")]
    public async Task<IActionResult> SyncFeaturedShows()
    {
        var allShows = await _repo.GetAllShows();

        var featured = allShows.Where(w => w.ScheduleFeatured).Take(10).ToList();

        foreach (var show in featured)
        {
            // var episodes = await _tvmaze.GetEpisodes(show.TvMazeId);

            // foreach (var episode in episodes)
            // {
            //     episode.ShowId = show.Id;

            //     await _episode.UpserEpisode(episode);
            // }
        }

        return Ok();
    }

    [HttpPost("bestweekly")]
    public async Task<IActionResult> SetBestWeekly([FromBody] List<string> ids)
    {
        var best = await _repo.SetBestWeekly(ids);

        return Ok(best);
    }

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
