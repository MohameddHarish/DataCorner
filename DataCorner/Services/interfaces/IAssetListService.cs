using System.Collections.Generic;
using System.Threading.Tasks;
using DataCorner.Models;
using DataCorner.Models.Dto;

namespace DataCorner.Services.Interfaces
{
    public interface IAssetListService
    {
        Task<IEnumerable<AddAssets>> GetAssetListDetailsAsync(string AssetType);
    }
}
