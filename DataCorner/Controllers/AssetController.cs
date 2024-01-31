using DataCorner.Models;
using DataCorner.Services;
using DataCorner.Services.interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

[Route("api/assets")]
[ApiController]
public class AssetController : ControllerBase
{
    private readonly IAddAssetService _assetService;

    public AssetController(IAddAssetService assetService)
    {
        _assetService = assetService;
    }

    [HttpPost]
    public async Task<IActionResult> InsertOrUpdateAsset([FromBody] AddAssets assetDetails)
    {
        if (assetDetails == null)
        {
            return BadRequest("Invalid asset details.");
        }

        try
        {
            var result = await _assetService.InsertOrUpdateAssetAsync(assetDetails);

            if (result)
            {
                return Ok("Asset details inserted or updated successfully.");
            }
            else
            {
                return BadRequest("Failed to insert or update asset details.");
            }
        }
        catch (Exception ex)
        {
            // Log the exception here.
            return StatusCode(500, "Internal server error");
        }
    }
    [HttpDelete("{assetNo}")]
    public async Task<IActionResult> DeleteAsset(string assetNo)
    {
        try
        {
            var result = await _assetService.DeleteAssetAsync(assetNo);

            if (result)
            {
                return Ok($"Asset with AssetNo {assetNo} deleted successfully.");
            }
            else
            {
                return BadRequest($"Failed to delete asset with AssetNo {assetNo}.");
            }
        }
        catch (Exception ex)
        {
            // Log the exception here.
            return StatusCode(500, "Internal server error");
        }
    }

}
