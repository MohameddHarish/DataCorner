using DataCorner.DataAccess.interfaces;
using DataCorner.Models.Dto;
using DataCorner.Services.interfaces;

namespace DataCorner.Services
{
    public class TraineeService :ITraineeservice
    {
        private readonly ITraineeDataAccess _traineeDataAccess;

        public TraineeService(ITraineeDataAccess traineeDataAccess)
        {
            _traineeDataAccess = traineeDataAccess;
        }

        public async Task<IEnumerable<TraineeDto>> GetTraineesAsync(string category, string search)
        {
            return await _traineeDataAccess.GetTraineesAsync(category, search);
        }
    }
}
