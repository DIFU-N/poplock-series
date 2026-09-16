using MongoDB.Driver;
using server.Data;

namespace server.Repositories;

public class InviteRepository
{
    private readonly IMongoCollection<Invite> _invites;

    public InviteRepository(MongoDbContext context)
    {
        _invites = context.Invite;
    }

    public async Task CreateAsync(Invite invite)
    {
        await _invites.InsertOneAsync(invite);
    }

    public async Task<Invite?> GetValidInviteAsync(string tokenHash)
    {
        return await _invites
            .Find(x => x.TokenHash == tokenHash && !x.Used && x.ExpiresAt > DateTime.UtcNow)
            .FirstOrDefaultAsync();
    }

    public async Task MarkInviteUsedAsync(string id)
    {
        var update = Builders<Invite>.Update.Set(x => x.Used, true);

        await _invites.UpdateOneAsync(x => x.Id == id, update);
    }
}
