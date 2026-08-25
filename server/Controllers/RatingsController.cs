using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DTO;
using server.Models;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("/api/rating")]
[Authorize]
public class RatingController : ControllerBase
{
    private readonly RatingRepository _rating;
    private readonly RatingService _ratingService;

    public RatingController(RatingRepository rating, RatingService ratingService)
    {
        _rating = rating;
        _ratingService = ratingService;
    }

    [HttpPost]
    public async Task<IActionResult> RateShow([FromBody] RateShowRequest request)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }

        await _rating.RateShow(request, userId);

        return Ok();
    }

    [HttpGet("me")]
    public async Task<IActionResult> GetUsersRatings()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }

        var userRatings = await _ratingService.GetUserRatings(userId);

        return Ok(userRatings);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateRating([FromBody] UpdateRateShowRequest request)
    {
        var updated = _rating.Update(request.Id, request.Score);

        return Ok(updated);
    }

    [HttpGet("average/{showId}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetAverageRating(string showId)
    {
        List<Rating> showRatings = await _rating.GetByShowId(showId);

        if (!showRatings.Any())
        {
            return Ok(null);
        }

        var allScores = showRatings.Select(r => r.Score);

        var averageScore = allScores.Average();

        return Ok(averageScore);
    }

    [HttpGet("{showId}/me")]
    public async Task<IActionResult> GetUserShowRating(string showId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }

        var filtered = await _rating.GetByUserandShow(userId, showId);

        return Ok(filtered);
    }

    [HttpGet("{showId}/dadaman")]
    [AllowAnonymous]
    public async Task<IActionResult> GetDadamansRating(string showId)
    {
        var filtered = await _rating.GetDadamansRating(showId);

        return Ok(filtered);
    }
}
