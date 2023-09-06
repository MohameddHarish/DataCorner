using System.Threading.Tasks;
using DataCorner.Models;
using DataCorner.Models.Dto;

namespace DataCorner.DataAccess.Interfaces
{
    public interface IAddTraineeDataAccess
    {
        Task<bool> InsertTraineeDetails(AddTraineesDto traineeDetails);

        Task<List<IDropdownOption>> GetDropdownValuesAsync(int flag);

        Task<IEnumerable<ProjectHistory>> GetProjectHistoryAsync(int id);

    }
}
