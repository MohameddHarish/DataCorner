using DataCorner.DataAccess.interfaces;
using DataCorner.Models.Dto;
using System.Data;
using MySql.Data.MySqlClient;

namespace DataCorner.DataAccess
{
    public class DashboardDataAccess : IDashboardDataAccess
    {
        private readonly string _connectionString;

        public DashboardDataAccess(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ttdconnection");
        }

        public async Task<DashboardDto> GetDashboardCountAsync()
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("GetDashboardCount", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Flag", 1);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            return new DashboardDto
                            {
                                Billable = Convert.ToInt32(reader["Billable"]),
                                NonBillableDeploy = Convert.ToInt32(reader["NonBillableDeploy"]),
                                NonBillableA = Convert.ToInt32(reader["NonBillableA"]),
                                NonBillableDeployA = Convert.ToInt32(reader["NonBillableDeployA"]),
                                NonBillableNonUtilize = Convert.ToInt32(reader["NonBillableNonUtilize"]),
                                AllTrainees = Convert.ToInt32(reader["AllTrainees"])
                            };
                        }
                    }
                }
            }

            // Return null or throw an exception based on your requirement
            return null;
        }
    }
}