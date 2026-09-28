using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

[BsonIgnoreExtraElements]
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

    [BsonElement("createdByName")]
    public string? CreatedByName { get; set; }

    [BsonElement("createdByUserId")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? CreatedByUserId { get; set; }

    [BsonElement("recipientName")]
    public string RecipientName { get; set; } = string.Empty;

    [BsonElement("CreatedFromInviteId")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? CreatedFromInviteId { get; set; }
}
