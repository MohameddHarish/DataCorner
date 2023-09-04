using System.ComponentModel.DataAnnotations;

namespace DataCorner.Models
{
    public class AccessModel
    {
        public int RoleId { get; set; }

        [Required]
        public string RoleName { get; set; }

        [Required]
        public string DefaultColumns { get; set; }
    }
}
