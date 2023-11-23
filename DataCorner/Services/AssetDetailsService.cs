using System.Collections.Generic;
using System.Threading.Tasks;
using DataCorner.DataAccess.Interfaces;
using DataCorner.Models;
using DataCorner.Services.Interfaces;

namespace DataCorner.Services
{
    public class AssetDetailsService : IAssetDetailsService
    {
        private readonly IAssetDetailsDataAccess _assetDetailsDataAccess;

        public AssetDetailsService(IAssetDetailsDataAccess assetDetailsDataAccess)
        {
            _assetDetailsDataAccess = assetDetailsDataAccess;
        }

        public async Task<IEnumerable<AddAssets>> GetAssetDetailsAsync(string assetNo, int flag)
        {
            try
            {
                return await _assetDetailsDataAccess.GetAssetDetailsAsync(assetNo, flag);
            }
            catch (Exception ex)
            {
                // Handle exceptions or log errors here.
                throw;
            }
        }
    }
}
