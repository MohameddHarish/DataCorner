using System;
using System.Threading.Tasks;
using DataCorner.Models;
using DataCorner.Services.interfaces;
using DataCorner.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DataCorner.Controllers //Asset History controller used to  allocation and return asset purpose
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetHistoryController : ControllerBase
    {
        private readonly IAssetHistoryService _assetHistoryService;

        public AssetHistoryController(IAssetHistoryService assetHistoryService)
        {
            _assetHistoryService = assetHistoryService;
        }

        [HttpPost]
        [Route("allocate")]
        public async Task<IActionResult> AllocateAsset([FromBody] AssetHistory assetHistory)
        {
            try
            {
                await _assetHistoryService.AllocateAssetAsync(assetHistory);
                return Ok("Asset allocated successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpPost]
        [Route("return")]
        public async Task<IActionResult> ReturnAsset([FromBody] AssetHistory assetHistory)
        {
            try
            {
                await _assetHistoryService.ReturnAssetAsync(assetHistory, assetHistory.NewStatus);
                return Ok("Asset returned successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

    }
}
