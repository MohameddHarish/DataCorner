using DataCorner.Models;


namespace DataCorner.Services.interfaces
{
    public interface IAssetDashbaordService
    {
        Task<AssetDashboard> GetAssetDashboardCountAsync();
    }
}
