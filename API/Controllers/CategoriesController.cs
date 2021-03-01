using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class CategoriesController : BaseApiController
    {
        private readonly DataContext _context;
        public CategoriesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductCategory>>> GetCategories()
        {
            return await _context.ProductCategories.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductCategory>> GetCategory(int id)
        {
            return await _context.ProductCategories.FindAsync(id);
        }

        [HttpPost("add")]
        public async Task<ActionResult<CategoryDto>> AddCategory(CategoryDto categoryDto)
        {
            if (await CategoryExists(categoryDto.Category)) return BadRequest("This category has already been entered.");
            var cat = new ProductCategory
            {
                Category = categoryDto.Category
            };

            _context.ProductCategories.Add(cat);
            await _context.SaveChangesAsync();

            return new CategoryDto
            {
                Category = cat.Category
            };
        } 

        private async Task<bool> CategoryExists(string category)
        {
            return await _context.ProductCategories.AnyAsync(x => x.Category == category);
        }

    }
}