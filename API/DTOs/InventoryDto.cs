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
        public string AgeRange { get; set; }
        public string Gender { get; set; }
        public decimal BestPrice { get; set; }
        public DateTime LastPurchasedDate { get; set; }
        public string Notes { get; set; }
        public int AppUserId { get; set; }
        public int ProductCategoryId { get; set; }
        public string Category { get; set; }
    }
}