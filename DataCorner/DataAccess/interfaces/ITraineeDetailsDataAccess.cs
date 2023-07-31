using DataCorner.Models.Dto;

namespace DataCorner.DataAccess.interfaces
{
    public interface ITraineeDetailsDataAccess
    {
        Task<IEnumerable<TraineeDetailsDto>> GetTraineeDetailsAsync(int Id);
    }
}
