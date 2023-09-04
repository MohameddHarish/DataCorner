using DataCorner.DataAccess.interfaces;
using DataCorner.Models;
using DataCorner.Services.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DataCorner.Services
{
    public class AccessService : IAccessService
    {
        private readonly IAccessDataAccess _dataAccess;

        public AccessService(IAccessDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        public async Task<bool> UpdateAccessMasterAsync(int roleId, AccessModel accessModel)
        {
            return await _dataAccess.UpdateAccessMasterAsync(roleId, accessModel);
        }
    }
}
