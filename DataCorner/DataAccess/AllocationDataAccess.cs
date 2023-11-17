using System;
using System.Data;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using DataCorner.DataAccess.Interfaces;
using MySql.Data.MySqlClient;
using DataCorner.Models;
using DataCorner.DataAccess.interfaces;

namespace DataCorner.DataAccess
{
    public class AllocationDataAccess : IAllocationDataAccess
    {
        private readonly string _connectionString;

        public AllocationDataAccess(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ttdconnection");
        }

        public async Task<AllocationHistory> GetAllocationHistoryAsync(string assetNo)
        {
            try
            {
                using (var connection = new MySqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    var cmd = new MySqlCommand("getAllocationhistory", connection);
                    cmd.CommandType = CommandType.StoredProcedure;
                    //cmd.Parameters.AddWithValue("p_operation_flag", 3); // Set operation flag to 3 for SELECT
                    cmd.Parameters.AddWithValue("p_assetno", assetNo);
                   

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        if (reader.Read())
                        {
                            return new AllocationHistory
                            {
                                EmpId = Convert.ToInt32(reader["EmpId"]),
                                issueddate = Convert.ToDateTime(reader["issueddate"]),
                                allotedto = reader["allotedto"].ToString(),
                                returnedon = Convert.ToDateTime(reader["returnedon"]),
                                AssetNo = assetNo.ToString()
                            };
                        }
                        else
                        {
                            return null; // Asset not found
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions
                return null;
            }
        }


        public async Task<string> ManageAssetHistoryAsync(int operationFlag, string assetNo, int empId, string allotedTo, DateTime issueDate, DateTime returnDate)
        {
            try
            {
                using (var connection = new MySqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    var cmd = new MySqlCommand("ManageAssetHistory", connection);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_operation_flag", operationFlag);
                    cmd.Parameters.AddWithValue("p_assetno", assetNo);
                    cmd.Parameters.AddWithValue("p_empid", empId);
                    cmd.Parameters.AddWithValue("p_allotedto", allotedTo);
                    cmd.Parameters.AddWithValue("p_issue_date", issueDate);
                    cmd.Parameters.AddWithValue("p_return_date", returnDate);

                    var result = await cmd.ExecuteScalarAsync();

                    return result != null ? result.ToString() : "Invalid operation flag";
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions
                return "Error";
            }
        }
    }
}
