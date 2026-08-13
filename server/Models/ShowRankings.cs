using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Models;

public class ShowRanking
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonElement("userId")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? UserId { get; set; } = string.Empty;

    [BsonElement("showId")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string ShowId { get; set; } = string.Empty;

    [BsonElement("rank")]
    public int Rank { get; set; }

    [BsonElement("participantsName")]
    public string? ParticipantsName { get; set; } = string.Empty;
}

public class ShowRankingResult
{
    public string ShowId { get; set; } = string.Empty;
    public int Points { get; set; }
}
