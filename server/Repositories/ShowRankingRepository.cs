using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using server.Data;
using server.Models;

namespace server.Repositories;

public class ShowRankingRepository
{
    private readonly IMongoCollection<ShowRanking> _showRanking;

    public ShowRankingRepository(MongoDbContext context)
    {
        _showRanking = context.ShowRankings;
    }

    public async Task CreateAsync(ShowRanking showRanking)
    {
        await _showRanking.InsertOneAsync(showRanking);
    }

    public async Task<List<ShowRankingResult>> GetTop10Async<ShowRankingResults>()
    {
        var result = await _showRanking
            .Aggregate()
            .Group(
                r => r.ShowId,
                g => new ShowRankingResult { ShowId = g.Key, Points = g.Sum(r => 11 - r.Rank) }
            )
            .SortByDescending(x => x.Points)
            .Limit(10)
            .ToListAsync();

        return result;
    }
}
