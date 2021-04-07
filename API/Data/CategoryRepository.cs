using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Data

{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DataContext _context;
        public CategoryRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<CategoryDto>> AddCategoryAsync(CategoryDto categoryDto)
        {
            if (await CategoryExists(categoryDto.Category))
            {
                var result = new BadRequestObjectResult("This category has already been entered.");
                return result;
            }

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

        public async Task<ActionResult<CategoryDto>> EditCategoryAsync(int productCategoryId, CategoryDto categoryDto)
        {
            var cat = new ProductCategory
            {
                ProductCategoryId = productCategoryId,
                Category = categoryDto.Category
            };

            _context.ProductCategories.Update(cat);    
            await _context.SaveChangesAsync();

            return new CategoryDto
            {
                ProductCategoryId = cat.ProductCategoryId,
                Category = cat.Category
            };
        }

        public async Task<IEnumerable<ProductCategory>> GetCategoriesAsync()
        {
            return await _context.ProductCategories.ToListAsync();
        }

        public async Task<ProductCategory> GetCategoryByNameAsync(string productCategory)
        {
            return await _context.ProductCategories.FirstOrDefaultAsync(pc => pc.Category == productCategory);
        }

        public void Update(ProductCategory category)
        {
            _context.Entry(category).State = EntityState.Modified;
        }   
         
        private async Task<bool> CategoryExists(string category)
        {
            return await _context.ProductCategories.AnyAsync(x => x.Category == category);
        }                  
    }
}