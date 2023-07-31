using System.Threading.Tasks;
using DataCorner.Models.Dto;

namespace DataCorner.Services.Interfaces
{
    public interface IAddTraineeService
    {
        Task<bool> InsertTraineeDetails(AddTraineesDto traineeDetails);
    }
}
