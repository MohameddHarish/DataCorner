using DataCorner.Models;

namespace DataCorner.Services.interfaces
{
    public interface IAssetHistoryService
    {
        Task AllocateAssetAsync(AssetHistory assetHistory);
        Task ReturnAssetAsync(AssetHistory assetHistory, string newStatus);

        Task<IEnumerable<AssetHistory>> GetAssetHistoryAsync(string assetNo, int flag);
    }

}
