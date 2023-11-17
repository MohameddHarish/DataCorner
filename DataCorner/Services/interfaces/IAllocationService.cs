using System;
using System.Threading.Tasks;
using DataCorner.Models;

namespace DataCorner.Services.Interfaces
{
    public interface IAllocationService
    {
        Task<AllocationHistory> GetAllocationHistoryAsync(string assetNo);
        Task<string> ManageAssetHistoryAsync(int operationFlag, string assetNo, int empId, string allotedTo, DateTime issueDate, DateTime returnDate);
    }
}
