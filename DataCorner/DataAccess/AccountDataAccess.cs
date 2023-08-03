using System.Data;
using System.Threading.Tasks;
using DataCorner.DataAccess.interfaces;
using DataCorner.Models;
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
                                IsAdmin = reader["IsAdmin"].ToString()
                            };
                        }
                    }
                }
            }

            return null;
        }
    }
}
