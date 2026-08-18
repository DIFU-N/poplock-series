using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using server.Models;

public class Episode
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;
    public int TvMazeId { get; set; }

    [BsonRepresentation(BsonType.ObjectId)]
    public string ShowId { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    public int Season { get; set; }

    public int Number { get; set; }

    public DateTime? AirDate { get; set; }

    public string? AirTime { get; set; } = null;

    public DateTime? AirStamp { get; set; }

    public int? Runtime { get; set; }

    public string? Summary { get; set; }
}
