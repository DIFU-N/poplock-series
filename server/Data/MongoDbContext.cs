// Creates and manages the MongoDB connection.
// Exposes collections (e.g. Users)
using MongoDB.Driver;
using server.Models;

namespace server.Data;

public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(IConfiguration config)
    {
        var uri =
            Environment.GetEnvironmentVariable("MONGODB_URI")
            ?? throw new Exception("MONGODB_URI not set");

        // var mongoUrl = new MongoUrl(uri);
        // var client = new MongoClient(mongoUrl);

        // var client = new MongoClient(uri);
        var settings = MongoClientSettings.FromConnectionString(uri);

        settings.MinConnectionPoolSize = 10;
        settings.MaxConnectionPoolSize = 100;
        settings.MaxConnectionIdleTime = TimeSpan.FromMinutes(30);
        settings.ConnectTimeout = TimeSpan.FromSeconds(5);
        settings.ServerSelectionTimeout = TimeSpan.FromSeconds(5);

        var client = new MongoClient(settings);
        _database = client.GetDatabase("poplock");
        // _database = client.GetDatabase(mongoUrl.DatabaseName);
        Console.WriteLine($"DB: {_database.DatabaseNamespace.DatabaseName}");
    }

    public IMongoCollection<User> Users => _database.GetCollection<User>("users");

    public IMongoCollection<Post> Posts => _database.GetCollection<Post>("posts");
    public IMongoCollection<PostLike> PostLikes => _database.GetCollection<PostLike>("postlikes");

    public IMongoCollection<Comment> Comment => _database.GetCollection<Comment>("comments");

    public IMongoCollection<Show> Shows => _database.GetCollection<Show>("shows");

    public IMongoCollection<MustHavs> MustHavs => _database.GetCollection<MustHavs>("musthavs");

    public IMongoCollection<ShowRanking> ShowRankings =>
        _database.GetCollection<ShowRanking>("showrankings");

    public IMongoCollection<Genre> Genre => _database.GetCollection<Genre>("genre");

    public IMongoCollection<Invite> Invite => _database.GetCollection<Invite>("invites");

    public IMongoCollection<Episode> Episode => _database.GetCollection<Episode>("episodes");

    public IMongoCollection<Rating> Rating => _database.GetCollection<Rating>("ratings");

    // Console.WriteLine($"Collection: users");
}
