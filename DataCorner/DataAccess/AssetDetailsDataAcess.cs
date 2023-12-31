﻿using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using DataCorner.DataAccess.Interfaces;
using DataCorner.Models;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;

namespace DataCorner.DataAccess
{
    public class AssetDetailsDataAccess : IAssetDetailsDataAccess
    {
        private readonly string _connectionString;

        public AssetDetailsDataAccess(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ttdconnection");
        }

        public async Task<IEnumerable<AddAssets>> GetAssetDetailsAsync(string assetNo, int flag)
        {
            try
            {
                using (var connection = new MySqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    var cmd = new MySqlCommand("GetAssetDetails", connection);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_AssetNo", assetNo);
                    cmd.Parameters.AddWithValue("p_Flag", flag);

                    var assets = new List<AddAssets>();

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var asset = new AddAssets
                            {
                                AssetNo = reader["AssetNo"].ToString(),
                                //EmpId = (int)reader["EmpId"],
                                //EmpName = reader["EmpName"].ToString(),
                                Location = reader["Location"].ToString(),
                                Brand = reader["Brand"].ToString(),
                                ModelNo = reader["ModelNo"].ToString(),
                                Issues = reader["Issues"].ToString(),
                                AssetGroup = reader["AssetGroup"].ToString(),
                                AssetType = reader["AssetType"].ToString(),
                                Description = reader["Description"].ToString(),
                                AssetStatus = reader["AssetStatus"].ToString(),
                                SerialNo = reader["SerialNo"].ToString(),
                                PurchaseDate = reader["PurchaseDate"].ToString(),
                                InvoiceNo = reader["InvoiceNo"].ToString(),
                                OriginalValue = reader["OriginalValue"].ToString(),
                                CurrentValue = reader["CurrentValue"].ToString(),
                                Warranty = reader["Warranty"].ToString(),
                                Remarks = reader["Remarks"].ToString()

                            };
                            assets.Add(asset);
                        }
                    }

                    return assets;
                }
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed.
                throw;
            }
        }
    }
}
