namespace DataCorner.Models
{
    public class ProjectIDDropdown : IDropdownOption
    {
        public string Project_id { get; set; }
        public string DisplayText => Project_id;
    }
}
