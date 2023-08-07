using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DataCorner.Models;
using DataCorner.Services.Interfaces;

namespace DataCorner.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DivisionController : ControllerBase
    {
        private readonly IDivisionService _divisionService;

        public DivisionController(IDivisionService divisionService)
        {
            _divisionService = divisionService;
        }

        [HttpGet("GetDivisionDetails")]
        public async Task<IActionResult> GetDivisionDetails(int flag = 1)
        {
            var divisionDetails = await _divisionService.GetDivisionDetails(flag);
            return Ok(divisionDetails);
        }
    }
}
