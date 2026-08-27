using System.Runtime.CompilerServices;
using MongoDB.Driver;
using server.Data;
using server.Models;

namespace server.Repositories;

public class ShowRepository
{
    private readonly IMongoCollection<Show> _shows;

    public ShowRepository(MongoDbContext context)
    {
        _shows = context.Shows;
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
}
