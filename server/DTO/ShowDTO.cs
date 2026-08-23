using server.Models;

namespace server.DTO;

public class ShowDto
{
    public string? Id { get; set; } = string.Empty;

    public int TvMazeId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;

    public List<Genre> Genres { get; set; } = [];
    public string Summary { get; set; } = string.Empty;
    public DateTime? Premiered { get; set; }
    public DateTime? Ended { get; set; }
    public string? OriginalCountry { get; set; }
    public string? OriginalLanguage { get; set; }
    public int AverageRuntime { get; set; }
    public int Runtime { get; set; }

    public string Language { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;

    public string OfficialSite { get; set; } = string.Empty;

    public double? Rating { get; set; }
    public Network? Network { get; set; }

    public bool ScheduleFeatured { get; set; } = false;
}

public class ImportShowRequest
{
    public int TvMazeId { get; set; }
}
