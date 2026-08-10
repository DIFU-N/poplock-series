using System.Runtime.CompilerServices;
using MongoDB.Driver;
using server.Data;
using server.Models;

namespace server.Repositories;

public class PostRepository
{
    private readonly IMongoCollection<Post> _posts;

    public PostRepository(MongoDbContext context)
    {
        _posts = context.Posts;
    }

    public async Task<Post?> GetByTitleAsync(string title)
    {
        return await _posts.Find(u => u.Title == title).FirstOrDefaultAsync();
    }

    public async Task<Post> GetByIdAsync(string id)
    {
        return await _posts.Find(u => u.Id == id).FirstOrDefaultAsync();
    }

    public async Task<Post?> DeleteAsync(string id)
    {
        var filter = Builders<Post>.Filter.Eq(w => w.Id, id);

        var update = Builders<Post>.Update.Set(w => w.Deleted, true);

        return await _posts.FindOneAndUpdateAsync(
            filter,
            update,
            new FindOneAndUpdateOptions<Post> { ReturnDocument = ReturnDocument.After }
        );
    }

    public async Task CreateAsync(Post Post)
    {
        await _posts.InsertOneAsync(Post);
    }

    public async Task<List<Post>> GetAllPosts()
    {
        return await _posts.Find(u => u.Deleted == false).ToListAsync();
    }

    public async Task<Post> UpdateAsync(Post Post)
    {
        var filter = Builders<Post>.Filter.Eq(w => w.Id, Post.Id);

        // var update = Builders<Post>.Update.Set(w => w, Post);

        return await _posts.FindOneAndReplaceAsync(
            filter,
            Post,
            new FindOneAndReplaceOptions<Post> { ReturnDocument = ReturnDocument.After }
        );
    }

    public async Task<List<Post>> GetPostsByAuthor(string postId)
    {
        return await _posts.Find(p => p.AuthorId == postId && !p.Deleted).ToListAsync();
    }
}

public class CommentRepository
{
    private readonly IMongoCollection<Comment> _comments;

    public CommentRepository(MongoDbContext context)
    {
        _comments = context.Comment;
    }
    public async Task<Comment> GetByIdAsync(string id)
    {
        return await _comments.Find(u => u.Id == id).FirstOrDefaultAsync();
    }

    public async Task<Comment?> DeleteAsync(string id)
    {
        var filter = Builders<Comment>.Filter.Eq(w => w.Id, id);

        var update = Builders<Comment>.Update.Set(w => w.Deleted, true);

        return await _comments.FindOneAndUpdateAsync(
            filter,
            update,
            new FindOneAndUpdateOptions<Comment> { ReturnDocument = ReturnDocument.After }
        );
    }

    public async Task CreateComment(Comment Comment)
    {
        await _comments.InsertOneAsync(Comment);
    }

    public async Task<List<Comment>> GetAllPostRelatedComments(string postId)
    {
        return await _comments.Find(c => c.PostId == postId && !c.Deleted).ToListAsync();
    }
}


public class PostLikeRepository
{
    private readonly IMongoCollection<PostLike> _likes;
    private readonly IMongoCollection<Post> _posts;

    public PostLikeRepository(MongoDbContext context)
    {
        _likes = context.PostLikes;
        _posts = context.Posts;
    }

    public async Task<bool> LikePost(string postId, string authorId)
    {
        var existingLike = await _likes.FindAsync(p => p.UserId == authorId && p.PostId == postId);

        if (existingLike != null)
        {
            var update = Builders<Post>.Update.Inc(p => p.Likes, -1);
            await _likes.DeleteOneAsync(p => p.UserId == authorId && p.PostId == postId);
            await _posts.UpdateOneAsync(
                p => p.Id == postId,
                update
            );

            return false;
        }

        var like = new PostLike
        {
            PostId = postId,
            UserId = authorId
        };

        await _likes.InsertOneAsync(like);

        await _posts.UpdateOneAsync(
            p => p.Id == postId,
            Builders<Post>.Update.Inc(p => p.Likes, 1)
        );

        return true;
    }
}