using DataCorner.Services.interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DataCorner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetDetailsController : ControllerBase
    {
        private readonly IAssetDetailsService _assetDetailsService;

        public AssetDetailsController(IAssetDetailsService assetDetailsService)
        {
            _assetDetailsService = assetDetailsService;
        }

        [HttpGet("{empId}")]
        public async Task<IActionResult> GetAssetDetails([FromQuery] int empId)
        {
            try
            {
                var assetDetails = await _assetDetailsService.GetAssetDetailsAsync(empId);

                if (assetDetails != null)
                {
                    return Ok(assetDetails);
                }
                else
                {
                    return NotFound("Asset not found.");
                }
            }
            catch (Exception ex)
            {
                // Log the exception here.
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
