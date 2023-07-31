using System.Threading.Tasks;
using DataCorner.DataAccess.Interfaces;
using DataCorner.Models.Dto;
using DataCorner.Services.Interfaces;

namespace DataCorner.Services
{
    public class AddTraineeService : IAddTraineeService
    {
        private readonly IAddTraineeDataAccess _dataAccess;

        public AddTraineeService(IAddTraineeDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        public async Task<bool> InsertTraineeDetails(AddTraineesDto traineeDetails)
        {
            
            return await _dataAccess.InsertTraineeDetails(traineeDetails);
        }

    }
}
  
