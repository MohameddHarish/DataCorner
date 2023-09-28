using DataCorner.Models;

namespace DataCorner.Services.interfaces
{
    public interface IAssetDetailsService
    {
        Task<AddAssets> GetAssetDetailsAsync(int empId);
    }
}
