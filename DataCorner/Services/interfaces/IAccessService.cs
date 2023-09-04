using DataCorner.Models;
using Microsoft.AspNetCore.Mvc;

namespace DataCorner.Services.interfaces
{
    public interface IAccessService
    {
        Task<bool> UpdateAccessMasterAsync(int roleId, AccessModel accessModel);
    }

}
