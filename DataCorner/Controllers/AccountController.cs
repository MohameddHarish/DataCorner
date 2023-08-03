using DataCorner.Models;
using DataCorner.Services.interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DataCorner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(Login login)
        {
            var result = await _accountService.AuthenticateUser(login);

            if (result != null)
            {
                return Ok(result);
            }

            return Unauthorized();
        }
    }
}
