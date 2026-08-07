public class TvdbSlugResponse
{
    public TvdbSlugItem Data { get; set; } = new();
}

public class TvdbSlugItem
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Image { get; set; }
    public string? Overview { get; set; }
    public string? FirstAired { get; set; }
    public string? LastAired { get; set; }
    public string? OriginalCountry { get; set; }
    public string? OriginalLanguage { get; set; }
    public int? AverageRuntime { get; set; }
    public int? Score { get; set; }
}
