using DataCorner.Models.Dto;

namespace DataCorner.DataAccess.interfaces
{
    public interface ITraineeDataAccess
    {
        Task<IEnumerable<TraineeDto>> GetTraineesAsync(string category, string search);
    }
}
