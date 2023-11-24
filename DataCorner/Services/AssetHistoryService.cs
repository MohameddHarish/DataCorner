using DataCorner.DataAccess.interfaces;
using DataCorner.Models;
using DataCorner.Services.interfaces;

namespace DataCorner.Services
{
    public class AssetHistoryService : IAssetHistoryService
    {
        private readonly IAssetHistoryDataAccess dataAccess;

        public AssetHistoryService(IAssetHistoryDataAccess dataAccess)
        {
            this.dataAccess = dataAccess;
        }

        public async Task AllocateAssetAsync(AssetHistory assetHistory)
        {
            await dataAccess.InsertAllocateStatusAsync(assetHistory.AssetNo, assetHistory.EmpId, assetHistory.EmpName, assetHistory.AllocatedOn, assetHistory.AllocateRemarks);
        }

        public async Task ReturnAssetAsync(AssetHistory assetHistory, string newStatus)
        {
            await dataAccess.InsertReturnStatusAsync(assetHistory.AssetNo, assetHistory.EmpId, assetHistory.EmpName, assetHistory.ReturnedOn , assetHistory.ReturnRemarks, newStatus);
        }
    }

}
