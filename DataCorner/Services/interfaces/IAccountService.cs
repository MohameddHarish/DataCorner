using System.Threading.Tasks;
using DataCorner.Models;

namespace DataCorner.Services.interfaces
{
    public interface IAccountService
    {
        Task<Login?> AuthenticateUser(Login login);
    }
}
