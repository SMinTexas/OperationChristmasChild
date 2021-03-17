using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class CategoriesController : BaseApiController
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;
        public CategoriesController(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _mapper = mapper;
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
            var categories = await _categoryRepository.GetCategoriesAsync();
            var categoriesToReturn = _mapper.Map<IEnumerable<CategoryDto>>(categories);
            return Ok(categoriesToReturn);
        }

        [HttpGet("{pc}")]
        public async Task<ActionResult<CategoryDto>> GetCategoryAsync(string pc)
        {
            var category = await _categoryRepository.GetCategoryByNameAsync(pc);
            return _mapper.Map<CategoryDto>(category);
        }

        [HttpPost("add")]
        public async Task<ActionResult<CategoryDto>> AddCategory(CategoryDto categoryDto)
        {
            return await _categoryRepository.AddCategoryAsync(categoryDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<CategoryDto>> EditCategory(int id, CategoryDto categoryDto)
        {
            return await _categoryRepository.EditCategoryAsync(id, categoryDto);
        }
    }
}