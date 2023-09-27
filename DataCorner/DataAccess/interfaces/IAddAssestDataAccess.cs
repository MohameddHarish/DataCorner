using DataCorner.Models;

namespace DataCorner.DataAccess.interfaces
{
    public interface IAddAssestDataAccess
    {
        Task<bool> InsertOrUpdateAssetAsync(AddAssets assetDetails);
    }
}
