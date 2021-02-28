using System;

namespace API.DTOs
{
    public class InventoryDto
    {
        public int InventoryId { get; set; }
        public string Item { get; set; }
        public string ItemDescription { get; set; }
        public float ItemPrice { get; set; }
        public int ItemCount { get; set; }
        public float BestPrice { get; set; }
        public DateTime LastPurchasedDate { get; set; }
        public string Notes { get; set; }
        public int AppUserId { get; set; }
        public int ProductCategoryId { get; set; }
        public int AgeId { get; set; }
        public int GenderId { get; set; }
    }
}