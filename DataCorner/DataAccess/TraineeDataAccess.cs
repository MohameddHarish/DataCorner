using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using DataCorner.DataAccess.interfaces;
using DataCorner.Models.Dto;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;


namespace DataCorner.DataAccess
{
    public class TraineeDataAccess : ITraineeDataAccess
    {
        private readonly IConfiguration _configuration;

        public TraineeDataAccess(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<IEnumerable<TraineeDto>> GetTraineesAsync(string category,string search)
        {
            var trainees = new List<TraineeDto>();

            using MySqlConnection connection = new MySqlConnection(_configuration.GetConnectionString("ttdconnection"));

            await connection.OpenAsync();

            using MySqlCommand command = new MySqlCommand("GetTraineeList2", connection);
            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@Category", category);
            command.Parameters.AddWithValue("@Search", search);

            using var reader = await Task.Run(() => command.ExecuteReader());

            while (await reader.ReadAsync())
            {
                trainees.Add(new TraineeDto
                {
                    Emp_Id = Convert.ToInt32(reader["Emp_Id"]),
                    Name = reader["Name"].ToString(),
                    MailId = reader["MailId"].ToString(),
                    SkillSet = reader["Skill_Set"].ToString(),
                    Contact = reader["Contact"].ToString(),
                    Months_in_SS = Convert.ToInt32(reader["Months_inSS"])
                });
            }

            return trainees;
        }
    }
}
