using server.DTO;
using server.Repositories;

public class RatingService
{
    private readonly RatingRepository _ratings;
    private readonly ShowRepository _shows;

    public RatingService(RatingRepository ratings, ShowRepository shows)
    {
        _ratings = ratings;
        _shows = shows;
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
}
