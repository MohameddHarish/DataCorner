using System;
using System.Threading.Tasks;
using DataCorner.DataAccess.interfaces;
using DataCorner.Models;
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
    }
}
