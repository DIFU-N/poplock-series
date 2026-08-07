namespace server.DTO;

public class ShowDto
{
    public string? Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public string Overview { get; set; } = string.Empty;
    public string? FirstAired { get; set; }
    public string? LastAired { get; set; }
    public string? OriginalCountry { get; set; }
    public string? OriginalLanguage { get; set; }
    public int AverageRuntime { get; set; }
    public int Score { get; set; }
}
