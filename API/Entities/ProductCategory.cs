using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class ProductCategory
    {
        public int ProductCategoryId { get; set; }
        [Required]
        public string Category { get; set; }
    }
}