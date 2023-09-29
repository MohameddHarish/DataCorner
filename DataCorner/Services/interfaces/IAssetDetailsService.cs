using System.Collections.Generic;
using System.Threading.Tasks;
using DataCorner.Models;

namespace DataCorner.Services.Interfaces
{
    public interface IAssetDetailsService
    {
        Task<IEnumerable<AddAssets>> GetAssetDetailsAsync(int empId, int flag);
    }
}
