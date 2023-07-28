﻿using DataCorner.DataAccess.interfaces;
using DataCorner.Models.Dto;
using System.Data;
using System;
using System.Collections.Generic;
using System.Data;
using MySql.Data.MySqlClient;
using System.Threading.Tasks;

namespace DataCorner.DataAccess
{
    public class DashboardDataAccess : IDashboardDataAccess
    {
        private readonly string _connectionString;

        public DashboardDataAccess(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ttdconnection");
        }

        public async Task<DashboardDto> GetDashboardCountAsync(int flag)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("GetDashboardCount", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Flag", flag);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            return new DashboardDto
                            {
                                Billable = Convert.ToInt32(reader["Billable"]),
                                NonBillableDeploy = Convert.ToInt32(reader["NonBillableDeploy"]),
                                NonBillableA = Convert.ToInt32(reader["NonBillableA"]),
                                NonBillableDeployA = Convert.ToInt32(reader["NonBillableDeployA"]),
                                NonBillableNonUtilize = Convert.ToInt32(reader["NonBillableNonUtilize"])
                            };
                        }
                    }
                }
            }

            // Return null or throw an exception based on your requirement
            return null;
        }
    }
}