using System.Threading.Tasks;
using DataCorner.Models;
using DataCorner.Models.Dto;

namespace DataCorner.Services.Interfaces
{
    public interface IAddTraineeService
    {
        Task<bool> InsertTraineeDetails(AddTraineesDto traineeDetails);

        Task<List<IDropdownOption>> GetDropdownValuesAsync(int flag);

        Task<IEnumerable<ProjectHistory>> GetProjectHistory(int id);
    }
}
