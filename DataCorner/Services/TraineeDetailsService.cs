using DataCorner.DataAccess.interfaces;
using DataCorner.Models.Dto;
using DataCorner.Services.interfaces;

namespace DataCorner.Services
{
    public class TraineeDetailsService : ITraineeDetailsService
    {

        private readonly ITraineeDetailsDataAccess _traineeDetailsDataAccess;

        public TraineeDetailsService(ITraineeDetailsDataAccess traineeDetailsDataAccess)
        {
            _traineeDetailsDataAccess = traineeDetailsDataAccess;
        }

        public async Task<IEnumerable<TraineeDetailsDto>> GetTraineeDetailsAsync(int Id)
        {
            return await _traineeDetailsDataAccess.GetTraineeDetailsAsync(Id);
        }
    }
}
