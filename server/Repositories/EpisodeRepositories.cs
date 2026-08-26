using Microsoft.VisualBasic;
using MongoDB.Driver;
using server.Data;
using server.DTO;
using server.Models;

namespace server.Repositories;

public class EpisodeRepository
{
    private readonly IMongoCollection<Episode> _episodes;
    private readonly ShowRepository _shows;
    private readonly TvMazeService _tvMaze;

    public EpisodeRepository(
        MongoDbContext context,
        ShowRepository shows,
        TvMazeService tvMazeService
    )
    {
        _episodes = context.Episode;
        _shows = shows;
        _tvMaze = tvMazeService;
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

    public async Task<List<ScheduleShowDTO>> GetSchedules()
    {
        var shows = await _shows.GetScheduledFeaturedShows();

        var tasks = shows.Select(async show =>
        {
            var nextEpisode = await _tvMaze.GetNextEpisode(show.TvMazeId);

            if (nextEpisode == null)
            {
                return null;
            }

            return new ScheduleShowDTO
            {
                Show = show,
                NextEpisode = new Episode
                {
                    AirDate = nextEpisode.AirDate,
                    AirStamp = nextEpisode.AirStamp,
                    AirTime = nextEpisode.AirTime,
                    Number = nextEpisode.Number,
                    ShowId = nextEpisode.ShowId,
                    Runtime = nextEpisode.Runtime,
                    Season = nextEpisode.Season,
                    Summary = nextEpisode.Summary,
                    Title = nextEpisode.Title,
                    TvMazeId = nextEpisode.Id,
                },
            };
        });

        var results = await Task.WhenAll(tasks);

        return results.OfType<ScheduleShowDTO>().OrderBy(x => x!.NextEpisode!.AirStamp).ToList();
    }
}
