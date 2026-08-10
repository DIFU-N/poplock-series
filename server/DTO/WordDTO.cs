namespace server.DTO;

public class PostDto
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;

    // Tiptap JSON comes in here
    public object Body { get; set; } = default!;
    public DateTime Date { get; set; }
    public string Subtitle { get; set; } = string.Empty;
    public string? HeaderImage { get; set; } = string.Empty;

    public string AuthorId {get; set;} = string.Empty;
}

// response dto
public class CommentDto
{
    public string? Id { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string PostId {get; set;} = string.Empty;
    public string AuthorId {get; set;} = string.Empty;
}

// requestdto
public class CreateCommentDto
{
    public string Body {get; set;} = string.Empty;
}