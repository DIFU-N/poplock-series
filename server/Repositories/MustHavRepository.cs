using MongoDB.Driver;
using server.Data;
using server.DTO;
using server.Models;

namespace server.Repositories;

public class MustHavsRepository
{
    private readonly IMongoCollection<MustHavsShow> _mustHavs;

    private readonly ShowRepository _shows;
    private readonly TvMazeService _tvMaze;

    private readonly GenreRepository _genre;

    public MustHavsRepository(
        MongoDbContext context,
        TvMazeService tvMaze,
        ShowRepository shows,
        GenreRepository genre
    )
    {
        _mustHavs = context.MustHavsShow;
        _tvMaze = tvMaze;
        _shows = shows;
        _genre = genre;
    }

    public async Task AddMustHavs(MustHavsShow musthav)
    {
        await _mustHavs.InsertOneAsync(musthav);
    }

    public async Task<List<GetMustHavsResponse>> GetAllMustHavs()
    {
        List<MustHavsShow> mustHavs = await _mustHavs.Find(_ => true).ToListAsync();

        var mustHavResponse = new List<GetMustHavsResponse>();
        foreach (var i in mustHavs)
        {
            var shows = await _shows.GetByIdsAsync(i.ShowIds);

            var fullShowList = shows
                .Select(show => new SomeOfShow
                {
                    Id = show.Id,
                    Title = show.Title,
                    TvMazeId = show.TvMazeId,
                })
                .ToList();

            var singleMustHav = new GetMustHavsResponse
            {
                Description = i.Description,
                Id = i.Id,
                Name = i.Name,
                Shows = fullShowList,
            };

            mustHavResponse.Add(singleMustHav);
        }

        return mustHavResponse;
    }
}
