// Represents a user document in MongoDB.
// Maps to a Mongo collection
// Stores username, hashed password, role
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;

    [BsonElement("username")]
    public string Username { get; set; } = null!;

    [BsonElement("passwordHash")]
    public string PasswordHash { get; set; } = null!;

    [BsonElement("role")]
    [BsonRepresentation(BsonType.String)]
    public string Role { get; set; } = UserRoles.User;

    [BsonElement("banned")]
    public bool Banned { get; set; } = false;
}

public static class UserRoles
{
    public const string User = "user";
    public const string Admin = "admin";
    public const string SuperAdmin = "s.admin";
}