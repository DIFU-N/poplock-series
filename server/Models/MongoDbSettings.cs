// Strongly-typed representation of MongoDB config from appsettings.json.
// Connection string
// Database name
// Collection name
namespace server.Models;

public class MongoDbSettings
{
    public string ConnectionString { get; set; } = null!;
    public string DatabaseName { get; set; } = null!;
}
