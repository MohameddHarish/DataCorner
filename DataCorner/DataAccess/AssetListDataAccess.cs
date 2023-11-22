using System;
using System.Collections.Generic;
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
    public class AssetListDataAccess : IAssetListDataAccess
    {
        private readonly IConfiguration _configuration;

        public AssetListDataAccess(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<IEnumerable<AddAssets>> GetAssetListDetailsAsync(string AssetType)
        {
            var assets = new List<AddAssets>();

            using MySqlConnection connection = new MySqlConnection(_configuration.GetConnectionString("ttdconnection"));

            await connection.OpenAsync();

            using MySqlCommand command = new MySqlCommand("GetAssetList", connection);
            command.CommandType = CommandType.StoredProcedure;
            if (AssetType != "All")
                command.Parameters.AddWithValue("@Flag", 1);
            else
                command.Parameters.AddWithValue("@Flag", 2);

            command.Parameters.AddWithValue("@p_AssetType", AssetType);
           

            using var reader = await Task.Run(() => command.ExecuteReader());

            while (await reader.ReadAsync())
            {
                assets.Add(new AddAssets
                {
                    AssetNo = reader["AssetNo"].ToString(),
                    EmpId = Convert.ToInt32(reader["EmpId"]),
                    EmpName = reader["EmpName"].ToString(),
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
                    Remarks = reader["Remarks"].ToString(),
                });
            }

            return assets;
        }
    }
   
}

