using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using DataCorner.DataAccess.interfaces;
using DataCorner.Models;

namespace DataCorner.DataAccess
{
    public class DivisionDataAccess : IDivisionDataAccess
    {
        private readonly string _connectionString;

        public DivisionDataAccess(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ttdconnection");
        }

        public async Task<IEnumerable<Division>> GetDivisionDetails(int flag = 1) // Set default value to 1
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("GetDivisionDetails", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new MySqlParameter("@Flag", MySqlDbType.Int32) { Value = flag });

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        var divisions = new List<Division>();

                        while (await reader.ReadAsync())
                        {
                            var division = new Division
                            {
                                division_id = Convert.ToInt32(reader["Division_Id"]),
                                division = reader["Division"].ToString(),
                                sub_div = reader["Sub_Div"].ToString(),
                                skill_categories = reader["Skill_Catagories"].ToString(),
                                skill_clusters = reader["skill_clusters"].ToString(),
                            };

                            divisions.Add(division);
                        }

                        return divisions;
                    }
                }
            }
        }
    }
}
