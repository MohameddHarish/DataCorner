using DataCorner.Services.interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DataCorner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet("GetDashboardCount/{flag}")]
        public async Task<IActionResult> GetDashboardCount(int flag)
        {
            var dashboardCounts = await _dashboardService.GetDashboardCountAsync(flag);
            if (dashboardCounts == null)
            {
                return NotFound();
            }

            return Ok(dashboardCounts);
        }
    }
}
