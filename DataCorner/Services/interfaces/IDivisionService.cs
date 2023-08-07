using System.Collections.Generic;
using System.Threading.Tasks;
using DataCorner.Models;

namespace DataCorner.Services.Interfaces
{
    public interface IDivisionService
    {
        Task<IEnumerable<Division>> GetDivisionDetails(int flag = 1);
    }
}
