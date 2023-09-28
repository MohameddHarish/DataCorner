using DataCorner.DataAccess.interfaces;
using System.Data;
using DataCorner.Models;

using MySql.Data.MySqlClient;



namespace DataCorner.DataAccess
{
    public class AssetDetailsDataAcess : IAssetDetailsDataAcess
    {
        private readonly string _connectionString;

        public AssetDetailsDataAcess(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ttdconnection");
        }

        public async Task<AddAssets> GetAssetDetailsAsync(int empId)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("GetAssetDetails", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@p_EmpId", empId);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            return new AddAssets
                            {
                                AssetId = reader["AssetId"].ToString(),
                                EmpId = Convert.ToInt32(reader["EmpId"]),
                                EmpName = reader["EmpName"].ToString(),
                                Location = reader["Location"].ToString(),
                                Make = reader["Make"].ToString(),
                                ModelNo = reader["ModelNo"].ToString(),
                                Issues = reader["Issues"].ToString()
                            };
                        }
                        return null;
                    }
                }
            }
        }
    }
}
