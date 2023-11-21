using Microsoft.AspNetCore.Mvc;
using DataCorner.Models;
using DataCorner.Services.interfaces;
using System.Threading.Tasks;

namespace DataCorner.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssetDashboardController : ControllerBase
    {
        private readonly IAssetDashbaordService _assetDashboardService;

        public AssetDashboardController(IAssetDashbaordService assetDashboardService)
        {
            _assetDashboardService = assetDashboardService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAssetDashboardCountAsync()
        {
            try
            {
                var assetDashboard = await _assetDashboardService.GetAssetDashboardCountAsync();
                if (assetDashboard != null)
                {
                    return Ok(assetDashboard);
                }
                else
                {
                    return NotFound(); // Or return an appropriate HTTP status code
                }
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
