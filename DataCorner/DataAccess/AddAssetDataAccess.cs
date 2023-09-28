using DataCorner.DataAccess.interfaces;
using DataCorner.DataAccess.Interfaces;
using DataCorner.Models;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Data;
using System.Threading.Tasks;

public class AddAssetDataAcess : IAddAssestDataAccess
{
    private readonly string _connectionString;

    public AddAssetDataAcess(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("ttdconnection");
    }

    public async Task<bool> InsertOrUpdateAssetAsync(AddAssets assetDetails)
    {
        try
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                var cmd = new MySqlCommand("InsertAssetDetails", connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("p_AssetId", assetDetails.AssetId);
                cmd.Parameters.AddWithValue("p_EmpId", assetDetails.EmpId);
                cmd.Parameters.AddWithValue("p_EmpName", assetDetails.EmpName);
                cmd.Parameters.AddWithValue("p_Location", assetDetails.Location);
                cmd.Parameters.AddWithValue("p_Make", assetDetails.Make);
                cmd.Parameters.AddWithValue("p_ModelNo", assetDetails.ModelNo);
                cmd.Parameters.AddWithValue("p_Issues", assetDetails.Issues);
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
