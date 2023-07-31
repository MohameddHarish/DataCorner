using DataCorner.Models.Dto;
using DataCorner.Services.interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DataCorner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TraineeDetailsController : ControllerBase
    {
        private readonly ITraineeDetailsService _traineeDetailsService;

        public TraineeDetailsController(ITraineeDetailsService traineeDetailsService)
        {
            _traineeDetailsService = traineeDetailsService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<TraineeDetailsDto>>> GetTraineeDetails(int Id)
        {
            var traineeDetails = await _traineeDetailsService.GetTraineeDetailsAsync(Id);
            return Ok(traineeDetails);
        }
    }
}
