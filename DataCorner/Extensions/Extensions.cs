using DataCorner.DataAccess.interfaces;
using DataCorner.DataAccess;
using DataCorner.Services.interfaces;
using DataCorner.Services;
using DataCorner.DataAccess.Interfaces;
using DataCorner.Services.Interfaces;


namespace DataCorner.Extensions
{
    public static class Extensions
    {
        public static void AddMyServices(this IServiceCollection services)
        {
  
            services.AddScoped<IDashboardService, DashboardService>();
            services.AddScoped<IDashboardDataAccess, DashboardDataAccess>();
            services.AddScoped<ITraineeDataAccess, TraineeDataAccess>();
            services.AddScoped<ITraineeservice, TraineeService>();
            services.AddScoped<ITraineeDetailsDataAccess, TraineeDetailsDataAccess>();
            services.AddScoped<ITraineeDetailsService, TraineeDetailsService>();   
            services.AddScoped<IAddTraineeDataAccess,AddTraineeDataAccess>();
            services.AddScoped<IAddTraineeService, AddTraineeService>();
            services.AddScoped<IAccountDataAccess, AccountDataAccess>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IDivisionDataAccess,DivisionDataAccess>();
            services.AddScoped<IDivisionService, DivisionService>();
            services.AddScoped<IAccessService, AccessService>();
            services.AddScoped<IAccessDataAccess, AccessDataAccess>();
            services.AddScoped<IAddAssestDataAccess, AddAssetDataAcess>();
            services.AddScoped<IAddAssetService, AssetService>();
            services.AddScoped<IAssetDetailsDataAccess, AssetDetailsDataAccess>();
            services.AddScoped<IAssetDetailsService, AssetDetailsService>();
            services.AddScoped<IAllocationDataAccess, AllocationDataAccess>();
            services.AddScoped<IAllocationService, AllocationService>();
            services.AddScoped<IAssetDashbaordService,AssetDashboardService>();
            services.AddScoped<IAssetDashboardDataAccess,AssetDashboardDataAccess>();
            services.AddScoped<IAssetListService, AssetListService>();
            services.AddScoped<IAssetListDataAccess, AssetListDataAccess>();
            services.AddScoped<IAssetHistoryDataAccess, AssetHistoryDataAccess>();
            services.AddScoped<IAssetHistoryService, AssetHistoryService>();
        }

    }
}
