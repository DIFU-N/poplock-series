using server.Models;

namespace server.DTO;

public class RatingDTO
{
    public string? Id { get; set; } = string.Empty;

    public string? UserId { get; set; } = string.Empty;

    public string? ShowId { get; set; } = string.Empty;

    public int Score { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}

public class RateShowRequest
{
    public string ShowId { get; set; } = string.Empty;

    public int Score { get; set; }
}

public class UpdateRateShowRequest
{
    public string Id { get; set; } = string.Empty;

    public int Score { get; set; }
}

public class ShowIdRatingRequest
{
    public string ShowId { get; set; } = string.Empty;
}

public class RatingWithShow
{
    public string Id { get; set; } = string.Empty;
    public int Score { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public Show Show { get; set; } = null!;
}
