﻿using System.Collections.Generic;
using System.Threading.Tasks;
using DataCorner.Models;

namespace DataCorner.DataAccess.Interfaces
{
    public interface IAssetDetailsDataAccess
    {
        Task<IEnumerable<AddAssets>> GetAssetDetailsAsync(string assetNo, int flag);
    }
}
