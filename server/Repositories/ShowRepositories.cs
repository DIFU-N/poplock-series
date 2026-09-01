using System.Runtime.CompilerServices;
using MongoDB.Driver;
using server.Data;
using server.Models;

namespace server.Repositories;

public class ShowRepository
{
    private readonly IMongoCollection<Show> _shows;
    private readonly IMongoCollection<Show> _bestWeekly;
    private readonly IMongoCollection<BestPerformer> _bestPerformer;

    public ShowRepository(MongoDbContext context)
    {
        _shows = context.Shows;
        _bestWeekly = context.BestWeekly;
        _bestPerformer = context.BestPerformers;
    }

    public async Task<Show?> GetByTitleAsync(string title)
    {
        return await _shows.Find(u => u.Title == title).FirstOrDefaultAsync();
    }

    public async Task<Show> GetByIdAsync(string id)
    {
        return await _shows.Find(u => u.Id == id).FirstOrDefaultAsync();
    }

    // public async Task<Show?> DeleteAsync(string id)
    // {
    //     var filter = Builders<Show>.Filter.Eq(w => w.Id, id);

    //     var update = Builders<Show>.Update.Set(w => w.Deleted, true);

    //     return await _shows.FindOneAndUpdateAsync(
    //         filter,
    //         update,
    //         new FindOneAndUpdateOptions<Show> { ReturnDocument = ReturnDocument.After }
    //     );
    // }

    public async Task AddAsync(Show show)
    {
        await _shows.InsertOneAsync(show);
    }

    public async Task<List<Show>> GetAllShows()
    {
        // _ => true... match every document.
        return await _shows.Find(_ => true).ToListAsync();
    }

    public async Task<Show> UpdateAsync(Show show)
    {
        var filter = Builders<Show>.Filter.Eq(w => w.Id, show.Id);

        // var update = Builders<Show>.Update.Set(w => w, show);

        return await _shows.FindOneAndReplaceAsync(
            filter,
            show,
            new FindOneAndReplaceOptions<Show> { ReturnDocument = ReturnDocument.After }
        );
    }

    public async Task<Show?> GetByTvMazeIdAsync(int tvMazeId)
    {
        return await _shows.Find(w => w.TvMazeId == tvMazeId).FirstOrDefaultAsync();
    }

    public async Task ClearAllFeatured()
    {
        var update = Builders<Show>.Update.Set(s => s.ScheduleFeatured, false);
        await _shows.UpdateManyAsync(_ => true, update);
    }

    public async Task SetFeatured(List<string> ids)
    {
        var filter = Builders<Show>.Filter.In(s => s.Id, ids);
        var update = Builders<Show>.Update.Set(s => s.ScheduleFeatured, true);

        await _shows.UpdateManyAsync(filter, update);
    }

    public async Task<List<Show>> GetScheduledFeaturedShows()
    {
        return await _shows.Find(u => u.ScheduleFeatured == true).Limit(10).ToListAsync();
    }

    public async Task<List<Show>> GetByIdsAsync(List<string> ids)
    {
        var filter = Builders<Show>.Filter.In(x => x.Id, ids);

        return await _shows.Find(filter).ToListAsync();
    }

    public async Task<List<Show>> SetBestWeekly(List<string> ids)
    {
        if (ids.Count != 3 || ids == null)
        {
            throw new InvalidOperationException("Has to be only 3");
        }
        var filter = Builders<Show>.Filter.In(x => x.Id, ids);

        List<Show>? shows = await _shows.Find(filter).ToListAsync();

        if (shows.Equals(null))
        {
            throw new InvalidDataException("cannot find the shows");
        }
        await _bestWeekly.DeleteManyAsync(Builders<Show>.Filter.Empty);
        await _bestWeekly.InsertManyAsync(shows);

        return shows;
    }

    public async Task<List<Show>> GetBestWeekly()
    {
        return await _bestWeekly.Find(_ => true).ToListAsync();
    }

    public async Task<List<BestPerformer>> SetBestPerformer(List<BestPerformer> performers)
    {
        if (performers == null)
        {
            throw new InvalidDataException("cannot be null");
        }

        await _bestPerformer.DeleteManyAsync(Builders<BestPerformer>.Filter.Empty);
        await _bestPerformer.InsertManyAsync(performers);
        return performers;
    }

    public async Task<List<BestPerformer>> GetBestPerformersAsync()
    {
        return await _bestPerformer.Find(_ => true).ToListAsync();
    }
}
