using MongoDB.Driver;
using server.Data;
using server.Models;

namespace server.Repositories;

public class GenreRepository
{
    private readonly IMongoCollection<Genre> _Genres;

    public GenreRepository(MongoDbContext context)
    {
        _Genres = context.Genre;
    }

    public async Task<Genre?> GetByNameAsync(string name)
    {
        return await _Genres.Find(g => g.Name == name).FirstOrDefaultAsync();
    }

    public async Task<Genre?> GetByIdAsync(string id)
    {
        return await _Genres.Find(g => g.Id == id).FirstOrDefaultAsync();
    }

    public async Task<List<Genre>> GetAllAsync()
    {
        return await _Genres.Find(_ => true).ToListAsync();
    }

    public async Task CreateAsync(Genre Genre)
    {
        await _Genres.InsertOneAsync(Genre);
    }

    public async Task<List<Genre>> GetManyByIdsAsync(List<string> ids)
    {
        var filter = Builders<Genre>.Filter.In(g => g.Id, ids);
        return await _Genres.Find(filter).ToListAsync();
    }
}
