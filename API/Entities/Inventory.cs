using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Inventory
    {
        public int InventoryId { get; set; }
        [Required]
        public string Item { get; set; }
        [Required]
        public string ItemDescription { get; set; }
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal ItemPrice { get; set; }
        [Required]
        public int ItemCount { get; set; }
        [Required]
        public string AgeRange { get; set; }
        [Required]
        public string Gender { get; set; }
        [Column(TypeName="decimal(18,2)")]
        public decimal BestPrice { get; set; }
        public DateTime LastPurchasedDate { get; set; }
        public string Notes { get; set; }
        public int AppUserId { get; set; }
        public int ProductCategoryId { get; set; }
    }

}