using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Models;

public class Show
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonElement("tvMazeId")]
    public int TvMazeId { get; set; }

    [BsonElement("title")]
    public string Title { get; set; } = string.Empty;

    [BsonElement("language")]
    public string Language { get; set; } = string.Empty;

    [BsonElement("status")]
    public string Status { get; set; } = string.Empty;

    [BsonElement("runtime")]
    public int? Runtime { get; set; }

    [BsonElement("averageRuntime")]
    public int? AverageRuntime { get; set; }

    [BsonElement("premiered")]
    public DateTime? Premiered { get; set; }

    [BsonElement("ended")]
    public DateTime? Ended { get; set; }

    [BsonElement("officialSite")]
    public string OfficialSite { get; set; } = string.Empty;

    [BsonElement("rating")]
    public double? Rating { get; set; }

    [BsonElement("genreIds")]
    // [BsonDefaultValue(0)]
    public List<string> GenreIds { get; set; } = [];

    [BsonElement("image")]
    public string? Image { get; set; } = string.Empty;

    [BsonElement("summary")]
    public string Summary { get; set; } = string.Empty;

    [BsonElement("network")]
    public Network? Network { get; set; }
}

public class Network
{
    [BsonElement("id")]
    public int Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("officialSite")]
    public string OfficialSite { get; set; } = string.Empty;

    // [BsonElement("country")]
    // public Country? Country { get; set; }
}

public class Country
{
    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("code")]
    public string Code { get; set; } = string.Empty;

    [BsonElement("timezone")]
    public string TimeZone { get; set; } = string.Empty;
}
