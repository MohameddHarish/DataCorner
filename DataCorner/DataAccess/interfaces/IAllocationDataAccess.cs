using System;
using System.Threading.Tasks;
using DataCorner.Models;

namespace DataCorner.DataAccess.Interfaces
{
    public interface IAllocationDataAccess
    {
        Task<AllocationHistory> GetAllocationHistoryAsync(string assetNo);
        Task<string> ManageAssetHistoryAsync(int operationFlag, string assetNo, int empId, string allotedTo, DateTime issueDate, DateTime returnDate);
    }
}
