namespace DataCorner.Models
{
    public class LocationDropDown : IDropdownOption
    {
        public string Location { get; set; }
        public string DisplayText => Location;
    }

}
