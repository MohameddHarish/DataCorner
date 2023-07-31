    using DataCorner.Models.Dto;
    using DataCorner.Services.interfaces;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    namespace DataCorner.Controllers
    {
        [Route("api/[controller]")]
        [ApiController]
        public class TraineeController : ControllerBase
        {
            private readonly ITraineeservice _traineeService;

            public TraineeController(ITraineeservice traineeService)
            {
                _traineeService = traineeService;
            }

            [HttpGet]
            public async Task<ActionResult<IEnumerable<TraineeDto>>> GetTrainees(string category, string search)
            {
                var trainees = await _traineeService.GetTraineesAsync(category, search);
                return Ok(trainees);
            }
        }
    }

