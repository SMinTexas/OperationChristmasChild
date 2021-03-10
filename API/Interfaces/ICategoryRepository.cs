using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface ICategoryRepository 
    {
        Task<IEnumerable<ProductCategory>> GetCategoriesAsync();
        Task<ProductCategory> GetCategoryByIdAsync(int productCategoryId);
        Task<ActionResult<CategoryDto>> AddCategoryAsync(CategoryDto categoryDto);
    }
}