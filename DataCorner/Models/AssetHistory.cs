namespace DataCorner.Models
{
    public class AssetHistory
    {
        public string AssetNo { get; set; }
        public int EmpId { get; set; }
        public string EmpName { get; set; }
        public string? AllocatedOn { get; set; }
        public string? AllocateRemarks { get; set; }
        public string? ReturnedOn { get; set; }
        public string? ReturnRemarks { get; set; }
        public string? NewStatus { get; set; } // New property for NewStatus
    }
}
