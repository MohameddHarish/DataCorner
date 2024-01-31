using DataCorner.DataAccess.interfaces;
using DataCorner.Models;
using DataCorner.Services.interfaces;

namespace DataCorner.Services
{
    public class AssetService : IAddAssetService
    {
        private readonly IAddAssestDataAccess _assetDataAccess;

        public AssetService(IAddAssestDataAccess assetDataAccess)
        {
            _assetDataAccess = assetDataAccess;
        }

        public async Task<bool> InsertOrUpdateAssetAsync(AddAssets assetDetails)
        {
            try
            {
                // You can add additional business logic here if needed.

                return await _assetDataAccess.InsertOrUpdateAssetAsync(assetDetails);
            }
            catch (Exception ex)
            {
                // Handle exceptions or log errors here.
                throw;
            }
        }
        public async Task<bool> DeleteAssetAsync(string assetNo)
        {
            try
            {
                // You can add additional business logic here if needed.

                return await _assetDataAccess.DeleteAssetAsync(assetNo);
            }
            catch (Exception ex)
            {
                // Handle exceptions or log errors here.
                throw;
            }
        }
    }
}
