using DataCorner.Models;

namespace DataCorner.DataAccess.interfaces
{
    public interface IAssetDetailsDataAcess
    {
        Task<AddAssets> GetAssetDetailsAsync(int empId);
    }

}
