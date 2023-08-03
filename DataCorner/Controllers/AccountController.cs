using DataCorner.Models;
using DataCorner.Services.interfaces;
using DataCorner.Services.Interfaces;
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
                if (!string.IsNullOrEmpty(result.IsAdmin) && result.IsAdmin == "1")
                {
                    // Return a specific value for IsAdmin when it's equal to "1"
                    result.IsAdmin = "Admin"; // Change this to the desired value
                }

                return new ObjectResult(new { success = true, data = result, msg = "Login successful." });
            }
            else
            {
                return new ObjectResult(new { success = false, data = result, msg = "Invalid username or password." });
            }
        }
    }
}
