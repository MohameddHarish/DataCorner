using DataCorner.Models;
using DataCorner.Models.Dto;
using System.Threading.Tasks;

namespace DataCorner.DataAccess.interfaces
{
    public interface IAccountDataAccess
    {
        Task<Login?> AuthenticateUser(Login login);
        Task<IEnumerable<AccessDto>> GetAccessAsync();
    }
}
