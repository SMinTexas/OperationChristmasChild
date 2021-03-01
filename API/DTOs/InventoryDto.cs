using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Entities;

namespace API.DTOs
{
    public class InventoryDto
    {
        public int InventoryId { get; set; }
        [Required]
        public string Item { get; set; }
        [Required]
        public string ItemDescription { get; set; }
        [Required]
        public decimal ItemPrice { get; set; }
        [Required]
        public int ItemCount { get; set; }
        public decimal BestPrice { get; set; }
        public DateTime LastPurchasedDate { get; set; }
        public string Notes { get; set; }
        [ForeignKey("AppUserId")]
        public int AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        [ForeignKey("ProductCategoryId")]
        public int ProductCategoryId { get; set; }
        public virtual ProductCategory ProductCategory { get; set; }
    }
}