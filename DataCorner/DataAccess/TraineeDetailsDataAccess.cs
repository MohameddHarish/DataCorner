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
    public class TraineeDetailsDataAccess : ITraineeDetailsDataAccess
    {
        private readonly IConfiguration _configuration;

        public TraineeDetailsDataAccess(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<IEnumerable<TraineeDetailsDto>> GetTraineeDetailsAsync(int Id)
        {
            var traineeDetails = new List<TraineeDetailsDto>();

            using MySqlConnection connection = new MySqlConnection(_configuration.GetConnectionString("ttdconnection"));

            await connection.OpenAsync();

            using MySqlCommand command = new MySqlCommand("GetTraineeDetails", connection);
            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@Id", Id);
            command.Parameters.AddWithValue("@Flag", 1);
            using var reader = await Task.Run(() => command.ExecuteReader());

            while (await reader.ReadAsync())
            {

                traineeDetails.Add(new TraineeDetailsDto
                {
                    emp_Id = Convert.ToInt32(reader["Emp_Id"]),
                    Name = reader["Name"].ToString(),
                    DOJ = reader["DOJ"].ToString(),
                    project_Id = reader["Project_Id"].ToString(),
                    project_Name = reader["Project_Name"].ToString(),
                    Category = reader["Category"].ToString(),
                    PCD = reader["PCD"].ToString(),
                    Prospects = reader["Prospects"].ToString(),
                    skill_Set = reader["Skill_Set"].ToString(),
                    ReportingTo = reader["ReportingTo"].ToString(),
                    Division_id= Convert.ToInt32(reader["Division_Id"]),
                    Division = reader["Division"].ToString(),
                    Sub_Div = reader["Sub_Div"].ToString(),
                    Skill_Catagories = reader["Skill_Catagories"].ToString(),
                    Skill_Clusters = reader["Skill_Clusters"].ToString(),
                    YOP = reader["YOP"].ToString(),
                    Education = reader["Education"].ToString(),
                    Prev_Exp = reader["Prev_Exp"].ToString(),
                    LeadName = reader["LeadName"].ToString(),
                    Location = reader["Location"].ToString(),
                    Project_Experience = reader["Project_Experience"].ToString(),
                    TOP = reader["TOP"].ToString(),
                    TCD = reader["TCD"].ToString(),
                    DOT = reader["DOT"].ToString(),
                    Months_inSS = Convert.ToInt32(reader["Months_inSS"]),
                    Batch = reader["Batch"].ToString(),
                    Contact = reader["Contact"].ToString(),
                    MailId = reader["MailId"].ToString()
                });
            }

            return traineeDetails;
        }
    }
}

  