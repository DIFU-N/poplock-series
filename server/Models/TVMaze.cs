using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using server.Models;

// public class TvMazeSlugResponse
// {
//     public TvMazeSlugItem Data { get; set; } = new();
// }

public class TvMazeSlugResponse
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public int Id { get; set; }

    [BsonElement("tvMazeId")]
    public int TvMazeId { get; set; }

    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

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
    public TvMazeRating? Rating { get; set; }

    [BsonElement("genres")]
    public List<string> Genres { get; set; } = [];

    [BsonElement("image")]
    public TvMazeImage? Image { get; set; }

    [BsonElement("summary")]
    public string Summary { get; set; } = string.Empty;

    [BsonElement("network")]
    public Network? Network { get; set; }
}

public class TvMazeRating
{
    [BsonElement("average")]
    public double? Average { get; set; }
}

public class TvMazeImage
{
    [BsonElement("medium")]
    public string Medium { get; set; } = string.Empty;

    [BsonElement("original")]
    public string Original { get; set; } = string.Empty;
}

public class TvMazeNetwork
{
    [BsonElement("id")]
    public int Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("officialSite")]
    public string OfficialSite { get; set; } = string.Empty;

    [BsonElement("country")]
    public Country? Country { get; set; }
}
