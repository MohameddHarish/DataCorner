namespace DataCorner.DataAccess.interfaces
{
    public interface IAssetHistoryDataAccess
    {
        Task InsertAllocateStatusAsync(string assetNo, int empId, string empName, string allocatedOn, string allocateRemarks);
        Task InsertReturnStatusAsync(string assetNo, int empId, string empName, string returnedOn, string returnRemarks, string newStatus);
    }

}
