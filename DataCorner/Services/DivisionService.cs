using System.Collections.Generic;
using System.Threading.Tasks;
using DataCorner.DataAccess.interfaces;
using DataCorner.DataAccess.Interfaces;
using DataCorner.Models;
using DataCorner.Services.Interfaces;

namespace DataCorner.Services
{
    public class DivisionService : IDivisionService
    {
        private readonly IDivisionDataAccess _divisionDataAccess;

        public DivisionService(IDivisionDataAccess divisionDataAccess)
        {
            _divisionDataAccess = divisionDataAccess;
        }

        public async Task<IEnumerable<Division>> GetDivisionDetails(int flag = 1)
        {
            return await _divisionDataAccess.GetDivisionDetails(flag);
        }
    }
}
