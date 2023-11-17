using System;
using System.Threading.Tasks;
using DataCorner.Models;
using DataCorner.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DataCorner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AllocationController : ControllerBase
    {
        private readonly IAllocationService _allocationService;

        public AllocationController(IAllocationService allocationService)
        {
            _allocationService = allocationService;
        }

        [HttpGet("{assetNo}")]
        public async Task<IActionResult> Get(string assetNo)
        {
            var allocationHistory = await _allocationService.GetAllocationHistoryAsync(assetNo);
            if (allocationHistory != null)
            {
                return Ok(allocationHistory);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] AllocationHistory allocation, [FromQuery] int operationFlag)
        {
            var result = await _allocationService.ManageAssetHistoryAsync(operationFlag, allocation.AssetNo, allocation.EmpId, allocation.allotedto, allocation.issueddate, allocation.returnedon);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] AllocationHistory allocation, [FromQuery] int operationFlag)
        {
            var result = await _allocationService.ManageAssetHistoryAsync(operationFlag, allocation.AssetNo, allocation.EmpId, allocation.allotedto, allocation.issueddate, allocation.returnedon);
            return Ok(result);
        }
    }
}
