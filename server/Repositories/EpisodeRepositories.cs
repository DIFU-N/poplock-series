using MongoDB.Driver;
using server.Data;
using server.Models;

namespace server.Repositories;

public class EpisodeRepository
{
    private readonly IMongoCollection<Episode> _episodes;

    public EpisodeRepository(MongoDbContext context)
    {
        _episodes = context.Episode;
    }

    public async Task<List<Episode>> GetAll()
    {
        return await _episodes.Find(_ => true).SortBy(e => e.AirStamp).ToListAsync();
    }
}
