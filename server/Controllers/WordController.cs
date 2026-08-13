using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using server.DTO;
using server.Models;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("api/words")]
[Authorize]
public class WordControllers : ControllerBase
{
    private readonly PostRepository _posts;
    private readonly CommentRepository _comments;
    private readonly PostLikeRepository _likes;


    public WordControllers(
        PostRepository posts,
        CommentRepository comments,
        PostLikeRepository likes
    )
    {
        _posts = posts;
        _comments = comments;
        _likes = likes;
    }

    [HttpPost("post/create")]
    public async Task<IActionResult> CreatePost(PostDto dto)
    { // Convert object -> JSON -> BsonDocument
        var json = JsonSerializer.Serialize(dto.Body);
        var bsonBody = BsonDocument.Parse(json);

        var post = new Post
        {
            Title = dto.Title,
            Body = bsonBody,
            Date = dto.Date,
            Subtitle = dto.Subtitle,
        };

        await _posts.CreateAsync(post);
        return Ok(new { message = "Post created successfully" });
    }

    [HttpGet("post/readall")]
    [AllowAnonymous]
    public async Task<IActionResult> ReadWord()
    {
        var words = await _posts.GetAllPosts();

        var result = words
            .Select(word => new PostDto
            {
                Id = word.Id,
                Title = word.Title,
                Body = BsonTypeMapper.MapToDotNetValue(word.Body),
                Date = word.Date,
                Subtitle = word.Subtitle,
            })
            .ToList();

        return Ok(result);
    }

    [HttpPut("post/update")]
    public async Task<IActionResult> UpdateWord(PostDto dto)
    {
        // Convert object -> JSON -> BsonDocument
        var json = JsonSerializer.Serialize(dto.Body);
        var bsonBody = BsonDocument.Parse(json);

        var word = new Post
        {
            Id = dto.Id,
            Title = dto.Title,
            Body = bsonBody,
            Date = DateTime.UtcNow,
            Subtitle = dto.Subtitle,
        };

        await _posts.UpdateAsync(word);
        return Ok(new { message = "Word created successfully" });
    }

    [HttpGet("post/{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(string id)
    {
        var singlePost = await _posts.GetByIdAsync(id);

        if (singlePost == null)
            return NotFound();

        var result = new PostDto
        {
            Id = singlePost.Id,
            Title = singlePost.Title,
            Body = BsonTypeMapper.MapToDotNetValue(singlePost.Body),
            Date = singlePost.Date,
            Subtitle = singlePost.Subtitle,
        };

        return Ok(result);
    }

    // comments
    [HttpPost("{postId}/comments")]
    public async Task<IActionResult> CreateComment(string postId, CreateCommentDto dto)
    {
        var authorId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (authorId == null)
        {
            return Unauthorized();
        }

        var comment = new Comment
        {
            Body = dto.Body,
            Date = DateTime.Now,
            PostId = postId,
            Deleted = false,
            Likes = 0,
            AuthorId = authorId,
        };

        await _comments.CreateComment(comment);
        return Ok(new { message = "Post created successfully" });
    }

    [HttpGet("{postId}/comments")]
    [AllowAnonymous]
    public async Task<IActionResult> ReadComments(string postId)
    {
        var comments = await _comments.GetAllPostRelatedComments(postId);

        var result = comments
            .Select(comment => new CommentDto
            {
                Id = comment.Id,
                AuthorId = comment.AuthorId,
                Body = comment.Body,
                Date = comment.Date,
                PostId = comment.PostId,
            })
            .ToList();

        return Ok(result);
    }

    [HttpDelete("{postId}/{commentId}/delete")]
    public async Task<IActionResult> DeleteComment(string postId, string commentId)
    {
        string? authorId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        
        if (authorId == null)
        {
            return Unauthorized();
        }

        var comment = await _comments.GetByIdAsync(commentId);
        if (comment == null)
        {
            return NotFound("Comment not found!");
        }

        if (comment.AuthorId != authorId)
        {
            return Forbid();
        }

        await _comments.DeleteAsync(commentId);
        return Ok(new { message = "Comment deleted successfully" });
    }

    [HttpPut("{postId}/like")]
    public async Task<bool> LikePost(string postId)
    {
        string? authorId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (authorId == null)
        {
            return false;
        }

        await _likes.LikePost(postId, authorId);
        return true;
    }

}
