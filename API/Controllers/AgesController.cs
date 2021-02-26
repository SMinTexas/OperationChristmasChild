using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class AgesController : BaseApiController
    {
        private readonly DataContext _context;
        public AgesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Age>>> GetAges()
        {
            return await _context.Ages.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Age>> GetAge(int id)
        {
            return await _context.Ages.FindAsync(id);
        }
    }
}