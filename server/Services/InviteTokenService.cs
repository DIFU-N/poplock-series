using System.Security.Cryptography;
using System.Text;

namespace server.Services;

public class InviteTokenService
{
    public string GenerateToken()
    {
        var bytes = RandomNumberGenerator.GetBytes(16);

        return Convert.ToBase64String(bytes).Replace("+", "-").Replace("/", "_").Replace("=", "");
    }

    public string HashToken(string token)
    {
        var hash = SHA256.HashData(Encoding.UTF8.GetBytes(token));

        return Convert.ToHexString(hash);
    }
}
