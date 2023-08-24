using System.Threading.Tasks;
using DataCorner.Models;
using DataCorner.Models.Dto;

namespace DataCorner.Services.interfaces
{
    public interface IAccountService
    {
        Task<Login?> AuthenticateUser(Login login);
        Task<IEnumerable<AccessDto>> GetAccessAsync();
    }
}
