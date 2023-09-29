using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DataCorner.Models;
using DataCorner.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DataCorner.Controllers
{
    [Route("api/assets")]
    [ApiController]
    public class AssetDetailsController : ControllerBase
    {
        private readonly IAssetDetailsService _assetDetailsService;

        public AssetDetailsController(IAssetDetailsService assetDetailsService)
        {
            _assetDetailsService = assetDetailsService;
        }

        [HttpGet]
        [Route("getAssetDetails")]
        public async Task<IActionResult> GetAssetDetails([FromQuery] int empId, [FromQuery] int flag = 1)
        {
            try
            {
                var assetDetails = await _assetDetailsService.GetAssetDetailsAsync(empId, flag);

                if (assetDetails != null)
                {
                    return Ok(assetDetails);
                }
                else
                {
                    return NotFound("No assets found.");
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
