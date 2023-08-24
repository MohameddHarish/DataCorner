using System.Configuration;
using System.Data;
using System.Threading.Tasks;
using DataCorner.DataAccess.interfaces;
using DataCorner.Models;
using DataCorner.Models.Dto;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;

namespace DataCorner.DataAccess
{
    public class AccountDataAccess : IAccountDataAccess
    {
        private readonly string _connectionString;

        public AccountDataAccess(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ttdconnection");
        }

        public async Task<Login?> AuthenticateUser(Login login)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("GetLogin", connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Flag", 1);
                    command.Parameters.AddWithValue("@UserName", login.UserName);
                    command.Parameters.AddWithValue("@Pwd", login.Pwd);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            return new Login
                            {
                                UserName = reader["UserName"].ToString(),
                                Pwd = reader["Password"].ToString(),
                                IsAdmin = reader["IsAdmin"].ToString(),
                                RoleId = Convert.ToInt32(reader["RoleId"]),
                            };
                        }
                    }
                }
            }

            return null;
        }

        public async Task<IEnumerable<AccessDto>> GetAccessAsync()
        {
            var accesss = new List<AccessDto>();

            using MySqlConnection connection = new MySqlConnection(_connectionString);

            await connection.OpenAsync();

            using MySqlCommand command = new MySqlCommand("GetAccess", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@Flag", 1);
           

            using var reader = await Task.Run(() => command.ExecuteReader());

            while (await reader.ReadAsync())
            {
                accesss.Add(new AccessDto
                {
                    roleId = Convert.ToInt32(reader["RoleId"]),
                    roleName = reader["RoleName"].ToString(),
                    defaultColumns = reader["DefaultColumns"].ToString(),
                    
                });
            }

            return accesss;
        }
    }
}
