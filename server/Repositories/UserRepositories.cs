// Handles all user database operations.
// Get user by username
// Create user
// Keeps MongoDB logic out of controllers.
using Microsoft.AspNetCore.Http.HttpResults;
using MongoDB.Driver;
using server.Data;
using server.Models;

namespace server.Repositories;

public class UserRepository
{
    private readonly IMongoCollection<User> _users;

    public UserRepository(MongoDbContext context)
    {
        _users = context.Users;
    }

    public async Task<User?> GetByUsernameAsync(string username)
    {
        return await _users.Find(u => u.Username == username).FirstOrDefaultAsync();
    }

    public async Task CreateAsync(User user)
    {
        await _users.InsertOneAsync(user);
    }

    public async Task DeleteAccount(string username)
    {
        await _users.DeleteOneAsync(u => u.Username == username);
    }

    public async Task BanAccount(string username)
    {
        var update = Builders<User>.Update.Set(u => u.Banned, true);

        await _users.FindOneAndUpdateAsync(u => u.Username == username, update);
    }

    public async Task UnbanAccount(string username)
    {
        var update = Builders<User>.Update.Set(u => u.Banned, false);

        await _users.FindOneAndUpdateAsync(u => u.Username == username, update);
    }

    public async Task<bool> PromoteUser(string username, string role)
    {
        var result = await _users.UpdateOneAsync(
            u => u.Username == username,
            Builders<User>.Update.Set(u => u.Role, role)
        );

        return result.ModifiedCount > 0;
    }
}
