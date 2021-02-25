using System;

namespace API.Entities
{
    public class Inventory
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
        public AppUser AppUser { get; set; }
        public int ProductCategoryId { get; set; }
        public ProductCategory ProductCategory { get; set; }
        public int AgeId { get; set; }
        public Age Age { get; set; }
        public int GenderId { get; set; }
        public Gender Gender { get; set; }
    }
}