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
        [HttpGet]
        [Route("getassethistory")]
        public async Task<IActionResult> GetAssetHistory([FromQuery] string assetNo)
        {
            try
            {
                var assetHistory = await _assetHistoryService.GetAssetHistoryAsync(assetNo, 1); // Assuming 1 is the flag for "getassethistory"
                return Ok(assetHistory);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("getreturnassethistory")]
        public async Task<IActionResult> GetReturnAssetHistory([FromQuery] string assetNo)
        {
            try
            {
                var returnAssetHistory = await _assetHistoryService.GetAssetHistoryAsync(assetNo, 2); // Assuming 2 is the flag for "getreturnassethistory"
                return Ok(returnAssetHistory);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

    }
}
