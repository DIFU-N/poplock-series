// Defines the data required to register a user.
// Username
// Password
// Prevents exposing internal models.
namespace server.DTO;

public class RegisterDto
{
    public string Username { get; set; } = null!;
    public string Password { get; set; } = null!;
    // public string Role { get; set; } = null!;
    // public bool Banned {get; set; } = false;
}
