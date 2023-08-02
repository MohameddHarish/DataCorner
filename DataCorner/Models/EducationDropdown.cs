namespace DataCorner.Models
{
    public class EducationDropdown : IDropdownOption
    {
        public string Education { get; set; }
        public string DisplayText => Education;
    }
}
