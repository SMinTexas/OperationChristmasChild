using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class UserInventoryDto
    {
        public int AppUserId { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string EMail { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime UpdatedDate { get; set; } = DateTime.Now;
        public virtual ICollection<InventoryDto> Inventories {get; set;}

    }
}