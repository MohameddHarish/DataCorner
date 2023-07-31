
using System.Security.Policy;

namespace DataCorner.Models.Dto
{
    public class TraineeDto
    {
        public int Emp_Id { get; set; }
        public string Name { get; set; }
        
        public string MailId { get; set; }

        public string Contact { get; set; }

        public string SkillSet { get; set; }

        public int Months_in_SS { get; set; }
    }
}
