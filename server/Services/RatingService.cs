using MongoDB.Driver;
using server.DTO;
using server.Models;
using server.Repositories;

public class RatingService
{
    private readonly RatingRepository _ratings;
    private readonly ShowRepository _shows;

    private readonly UserRepository _users;

    public RatingService(RatingRepository ratings, ShowRepository shows, UserRepository users)
    {
        _ratings = ratings;
        _shows = shows;
        _users = users;
    }

    public async Task<List<RatingWithShow>> GetUserRatings(string userId)
    {
        var ratings = await _ratings.GetByUserId(userId);

        var results = new List<RatingWithShow>();

        foreach (var rating in ratings)
        {
            var show = await _shows.GetByIdAsync(rating.ShowId);

            if (show == null)
                continue;

            results.Add(
                new RatingWithShow
                {
                    Id = rating.Id,
                    Score = rating.Score,
                    Show = show,
                    UpdatedAt = rating.UpdatedAt,
                }
            );
        }
        return results;
    }

    public async Task<List<RatingWithShow>> GetDadamansRatings()
    {
        User? admin = await _users.GetByRole("s.admin");

        if (admin == null)
        {
            throw new InvalidOperationException("Dadaman rating not found. Report to admin");
        }

        var adminId = admin.Id;
        // var userId =
        var ratings = await _ratings.GetByUserId(adminId);

        var results = new List<RatingWithShow>();

        foreach (var rating in ratings)
        {
            var show = await _shows.GetByIdAsync(rating.ShowId);

            if (show == null)
                continue;

            results.Add(
                new RatingWithShow
                {
                    Id = rating.Id,
                    Score = rating.Score,
                    Show = show,
                    UpdatedAt = rating.UpdatedAt,
                }
            );
        }
        return results;
    }
}
