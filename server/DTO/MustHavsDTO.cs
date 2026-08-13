namespace server.DTO;

public class MustHavDTO
{
    public string? Id { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public List<string> ShowIds { get; set; } = [];
}
