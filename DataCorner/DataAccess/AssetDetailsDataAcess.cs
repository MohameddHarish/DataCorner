using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using DataCorner.DataAccess.Interfaces;
using DataCorner.Models;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;

namespace DataCorner.DataAccess
{
    public class AssetDetailsDataAccess : IAssetDetailsDataAccess
    {
        private readonly string _connectionString;

        public AssetDetailsDataAccess(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ttdconnection");
        }

        public async Task<IEnumerable<AddAssets>> GetAssetDetailsAsync(int empId, int flag)
        {
            try
            {
                using (var connection = new MySqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    var cmd = new MySqlCommand("GetAssetDetails", connection);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_EmpId", empId);
                    cmd.Parameters.AddWithValue("p_Flag", flag);

                    var assets = new List<AddAssets>();

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var asset = new AddAssets
                            {
                                AssetId = reader["AssetId"].ToString(),
                                EmpId = (int)reader["EmpId"],
                                EmpName = reader["EmpName"].ToString(),
                                Location = reader["Location"].ToString(),
                                Make = reader["Make"].ToString(),
                                ModelNo = reader["ModelNo"].ToString(),
                                Issues = reader["Issues"].ToString()
                            };
                            assets.Add(asset);
                        }
                    }

                    return assets;
                }
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed.
                throw;
            }
        }
    }
}
