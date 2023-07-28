using DataCorner.DataAccess;
using DataCorner.DataAccess.interfaces;
using DataCorner.Models.Dto;
using DataCorner.Services.interfaces;

namespace DataCorner.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IDashboardDataAccess _dashboardDataAccess;

        public DashboardService(IDashboardDataAccess dashboardDataAccess)
        {
            _dashboardDataAccess = dashboardDataAccess;
        }

        public Task<DashboardDto> GetDashboardCountAsync(int flag)
        {
            return _dashboardDataAccess.GetDashboardCountAsync(flag);
        }
    }
}
