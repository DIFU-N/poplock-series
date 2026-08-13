using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Invite
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonElement("tokenHash")]
    public string TokenHash { get; set; } = string.Empty;

    [BsonElement("used")]
    public bool Used { get; set; } = false;

    [BsonElement("expiresAt")]
    public DateTime ExpiresAt { get; set; }

    [BsonElement("createdBy")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string CreatedBy { get; set; } = string.Empty;

    [BsonElement("recipientName")]
    public string RecipientName { get; set; } = string.Empty;
}
