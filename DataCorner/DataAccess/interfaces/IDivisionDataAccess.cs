using System.Collections.Generic;
using System.Threading.Tasks;
using DataCorner.Models;

namespace DataCorner.DataAccess.interfaces
{
    public interface IDivisionDataAccess
    {
        Task<IEnumerable<Division>> GetDivisionDetails(int flag);
    }
}
