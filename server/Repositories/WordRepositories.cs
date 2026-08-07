using System.Runtime.CompilerServices;
using MongoDB.Driver;
using server.Data;
using server.Models;

namespace server.Repositories;

public class WordRepository
{
    private readonly IMongoCollection<Word> _words;

    public WordRepository(MongoDbContext context)
    {
        _words = context.Words;
    }

    public async Task<Word?> GetByTitleAsync(string title)
    {
        return await _words.Find(u => u.Title == title).FirstOrDefaultAsync();
    }

    public async Task<Word> GetByIdAsync(string id)
    {
        return await _words.Find(u => u.Id == id).FirstOrDefaultAsync();
    }

    public async Task<Word?> DeleteAsync(string id)
    {
        var filter = Builders<Word>.Filter.Eq(w => w.Id, id);

        var update = Builders<Word>.Update.Set(w => w.Deleted, true);

        return await _words.FindOneAndUpdateAsync(
            filter,
            update,
            new FindOneAndUpdateOptions<Word> { ReturnDocument = ReturnDocument.After }
        );
    }

    public async Task CreateAsync(Word word)
    {
        await _words.InsertOneAsync(word);
    }

    public async Task<List<Word>> GetAllPosts()
    {
        return await _words.Find(u => u.Deleted == false).ToListAsync();
    }

    public async Task<Word> UpdateAsync(Word word)
    {
        var filter = Builders<Word>.Filter.Eq(w => w.Id, word.Id);

        // var update = Builders<Word>.Update.Set(w => w, word);

        return await _words.FindOneAndReplaceAsync(
            filter,
            word,
            new FindOneAndReplaceOptions<Word> { ReturnDocument = ReturnDocument.After }
        );
    }
}
