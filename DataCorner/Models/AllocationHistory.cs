namespace DataCorner.Models
{
    public class AllocationHistory
    {
        public int EmpId {  get; set; }

        public DateTime issueddate { get; set; }
        
        public string allotedto { get; set; }
        public DateTime returnedon { get; set; }

        public string AssetNo { get; set; }

    }
}
