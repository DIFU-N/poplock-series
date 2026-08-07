using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Models;

public class Show
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonElement("title")]
    public string Title { get; set; } = string.Empty;

    [BsonElement("image")]
    public string Image { get; set; } = string.Empty;

    [BsonElement("overview")]
    public string Overview { get; set; } = string.Empty;

    [BsonElement("firstAired")]
    public string FirstAired { get; set; } = "";

    [BsonElement("lastAired")]
    public string LastAired { get; set; } = "";

    [BsonElement("originalCountry")]
    public string OriginalCountry { get; set; } = "";

    [BsonElement("originalLanguage")]
    public string OriginalLanguage { get; set; } = "";

    [BsonElement("averageRuntime")]
    [BsonDefaultValue(0)]
    public int AverageRuntime { get; set; } = 0;

    [BsonElement("score")]
    [BsonDefaultValue(0)]
    public int Score { get; set; } = 0;

    [BsonElement("deleted")]
    public bool Deleted { get; set; } = false;

    [BsonElement("featured")]
    public bool Featured { get; set; } = false;
}
