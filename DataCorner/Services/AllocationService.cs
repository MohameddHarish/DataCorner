using System;
using System.Threading.Tasks;
using DataCorner.DataAccess.Interfaces;
using DataCorner.Models;
using DataCorner.Services.Interfaces;

namespace DataCorner.Services
{
    public class AllocationService : IAllocationService
    {
        private readonly IAllocationDataAccess _allocationDataAccess;

        public AllocationService(IAllocationDataAccess allocationDataAccess)
        {
            _allocationDataAccess = allocationDataAccess;
        }

        public async Task<AllocationHistory> GetAllocationHistoryAsync(string assetNo)
        {
            return await _allocationDataAccess.GetAllocationHistoryAsync(assetNo);
        }

        public async Task<string> ManageAssetHistoryAsync(int operationFlag, string assetNo, int empId, string allotedTo, DateTime issueDate, DateTime returnDate)
        {
            return await _allocationDataAccess.ManageAssetHistoryAsync(operationFlag, assetNo, empId, allotedTo, issueDate, returnDate);
        }
    }
}
