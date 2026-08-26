using System.Net;
using System.Net.Http.Headers;

public class TvMazeService
{
    private readonly HttpClient _client;

    // private string bearerToken =
    //     Environment.GetEnvironmentVariable("B_TOKEN") ?? throw new Exception("B_Token not set");

    public TvMazeService(HttpClient client)
    {
        _client = client;
        // _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
        //     "Bearer",
        //     bearerToken
        // );
    }

    public async Task<string> SearchShow(string query)
    {
        var url = $"https://api.tvmaze.com/search/shows?q={Uri.EscapeDataString(query)}";

        var response = await _client.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    public async Task<TvMazeSlugResponse?> GetShow(int tvMazeId)
    {
        var url = $"https://api.tvmaze.com/shows/{tvMazeId}";

        var response = await _client.GetAsync(url);

        if (response.StatusCode == HttpStatusCode.NotFound)
        {
            return null;
        }

        response.EnsureSuccessStatusCode();

        return await response.Content.ReadFromJsonAsync<TvMazeSlugResponse>();
    }

    public async Task<List<Episode>> GetEpisodes(int tvMazeId)
    {
        var url = $"https://api.tvmaze.com/shows/{tvMazeId}/episodes";

        var response = await _client.GetAsync(url);

        response.EnsureSuccessStatusCode();

        var episodes = await response.Content.ReadFromJsonAsync<List<Episode>>();

        return episodes ?? [];
    }

    public async Task<Episode?> GetNextEpisode(int tvMazeId)
    {
        var episodes = await GetEpisodes(tvMazeId);

        var nextEpisode = episodes
            .Where(e => e.AirStamp.HasValue)
            .Where(e => e.AirStamp > DateTimeOffset.UtcNow)
            .OrderBy(e => e.AirStamp)
            .FirstOrDefault();

        if (nextEpisode == null)
        {
            return null;
        }

        return nextEpisode;
    }
}
