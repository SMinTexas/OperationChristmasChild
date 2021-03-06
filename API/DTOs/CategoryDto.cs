using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CategoryDto
    {
        public int ProductCategoryId { get; set; }
        [Required]
        public string Category { get; set; }
    }
}