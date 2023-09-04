using DataCorner.Models;
using Microsoft.AspNetCore.Mvc;

namespace DataCorner.DataAccess.interfaces
{
    public interface IAccessDataAccess
    {
        Task<bool> UpdateAccessMasterAsync(int roleId, AccessModel accessModel);
    }

}
