using System.Threading.Tasks;
using DataCorner.Models.Dto;

namespace DataCorner.DataAccess.Interfaces
{
    public interface IAddTraineeDataAccess
    {
        Task<bool> InsertTraineeDetails(AddTraineesDto traineeDetails);
        Task<bool> UpdateTraineeDetails(AddTraineesDto traineeDetails);
    }
}
