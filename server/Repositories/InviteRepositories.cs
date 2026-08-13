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

    public async Task<Invite?> UseInviteAsync(string tokenHash)
    {
        var filter = Builders<Invite>.Filter.And(
            Builders<Invite>.Filter.Eq(x => x.TokenHash, tokenHash),
            Builders<Invite>.Filter.Eq(x => x.Used, false),
            Builders<Invite>.Filter.Gt(x => x.ExpiresAt, DateTime.UtcNow)
        );

        var update = Builders<Invite>.Update.Set(x => x.Used, true);

        return await _invites.FindOneAndUpdateAsync(
            filter,
            update,
            new FindOneAndUpdateOptions<Invite> { ReturnDocument = ReturnDocument.Before }
        );
    }
}
