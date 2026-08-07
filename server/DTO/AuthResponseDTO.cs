// Defines what the API returns after login.
// JWT token
// Expiration time
namespace server.DTO;

public class AuthResponseDto
{
    public string Token { get; set; } = null!;
    // public DateTime? ExpiresAt { get; set; }
}
