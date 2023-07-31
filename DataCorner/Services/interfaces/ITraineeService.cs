using DataCorner.Models.Dto;

namespace DataCorner.Services.interfaces
{
    public interface ITraineeservice
    {
         Task<IEnumerable<TraineeDto>> GetTraineesAsync(string category, string search);
    }
}
