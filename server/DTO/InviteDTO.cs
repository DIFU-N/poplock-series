namespace server.DTO;

public class CreateInviteRequest
{
    public string Token { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
}

public class AdminCreateInviteRequest
{
        public string Name { get; set; } = string.Empty;
}