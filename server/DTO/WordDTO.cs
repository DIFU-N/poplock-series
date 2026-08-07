namespace server.DTO;

public class WordDto
{
    public string? Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;

    // Tiptap JSON comes in here
    public object Body { get; set; } = default!;
    public DateTime Date { get; set; }
    public string Subtitle { get; set; } = string.Empty;
    public string Group { get; set; } = string.Empty;
}
