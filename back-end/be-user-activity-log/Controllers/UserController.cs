using be_user_activity_log.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace be_user_activity_log.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public UserController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/<UserController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _dbContext.Usuarios.ToListAsync());
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var user = await _dbContext.Usuarios.Where(x => x.Id == id).FirstOrDefaultAsync();
            return Ok(user);
        }

        // POST api/<UserController>
        [HttpPost]
        public async Task<IActionResult> Post(Usuario usuario)
        {
            try
            {
                _dbContext.Add(usuario);
                await _dbContext.SaveChangesAsync();

                var newUser = _dbContext.Usuarios.OrderByDescending(r => r.Id).FirstOrDefault();

                if (newUser != null)
                {
                    var activity = LogController.AddActivity(1, newUser.Id);
                    _dbContext.Add(activity);
                    await _dbContext.SaveChangesAsync();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Usuario usuario)
        {
            var user = _dbContext.Usuarios.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            user.Nombre = usuario.Nombre;
            user.Apellido = usuario.Apellido;
            user.Email = usuario.Email;
            user.FechaNacimiento = usuario.FechaNacimiento;
            user.PreguntaSobreContacto = usuario.PreguntaSobreContacto;
            user.Telefono = usuario.Telefono;
            user.PaisResidencia = usuario.PaisResidencia;

            var activity = LogController.AddActivity(2, id);
            _dbContext.Add(activity);

            await _dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var usuario = _dbContext.Usuarios.Find(id);
            if (usuario == null)
            {
                return NotFound();
            }
            // Baja logica 
            usuario.Estado = 0;

            var activity = LogController.AddActivity(3, id);
            _dbContext.Add(activity);

            await _dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
