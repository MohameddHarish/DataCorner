namespace DataCorner.Models
{
    public class BatchDropDown : IDropdownOption
    {
        public string Batch { get; set; }
        public string DisplayText => Batch;
    }
}
