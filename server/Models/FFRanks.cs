using MongoDB.Bson.Serialization.Attributes;

namespace server.Models;

public class FFRanking
{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonElement("participantName")]
    public string ParticipantsName { get; set; } = string.Empty;

    [BsonElement("RankingList")]
    public List<ShowRanks> RankingList { get; set; } = new();
}

public class ShowRanks
{
    [BsonElement("showId")]
    public string ShowId { get; set; } = string.Empty;

    [BsonElement("Rank")]
    public int Rank { get; set; }
}

public class RankingResult
{
    [BsonElement("showId")]
    public string ShowId { get; set; } = string.Empty;

    [BsonElement("Points")]
    public int Points { get; set; }
}
