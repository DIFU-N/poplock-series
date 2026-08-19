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

    public async Task AddEpisode(Episode episode)
    {
        await _episodes.InsertOneAsync(episode);
    }

    public async Task DeleteEpisodeByShowId(string showId)
    {
        var filter = Builders<Episode>.Filter.Eq(s => s.ShowId, showId);

        await _episodes.DeleteManyAsync(filter);
    }

    public async Task UpserEpisode(Episode episode)
    {
        var filter = Builders<Episode>.Filter.Eq(r => r.TvMazeId, episode.TvMazeId);

        await _episodes.ReplaceOneAsync(filter, episode, new ReplaceOptions { IsUpsert = true });
    }
}
