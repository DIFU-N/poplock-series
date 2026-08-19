using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("/api/rating")]
[Authorize]
public class RatingController : ControllerBase
{
    private readonly RatingRepository _rating;

    public RatingController(RatingRepository rating)
    {
        _rating = rating;
    }

    [HttpPost]
    public async Task<IActionResult> RateShow(Rating rating)
    {
        var ratings = _rating.RateShow(rating);

        return Ok(ratings);
    }

    [HttpGet("me")]
    public async Task<IActionResult> GetUsersRatings()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }

        var userRatings = await _rating.GetByUserId(userId);

        return Ok(userRatings);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateRating(Rating rating)
    {
        var updated = _rating.Update(rating.Id, rating.Score);

        return Ok(updated);
    }

    [HttpGet("average/{showId}")]
    public async Task<IActionResult> GetAverageRating(string showId)
    {
        List<Rating> showRatings = await _rating.GetByShowId(showId);

        var allScores = showRatings.Select(r => r.Score);

        var averageScore = allScores.Average();

        return Ok(averageScore);
    }
}
