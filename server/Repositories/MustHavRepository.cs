using MongoDB.Driver;
using server.Data;
using server.Models;

namespace server.Repositories;

public class MustHavsRepository
{
    private readonly IMongoCollection<MustHavs> _mustHavs;

    public MustHavsRepository(MongoDbContext context)
    {
        _mustHavs = context.MustHavs;
    }

    public async Task AddMustHavs(MustHavs musthav)
    {
        await _mustHavs.InsertOneAsync(musthav);
    }
}
