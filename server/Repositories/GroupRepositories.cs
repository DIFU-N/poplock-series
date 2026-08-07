using MongoDB.Driver;
using server.Data;
using server.Models;

namespace server.Repositories;

public class GroupRepository
{
    private readonly IMongoCollection<Group> _groups;

    public GroupRepository(MongoDbContext context)
    {
        _groups = context.Groups;
    }

    public async Task<Group?> GetByNameAsync(string name)
    {
        return await _groups.Find(g => g.Name == name).FirstOrDefaultAsync();
    }

    public async Task<Group?> GetByIdAsync(string id)
    {
        return await _groups.Find(g => g.Id == id).FirstOrDefaultAsync();
    }

    public async Task<List<Group>> GetAllAsync()
    {
        return await _groups.Find(_ => true).ToListAsync();
    }

    public async Task CreateAsync(Group group)
    {
        await _groups.InsertOneAsync(group);
    }

    public async Task<List<Group>> GetManyByIdsAsync(List<string> ids)
    {
        var filter = Builders<Group>.Filter.In(g => g.Id, ids);
        return await _groups.Find(filter).ToListAsync();
    }
}
