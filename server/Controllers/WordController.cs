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
    private readonly WordRepository _words;
    private readonly GroupRepository _groups;

    public WordControllers(WordRepository words, GroupRepository groups)
    {
        _words = words;
        _groups = groups;
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateWord(WordDto dto)
    {
        var groupName = dto.Group.Trim(); // remove extra spaces

        var group = await _groups.GetByNameAsync(groupName); // look up group
        if (group == null) // create if it doesn't exist
        {
            group = new Group { Name = groupName };
            await _groups.CreateAsync(group);
        }

        // Convert object -> JSON -> BsonDocument
        var json = JsonSerializer.Serialize(dto.Body);
        var bsonBody = BsonDocument.Parse(json);

        var word = new Word
        {
            Title = dto.Title,
            Body = bsonBody,
            Date = dto.Date,
            Subtitle = dto.Subtitle,
            GroupId = group.Id,
        };

        await _words.CreateAsync(word);
        return Ok(new { message = "Word created successfully" });
    }

    [HttpGet("readall")]
    [AllowAnonymous]
    public async Task<IActionResult> ReadWord()
    {
        var words = await _words.GetAllPosts();

        // get all unique group IDs
        var groupIds = words.Select(w => w.GroupId).Distinct().ToList();
        // fetch all groups at once
        var groups = await _groups.GetManyByIdsAsync(groupIds);

        // map to dictionary
        var groupDict = groups.ToDictionary(g => g.Id, g => g.Name);

        var result = words
            .Select(word => new WordDto
            {
                Id = word.Id,
                Title = word.Title,
                Body = BsonTypeMapper.MapToDotNetValue(word.Body),
                Date = word.Date,
                Subtitle = word.Subtitle,
                Group = groupDict.ContainsKey(word.GroupId) ? groupDict[word.GroupId] : "",
            })
            .ToList();

        return Ok(result);
    }

    [HttpPost("update")]
    public async Task<IActionResult> UpdateWord(WordDto dto)
    {
        var groupName = dto.Group.Trim(); // remove extra spaces

        var group = await _groups.GetByNameAsync(groupName); // look up group
        if (group == null) // create if it doesn't exist
        {
            group = new Group { Name = groupName };
            await _groups.CreateAsync(group);
        }

        // Convert object -> JSON -> BsonDocument
        var json = JsonSerializer.Serialize(dto.Body);
        var bsonBody = BsonDocument.Parse(json);

        var word = new Word
        {
            Id = dto.Id,
            Title = dto.Title,
            Body = bsonBody,
            Date = DateTime.UtcNow,
            Subtitle = dto.Subtitle,
            GroupId = group.Id,
        };

        await _words.UpdateAsync(word);
        return Ok(new { message = "Word created successfully" });
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(string id)
    {
        var thought = await _words.GetByIdAsync(id);

        if (thought == null)
            return NotFound();

        // var debugObj = new
        // {
        //     thought.Id,
        //     thought.Title,
        //     thought.Subtitle,
        //     thought.Date,
        //     Body = thought.Body.ToJson(),
        //     thought.GroupId,
        //     thought.Deleted,
        // };

        // Console.WriteLine(
        //     System.Text.Json.JsonSerializer.Serialize(
        //         debugObj,
        //         new JsonSerializerOptions { WriteIndented = true }
        //     )
        // );

        var group = await _groups.GetByIdAsync(thought.GroupId);

        var result = new WordDto
        {
            Id = thought.Id,
            Title = thought.Title,
            Body = BsonTypeMapper.MapToDotNetValue(thought.Body),
            Date = thought.Date,
            Subtitle = thought.Subtitle,
            Group = group?.Name ?? "",
        };

        return Ok(result);
    }
}
