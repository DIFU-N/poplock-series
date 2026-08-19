using MongoDB.Driver;
using server.Data;
using server.Models;

namespace server.Repositories;

public class RatingRepository
{
    private readonly IMongoCollection<Rating> _ratings;
    private readonly IMongoCollection<User> _user;

    public RatingRepository(MongoDbContext context)
    {
        _ratings = context.Rating;
        _user = context.Users;
    }

    public async Task RateShow(Rating rating)
    {
        await _ratings.InsertOneAsync(rating);
    }

    public async Task<List<Rating>> GetByUserId(string userId)
    {
        return await _ratings.Find(r => r.UserId == userId).ToListAsync();
    }

    public async Task<Rating?> GetByUserandShow(string userId, string showId)
    {
        return await _ratings
            .Find(r => r.UserId == userId && r.ShowId == showId)
            .FirstOrDefaultAsync();
    }

    public async Task Update(string id, int score)
    {
        var update = Builders<Rating>
            .Update.Set(r => r.Score, score)
            .Set(r => r.UpdatedAt, DateTime.UtcNow);

        await _ratings.UpdateOneAsync(r => r.Id == id, update);
    }

    public async Task<List<Rating>> GetByShowId(string showId)
    {
        return await _ratings.Find(r => r.ShowId == showId).ToListAsync();
    }
}
