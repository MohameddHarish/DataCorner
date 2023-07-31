using DataCorner.Models.Dto;

namespace DataCorner.Services.interfaces
{
    public interface ITraineeDetailsService
    {
        Task<IEnumerable<TraineeDetailsDto>> GetTraineeDetailsAsync(int Id);
    }
}
