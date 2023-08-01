namespace DataCorner.Models
{
    public class SkillSetDropDown : IDropdownOption
    {
        public string skill_Set { get; set; }
        public string DisplayText => skill_Set;
    }
}
