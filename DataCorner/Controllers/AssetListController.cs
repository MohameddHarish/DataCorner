using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using DataCorner.Models.Dto;
using DataCorner.Services.Interfaces;
using DataCorner.Services.Interfaces;

namespace DataCorner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetListController : ControllerBase
    {
        private readonly IAssetListService _assetListService;

        public AssetListController(IAssetListService assetListService)
        {
            _assetListService = assetListService;
        }

        [HttpGet("{AssetType}")]
        public async Task<IActionResult> GetAssetListDetails(string AssetType)
        {
            try
            {
                var AssetList = await _assetListService.GetAssetListDetailsAsync(AssetType);
                return Ok(AssetList);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
