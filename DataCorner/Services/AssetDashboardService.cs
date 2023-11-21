using DataCorner.DataAccess;
using DataCorner.DataAccess.interfaces;
using DataCorner.Models;
using DataCorner.Models.Dto;
using DataCorner.Services.interfaces;

namespace DataCorner.Services
{
    public class AssetDashboardService :IAssetDashbaordService
    {
        private readonly IAssetDashboardDataAccess _AssetdashboardDataAccess;

        public AssetDashboardService(IAssetDashboardDataAccess assetDashboardDataAccess)
        {
            _AssetdashboardDataAccess = assetDashboardDataAccess;
        }
        public Task<AssetDashboard> GetAssetDashboardCountAsync()
        {
            return _AssetdashboardDataAccess.GetAssetDashboardCountAsync();
        }

    }
}
