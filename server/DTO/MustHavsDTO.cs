using server.Models;

namespace server.DTO;

public class MustHavDTO
{
    public string? Id { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public List<int> TvMazeIds { get; set; } = [];
}

public class GetMustHavsResponse
{
    public string? Id { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public List<SomeOfShow> Shows { get; set; } = [];
}

// public class MustHavsShow
// {
//     public string? Id { get; set; } = string.Empty;

//     public string Name { get; set; } = string.Empty;

//     public string Description { get; set; } = string.Empty;

//     public List<string> ShowIds { get; set; } = [];
// }
