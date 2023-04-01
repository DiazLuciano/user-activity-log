using be_user_activity_log.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace be_user_activity_log.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public ActivityController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/<ActivityController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _dbContext.Actividades.ToListAsync());
        }

        // GET api/<ActivityController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var activities = await _dbContext.Actividades.Where(x => x.IdUsuario == id).ToListAsync();
            return Ok(activities);
        }

    }
}
