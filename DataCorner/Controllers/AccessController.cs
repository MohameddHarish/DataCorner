using DataCorner.Models;
using DataCorner.Services.interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DataCorner.Controllers
{

    [Route("api/access")]
    [ApiController]
    public class AccessController : ControllerBase
    {
        private readonly IAccessService _accessService;

        public AccessController(IAccessService accessService)
        {
            _accessService = accessService;
        }

        [HttpPut("update/{roleId}")]
        public async Task<IActionResult> UpdateAccessMaster(int roleId, [FromBody] AccessModel accessModel)
        {
            bool result = await _accessService.UpdateAccessMasterAsync(roleId, accessModel);

            if (result)
            {
                return Ok("AccessMaster updated successfully");
            }

            return BadRequest("AccessMaster update failed");
        }
    }
}
