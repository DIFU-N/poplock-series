using server.Models;
using server.Repositories;

public class ShowService
{
    private readonly ShowRepository _showRepo;
    private readonly GenreRepository _genreRepo;
    private readonly TvMazeService _tvmaze;

    public ShowService(ShowRepository showRepo, GenreRepository genreRepo, TvMazeService tvmaze)
    {
        _showRepo = showRepo;
        _genreRepo = genreRepo;
        _tvmaze = tvmaze;
    }

    public async Task<List<string>> ResolveTvMazeIds(List<int> tvMazeIds)
    {
        if (tvMazeIds == null || tvMazeIds.Count == 0)
            return new List<string>();

        var result = new List<string>();

        foreach (var tvMazeId in tvMazeIds)
        {
            var show = await EnsureShowExists(tvMazeId);

            if (show != null)
            {
                result.Add(show.Id);
            }
        }

        return result;
    }

    private async Task<Show?> EnsureShowExists(int tvMazeId)
    {
        // 1. Check if already exists
        var existing = await _showRepo.GetByTvMazeIdAsync(tvMazeId);
        if (existing != null)
            return existing;

        // 2. Fetch from external API
        var item = await _tvmaze.GetShow(tvMazeId);
        if (item == null)
            return null;

        // 3. Resolve genres
        var genreIds = new List<string>();

        foreach (var genreName in item.Genres)
        {
            var genre = await _genreRepo.GetByNameAsync(genreName);

            if (genre == null)
            {
                genre = new Genre { Name = genreName };
                await _genreRepo.CreateAsync(genre);
            }

            genreIds.Add(genre.Id);
        }

        // 4. Create new show
        var show = new Show
        {
            Title = item.Name,
            Image = item.Image?.Original ?? "",
            AverageRuntime = item.AverageRuntime ?? 0,
            Ended = item.Ended,
            GenreIds = genreIds,
            Language = item.Language,
            Network = item.Network,
            OfficialSite = item.OfficialSite,
            Premiered = item.Premiered,
            Rating = item.Rating?.Average,
            Runtime = item.Runtime,
            Status = item.Status,
            Summary = item.Summary,
            TvMazeId = item.Id,
        };

        try
        {
            await _showRepo.AddAsync(show);
            return show;
        }
        catch
        {
            return await _showRepo.GetByTvMazeIdAsync(tvMazeId);
        }
    }
}
