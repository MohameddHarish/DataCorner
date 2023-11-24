using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using DataCorner.DataAccess.interfaces;
using DataCorner.DataAccess.Interfaces;
using DataCorner.Models;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
namespace DataCorner.DataAccess
{
    public class AssetHistoryDataAccess : IAssetHistoryDataAccess
    {
        private readonly string _connectionString;

        public AssetHistoryDataAccess(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ttdconnection");
        }

        public async Task InsertAllocateStatusAsync(string assetNo, int empId, string empName, string allocatedOn, string allocateRemarks)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("InsertAllocateAsset", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@p_AssetNo", assetNo);
                    command.Parameters.AddWithValue("@p_EmpId", empId);
                    command.Parameters.AddWithValue("@p_EmpName", empName);
                    command.Parameters.AddWithValue("@p_AllocatedOn", allocatedOn);
                    command.Parameters.AddWithValue("@p_AllocateRemarks", allocateRemarks);

                    await command.ExecuteNonQueryAsync();
                }
            }
        }

        public async Task InsertReturnStatusAsync(string assetNo, int empId, string empName, string returnedOn, string returnRemarks, string newStatus)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("InsertReturnAsset", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@p_AssetNo", assetNo);
                    command.Parameters.AddWithValue("@p_EmpId", empId);
                    command.Parameters.AddWithValue("@p_EmpName", empName);
                    command.Parameters.AddWithValue("@p_ReturnedOn", returnedOn);
                    command.Parameters.AddWithValue("@p_ReturnRemarks", returnRemarks);
                    command.Parameters.AddWithValue("@p_NewStatus", newStatus);

                    await command.ExecuteNonQueryAsync();
                }
            }
        }
    }
}