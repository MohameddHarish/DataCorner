using System;
using System.Threading.Tasks;
using DataCorner.DataAccess;
using DataCorner.DataAccess.interfaces;
using DataCorner.Models;
using DataCorner.Models.Dto;
using DataCorner.Services.interfaces;

namespace DataCorner.Services
{
    public class AccountService : IAccountService
    {
        private readonly IAccountDataAccess _accountDataAccess;

        public AccountService(IAccountDataAccess accountDataAccess)
        {
            _accountDataAccess = accountDataAccess;
        }

        public async Task<Login?> AuthenticateUser(Login login)
        {
            return await _accountDataAccess.AuthenticateUser(login);
        }
        public async Task<IEnumerable<AccessDto>> GetAccessAsync()
        {
            return await _accountDataAccess.GetAccessAsync();
        }
    }
}
