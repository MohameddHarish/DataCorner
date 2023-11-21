using DataCorner.Models;
using DataCorner.Models.Dto;

namespace DataCorner.DataAccess.interfaces
{
    public interface IAssetDashboardDataAccess
    {
        Task<AssetDashboard> GetAssetDashboardCountAsync();
    }
}
