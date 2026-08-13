using System.Net.Http.Headers;

public class TvMazeService
{
    private readonly HttpClient _client;

    private string bearerToken =
        Environment.GetEnvironmentVariable("B_TOKEN") ?? throw new Exception("B_Token not set");

    public TvMazeService(HttpClient client)
    {
        _client = client;
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
            "Bearer",
            bearerToken
        );
    }

    public async Task<string> SearchShow(string query)
    {
        var url = $"https://api.tvmaze.com/search/shows?q={Uri.EscapeDataString(query)}";

        var response = await _client.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    public async Task<string> GetShow(int tvMazeId)
    {
        var url = $"https://api.tvmaze.com/shows/{tvMazeId}";

        var response = await _client.GetAsync(url);

        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }
}
