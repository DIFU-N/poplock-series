using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DTO;
using server.Models;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("api/groups")]
public class GroupController : ControllerBase
{
    private readonly GroupRepository _groups;

    public GroupController(GroupRepository groups)
    {
        _groups = groups;
    }

    [HttpGet]
    public async Task<IActionResult> GetGroups()
    {
        var groups = await _groups.GetAllAsync();
        return Ok(groups);
    }
}
