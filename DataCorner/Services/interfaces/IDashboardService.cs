using DataCorner.Models.Dto;

namespace DataCorner.Services.interfaces
{
    public interface IDashboardService
    {
        Task<DashboardDto> GetDashboardCountAsync(int flag);
    }
}
