using DataCorner.DataAccess.interfaces;
using DataCorner.DataAccess;
using DataCorner.Services.interfaces;
using DataCorner.Services;

namespace DataCorner.Extensions
{
    public static class Extensions
    {
        public static void AddMyServices(this IServiceCollection services)
        {
  
            services.AddScoped<IDashboardService, DashboardService>();
            services.AddScoped<IDashboardDataAccess, DashboardDataAccess>();
        }

    }
}
