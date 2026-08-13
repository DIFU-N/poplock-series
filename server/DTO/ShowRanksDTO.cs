namespace server.DTO;

public class ShowRankingDTO
{
    public string Id { get; set; } = string.Empty;

    public string UserId { get; set; } = string.Empty;

    public string ShowId { get; set; } = string.Empty;

    public int Rank { get; set; }
}
