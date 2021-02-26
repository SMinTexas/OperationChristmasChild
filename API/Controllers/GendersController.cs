using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class GendersController : BaseApiController
    {
        private readonly DataContext _context;
        public GendersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gender>>> GetGenders()
        {
            return await _context.Genders.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Gender>> GetGender(int id)
        {
            return await _context.Genders.FindAsync(id);
        }
    }
}