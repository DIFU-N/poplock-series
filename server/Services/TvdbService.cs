using System.Net.Http.Headers;

public class TvdbService
{
    private readonly HttpClient _client;

    private string bearerToken =
        Environment.GetEnvironmentVariable("B_TOKEN") ?? throw new Exception("B_Token not set");

    public TvdbService(HttpClient client)
    {
        _client = client;
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
            "Bearer",
            bearerToken
        );
    }

    public async Task<string> SearchShow(string query)
    {
        var url = $"https://api4.thetvdb.com/v4/series/slug/{Uri.EscapeDataString(query)}";

        var response = await _client.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    public async Task<string> SearchShowsByName(string query)
    {
        var url = $"https://api4.thetvdb.com/v4/search?query={Uri.EscapeDataString(query)}";

        var response = await _client.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }
}
