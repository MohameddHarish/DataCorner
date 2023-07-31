using System.Threading.Tasks;
using DataCorner.Models.Dto;
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

        [HttpPut]
        public async Task<IActionResult> UpdateTraineeDetails(AddTraineesDto traineeDetails)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _addTraineeService.UpdateTraineeDetails(traineeDetails);
            return Ok(result);
        }
    }

}
