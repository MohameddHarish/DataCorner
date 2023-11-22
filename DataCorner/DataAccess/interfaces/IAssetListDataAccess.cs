using DataCorner.Models;
using DataCorner.Models.Dto;

namespace DataCorner.DataAccess.interfaces
{
    public interface IAssetListDataAccess
    {
        Task<IEnumerable<AddAssets>> GetAssetListDetailsAsync(string AssetType);
    }
}
