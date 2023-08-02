namespace DataCorner.Models
{
    public class CategoryDropDown : IDropdownOption
    {
        public string Category { get; set; }
        public string DisplayText => Category;
    }
}
