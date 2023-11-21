using DataCorner.DataAccess.interfaces;
using DataCorner.Models.Dto;
using System.Data;
using MySql.Data.MySqlClient;
using DataCorner.Models;

namespace DataCorner.DataAccess
{
    public class AssetDashboardDataAccess : IAssetDashboardDataAccess
    {
        private readonly string _connectionString;

        public AssetDashboardDataAccess(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ttdconnection");
        }

        public async Task<AssetDashboard> GetAssetDashboardCountAsync()
        {
            using (var connection = new MySqlConnection(_connectionString))
            {

                await connection.OpenAsync();
                using (var command = new MySqlCommand("GetAssetDahboardCount", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Flag", 1);
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            return new AssetDashboard
                            {
                                Laptop = Convert.ToInt32(reader["Laptop"]),
                                Phone = Convert.ToInt32(reader["Phone"]),
                                SimCards = Convert.ToInt32(reader["SimCards"]),
                                MagicJack = Convert.ToInt32(reader["MagicJack"]),
                                VoipPhone = Convert.ToInt32(reader["VoipPhone"]),
                                AllAssets = Convert.ToInt32(reader["AllAssets"])
                            };
                        }
                    }
               
                }
            }
            return null;
        }


    }
}
