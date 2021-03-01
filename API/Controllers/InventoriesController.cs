using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class InventoriesController : BaseApiController
    {
        private readonly DataContext _context;
        public InventoriesController(DataContext context)
        {
            _context = context;
        }


        // [HttpGet]
        // public async Task<ActionResult<IEnumerable<Inventory>>> GetInventories()
        // {
        //     return await _context.Inventories.ToListAsync();
        // }        
    }
}