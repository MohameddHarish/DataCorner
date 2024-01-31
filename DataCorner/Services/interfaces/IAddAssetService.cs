using DataCorner.Models;

namespace DataCorner.Services.interfaces
{
    public interface IAddAssetService
    {
        Task<bool> InsertOrUpdateAssetAsync(AddAssets assetDetails);

        Task<bool> DeleteAssetAsync(string assetNo);
    }
}
