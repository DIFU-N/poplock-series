// Defines the data required to register a user.
// Username
// Password
// Prevents exposing internal models.
using System.ComponentModel.DataAnnotations;

namespace server.DTO;

public class RegisterDto
{
    [Required]
    [StringLength(30, MinimumLength = 8)]
    public string Username { get; set; } = null!;

    [Required]
    [StringLength(64, MinimumLength = 8)]
    public string Password { get; set; } = null!;
    // public string Role { get; set; } = null!;
    // public bool Banned {get; set; } = false;
}
