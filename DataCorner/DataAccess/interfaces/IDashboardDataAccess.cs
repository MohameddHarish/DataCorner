using DataCorner.Models.Dto;

namespace DataCorner.DataAccess.interfaces
{
    public interface IDashboardDataAccess
    {
        Task<DashboardDto> GetDashboardCountAsync();
    }
}
