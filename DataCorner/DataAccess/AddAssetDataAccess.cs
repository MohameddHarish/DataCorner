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
                cmd.Parameters.AddWithValue("p_AssetNo", assetDetails.AssetNo);
                //cmd.Parameters.AddWithValue("p_EmpId", assetDetails.EmpId);
                //cmd.Parameters.AddWithValue("p_EmpName", assetDetails.EmpName);
                cmd.Parameters.AddWithValue("p_Location", assetDetails.Location);
                cmd.Parameters.AddWithValue("p_Brand", assetDetails.Brand);
                cmd.Parameters.AddWithValue("p_ModelNo", assetDetails.ModelNo);
                cmd.Parameters.AddWithValue("p_Issues", assetDetails.Issues);
                cmd.Parameters.AddWithValue("p_AssetGroup", assetDetails.AssetGroup);
                cmd.Parameters.AddWithValue("p_AssetType", assetDetails.AssetType);
                cmd.Parameters.AddWithValue("p_Description", assetDetails.Description);
                cmd.Parameters.AddWithValue("p_AssetStatus", assetDetails.AssetStatus);
                cmd.Parameters.AddWithValue("p_SerialNo", assetDetails.SerialNo);
                cmd.Parameters.AddWithValue("p_PurchaseDate", assetDetails.PurchaseDate);
                cmd.Parameters.AddWithValue("p_InvoiceNo", assetDetails.InvoiceNo);
                cmd.Parameters.AddWithValue("p_OriginalValue", assetDetails.OriginalValue);
                cmd.Parameters.AddWithValue("p_CurrentValue", assetDetails.CurrentValue);
                cmd.Parameters.AddWithValue("p_Warranty", assetDetails.Warranty);
                cmd.Parameters.AddWithValue("p_Remarks", assetDetails.Remarks);
                await cmd.ExecuteNonQueryAsync();
            }

            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }
    public async Task<bool> DeleteAssetAsync(string assetNo)
    {
        try
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                var cmd = new MySqlCommand("DeleteAssetDetails", connection); // Change to your actual delete stored procedure name
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("p_AssetNo", assetNo);
                await cmd.ExecuteNonQueryAsync();
            }

            return true;
        }
        catch (Exception ex)
        {
            // Handle exceptions or log errors here.
            return false;
        }
    }
}
