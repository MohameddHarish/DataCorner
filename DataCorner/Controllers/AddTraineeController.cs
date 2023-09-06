using System.Threading.Tasks;
using DataCorner.Models;
using DataCorner.Models.Dto;
using DataCorner.Services;
using DataCorner.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DataCorner.Controllers
{
    [ApiController]
    [Route("api/trainee")]
    public class AddTraineeController : ControllerBase
    {
        private readonly IAddTraineeService _addTraineeService;

        public AddTraineeController(IAddTraineeService addTraineeService)
        {
            _addTraineeService = addTraineeService;
        }

        [HttpPost]
        public async Task<IActionResult> InsertTraineeDetails(AddTraineesDto traineeDetails)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _addTraineeService.InsertTraineeDetails(traineeDetails);
            return Ok(result);
        }
        [HttpGet("{flag}")]
        public async Task<IActionResult> GetDropdownValues(int flag)
        {
            List<IDropdownOption> dropdownOptions = await _addTraineeService.GetDropdownValuesAsync(flag);
            return Ok(dropdownOptions);
        }
        [HttpGet("GetProjectHistory/{id}")]
        public async Task<IActionResult> GetProjectHistory(int id)
        {
            var divisionDetails = await _addTraineeService.GetProjectHistory(id);
            return Ok(divisionDetails);
        }

    }

}
