﻿using System;
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
            if(category!="All")
                command.Parameters.AddWithValue("@Flag", 1);
            else
                command.Parameters.AddWithValue("@Flag", 2);
            command.Parameters.AddWithValue("@Category", category);
            command.Parameters.AddWithValue("@Search", search);

            using var reader = await Task.Run(() => command.ExecuteReader());

            while (await reader.ReadAsync())
            {
                trainees.Add(new TraineeDto
                {
                    empId = Convert.ToInt32(reader["Emp_Id"]),
                    Name = reader["Name"].ToString(),
                    DOJ = reader["DOJ"].ToString(),
                    project_Id = reader["Project_Id"].ToString(),
                    Project_Name = reader["Project_Name"].ToString(),
                    Category = reader["Category"].ToString(),
                    PCD = reader["PCD"].ToString(),
                    Prospects = reader["Prospects"].ToString(),
                    skill_Set = reader["Skill_Set"].ToString(),
                    ReportingTo = reader["ReportingTo"].ToString(),
                    Division_id = Convert.ToInt32(reader["Division_Id"]),
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
                    months_in_SS = reader["Months_inSS"].ToString(),
                    Batch = reader["Batch"].ToString(),
                    Contact = reader["Contact"].ToString(),
                    MailId = reader["MailId"].ToString()
                });
            }

            return trainees;
        }
    }
}
