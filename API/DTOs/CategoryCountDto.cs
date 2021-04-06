namespace API.DTOs
{
    public class CategoryCountDto
    {
        public int ProductCategoryId { get; set; }
        public string Category { get; set; }
        public int TotalCount { get; set; }
    }
}