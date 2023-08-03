using DataCorner.Models;
using System.Threading.Tasks;

namespace DataCorner.DataAccess.interfaces
{
    public interface IAccountDataAccess
    {
        Task<Login?> AuthenticateUser(Login login);
    }
}
