using DataCorner.DataAccess.Interfaces;
using DataCorner.Models;
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
            //string[] pid = traineeDetails.project_Id.Split(" - ");
            using (var connection = new MySqlConnection(_connectionString))
            {
               await connection.OpenAsync();

                var cmd = new MySqlCommand("InsertTraineeDetails2", connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", traineeDetails.empId);
                cmd.Parameters.AddWithValue("@Name", traineeDetails.Name);
                cmd.Parameters.AddWithValue("@DOJ", traineeDetails.DOJ);
                //cmd.Parameters.AddWithValue("@Project_Id", pid[0]);
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
                cmd.Parameters.AddWithValue("@Months_inSS", traineeDetails.months_in_SS);
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
    public async Task<List<IDropdownOption>> GetDropdownValuesAsync(int flag)
    {
        List<IDropdownOption> dropdownOptions = new List<IDropdownOption>();

        using (MySqlConnection connection = new MySqlConnection(_connectionString))
        {
            await connection.OpenAsync();

            using (MySqlCommand command = new MySqlCommand("GetDropdownValues", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Flag", flag);

                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (await reader.ReadAsync())
                    {
                        IDropdownOption option;

                        if (flag == 1)
                        {
                            EducationDropdown education = new EducationDropdown();
                            education.Education = reader["education"].ToString();
                            option = education;
                        }
                        else if (flag == 2)
                        {
                            CategoryDropDown category = new CategoryDropDown();
                            category.Category = reader["Category"].ToString();
                            option = category;
                        }
                        else if (flag == 3)
                        {
                            LocationDropDown loc = new LocationDropDown();
                            loc.Location = reader["location"].ToString();
                            option = loc;
                        }
                        else if (flag == 4)
                        {
                            BatchDropDown batch = new BatchDropDown();
                            batch.Batch = reader["batch"].ToString();
                            option = batch;
                        }
                        else if (flag == 5)
                        {
                            SkillSetDropDown skill_Set = new SkillSetDropDown();
                            skill_Set.skill_Set = reader["Skill_Set"].ToString();
                            option = skill_Set;
                        }
                        else if(flag == 6)
                        {
                            ProjectIDDropdown projectid = new ProjectIDDropdown();
                            projectid.Project_id = reader["Project_Id"].ToString();
                            option = projectid;
                        }
                        else
                        {
                            // If the flag is not recognized, continue to the next row.
                            continue;
                        }

                        dropdownOptions.Add(option);
                    }
                }
            }
        }

        return dropdownOptions;
    }

    public async Task<IEnumerable<ProjectHistory>> GetProjectHistoryAsync(int id) 
    {
        using (var connection = new MySqlConnection(_connectionString))
        {
            await connection.OpenAsync();

            using (var command = new MySqlCommand("GetProjectHistoryDetails", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new MySqlParameter("@Id", MySqlDbType.Int32) { Value = id });

                using (var reader = await command.ExecuteReaderAsync())
                {
                    var prohis = new List<ProjectHistory>();

                    while (await reader.ReadAsync())
                    {
                        var phistory = new ProjectHistory
                        {
                            EmpId = Convert.ToInt32(reader["EmpId"]),
                            Project_Id = reader["Project_Id"].ToString(),
                            ProjectName = reader["ProjectName"].ToString(),
                            TOP = reader["TOP"].ToString(),
                            Project_Skill = reader["Project_Skill"].ToString(),
                            Project_Role = reader["Project_Role"].ToString(),
                            Role_Description = reader["Role_Description"].ToString(),
                            ReportingPerson = reader["ReportingPerson"].ToString(),
                        };

                        prohis.Add(phistory);
                    }

                    return prohis;
                }
            }
        }
    }

}



