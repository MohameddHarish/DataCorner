using DataCorner.DataAccess.Interfaces;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Data;
using System.Threading.Tasks;

public class AddTraineeDataAccess : IAddTraineeDataAccess
{
    private readonly string _connectionString;

    public AddTraineeDataAccess(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("ttdconnection");
    }

    public async Task<bool> InsertTraineeDetails(AddTraineesDto traineeDetails)
    {
        try
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                var cmd = new MySqlCommand("InsertTraineeDetails2", connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", traineeDetails.emp_Id);
                cmd.Parameters.AddWithValue("@Name", traineeDetails.Name);
                cmd.Parameters.AddWithValue("@DOJ", traineeDetails.DOJ);
                cmd.Parameters.AddWithValue("@Project_Id", traineeDetails.project_Id);
                //cmd.Parameters.AddWithValue("@Project_Name", traineeDetails.project_Name);
                cmd.Parameters.AddWithValue("@Category", traineeDetails.Category);
                cmd.Parameters.AddWithValue("@PCD", traineeDetails.PCD);
                cmd.Parameters.AddWithValue("@Prospects", traineeDetails.Prospects);
                cmd.Parameters.AddWithValue("@Skill_Set", traineeDetails.skill_Set);
                cmd.Parameters.AddWithValue("@ReportingTo", traineeDetails.ReportingTo);
                cmd.Parameters.AddWithValue("@Did", traineeDetails.division_id);
                //cmd.Parameters.AddWithValue("@Division", traineeDetails.Division);
                //cmd.Parameters.AddWithValue("@Sub_Div", traineeDetails.Sub_Div);
                //cmd.Parameters.AddWithValue("@Skill_Catagories", traineeDetails.Skill_Catagories);
                //cmd.Parameters.AddWithValue("@Skill_Clusters", traineeDetails.Skill_Clusters);
                cmd.Parameters.AddWithValue("@YOP", traineeDetails.YOP);
                cmd.Parameters.AddWithValue("@Education", traineeDetails.Education);
                cmd.Parameters.AddWithValue("@prev_Exp", traineeDetails.prev_Exp);
                cmd.Parameters.AddWithValue("@LeadName", traineeDetails.LeadName);
                cmd.Parameters.AddWithValue("@Location", traineeDetails.Location);
                cmd.Parameters.AddWithValue("@Project_Experience", traineeDetails.Project_Experience);
                cmd.Parameters.AddWithValue("@TOP", traineeDetails.TOP);
                cmd.Parameters.AddWithValue("@TCD", traineeDetails.TCD);
                cmd.Parameters.AddWithValue("@DOT", traineeDetails.DOT);
                cmd.Parameters.AddWithValue("@Months_inSS", traineeDetails.Months_inSS);
                cmd.Parameters.AddWithValue("@Batch", traineeDetails.Batch);
                cmd.Parameters.AddWithValue("@Contact", traineeDetails.Contact);
                cmd.Parameters.AddWithValue("@MailId", traineeDetails.MailId);

                await cmd.ExecuteNonQueryAsync();
            }

            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }
}
