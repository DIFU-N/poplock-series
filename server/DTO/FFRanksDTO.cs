using server.Models;

namespace server.DTO;

public class FFPointsDTO
{
    public string ShowId { get; set; } = string.Empty;

    public string ShowName { get; set; } = string.Empty;

    public string ShowImage { get; set; } = string.Empty;

    public int Points { get; set; }
}

public class AdminRankingRequest
{
    public string? Name { get; set; }
    public List<int> TvMazeIds { get; set; } = new();
}

public class FFRankDTO
{
    public string ShowId { get; set; } = string.Empty;

    public string ShowName { get; set; } = string.Empty;

    public string ShowImage { get; set; } = string.Empty;

    public int Rank { get; set; }
}

public class CreateRankingDTO
{
    public string Token { get; set; } = string.Empty;
    // public required FFRanking Submission { get; set; }
     public List<int> TvMazeIds { get; set; } = new();
}