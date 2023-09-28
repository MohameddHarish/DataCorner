using DataCorner.DataAccess.interfaces;
using DataCorner.Models;
using DataCorner.Services.interfaces;

namespace DataCorner.Services
{
    public class AssetDetailsService : IAssetDetailsService
    {
        private readonly IAssetDetailsDataAcess _assetDetailsDataAcess;

        public AssetDetailsService(IAssetDetailsDataAcess assetDetailsDataAcess)
        {
            _assetDetailsDataAcess = assetDetailsDataAcess;
        }

        public async Task<AddAssets> GetAssetDetailsAsync(int empId)
        {
            try
            {
                return await _assetDetailsDataAcess.GetAssetDetailsAsync(empId);
            }
            catch (Exception ex)
            {
                // Handle exceptions or log errors here.
                throw;
            }
        }
    }

}
