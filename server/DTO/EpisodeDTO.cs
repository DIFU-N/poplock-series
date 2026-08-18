namespace server.DTO;

public class EpisodeDTO
{
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
