    using System.Configuration;
    using System.Data;
    using System.Threading.Tasks;
    using DataCorner.DataAccess.interfaces;
    using DataCorner.Models;
    using DataCorner.Models.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
    using Microsoft.VisualBasic;
    using MySql.Data.MySqlClient;
using static Org.BouncyCastle.Math.EC.ECCurve;

namespace DataCorner.DataAccess
{
    public class AccessDataAccess : IAccessDataAccess
    {
        private readonly string _connectionString;

        public AccessDataAccess(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ttdconnection");
        }


        public async Task<bool> UpdateAccessMasterAsync(int roleId, AccessModel accessModel)
        {
            try
            {
                using (var connection = new MySqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    string query = "UPDATE accessmaster SET DefaultColumns = @DefaultColumns WHERE RoleId = @RoleId AND RoleName = @RoleName";

                    using (var cmd = new MySqlCommand(query, connection))
                    {
                        cmd.Parameters.AddWithValue("@RoleId", roleId);
                        cmd.Parameters.AddWithValue("@RoleName", accessModel.RoleName);
                        cmd.Parameters.AddWithValue("@DefaultColumns", accessModel.DefaultColumns);

                        int rowsAffected = await cmd.ExecuteNonQueryAsync();

                        return rowsAffected > 0;
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions here
                return false;
            }
        }
    }
}
