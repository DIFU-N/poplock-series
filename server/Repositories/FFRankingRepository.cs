using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using server.Data;
using server.Models;

namespace server.Repositories;

public class FFShowRankingRepository
{
    private readonly IMongoCollection<FFRanking> _ffRanking;

    public FFShowRankingRepository(MongoDbContext context)
    {
        _ffRanking = context.FFRanking;
    }

    public async Task CreateAsync(FFRanking submission)
    {
        await _ffRanking.InsertOneAsync(submission);
    }

    public async Task<List<FFRanking>> GetAllAsync()
    {
        return await _ffRanking.Find(_ => true).ToListAsync();
    }

    public async Task<FFRanking> GetByName(string name)
    {
        return await _ffRanking.Find(x => x.ParticipantsName == name).FirstOrDefaultAsync();
    }

    public async Task<bool> ExistsByParticipant(string participantsName)
    {
        return await _ffRanking.Find(x => x.ParticipantsName == participantsName).AnyAsync();
    }

    public async Task<List<RankingResult>> GetTopTenAsync()
    {
        return await _ffRanking
            .Aggregate()
            .Unwind<FFRanking, ShowRanks>(x => x.RankingList)
            .Group(
                x => x.ShowId,
                g => new RankingResult { ShowId = g.Key, Points = g.Sum(x => 11 - x.Rank) }
            )
            .SortByDescending(x => x.Points)
            .Limit(10)
            .ToListAsync();
    }

    public async Task DeleteRanking(string id)
    {
        await _ffRanking.DeleteOneAsync(x => x.Id == id);
    }
}
