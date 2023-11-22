using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DataCorner.DataAccess.interfaces;
using DataCorner.DataAccess.Interfaces;
using DataCorner.Models;
using DataCorner.Models.Dto;
using DataCorner.Services.Interfaces;
using DataCorner.Services.Interfaces;

namespace DataCorner.Services
{
    public class AssetListService : IAssetListService
    {
        private readonly IAssetListDataAccess _assetListDataAccess;

        public AssetListService(IAssetListDataAccess assetListDataAccess)
        {
            _assetListDataAccess = assetListDataAccess;
        }

        public async Task<IEnumerable<AddAssets>> GetAssetListDetailsAsync(string AssetType)
        {
            try
            {
                return await _assetListDataAccess.GetAssetListDetailsAsync(AssetType);
            }
            catch (Exception ex)
            {
                // Log the exception
                throw; // You might want to handle or log the exception based on your application's needs
            }
        }
    }
}
