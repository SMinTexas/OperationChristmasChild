using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class AppUser
    {
        [Required]
        public int AppUserId { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string EMail { get; set; }
        [Required]
        public byte[] PasswordHash { get; set; }
        [Required]
        public byte[] PasswordSalt { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime UpdatedDate { get; set; } = DateTime.Now;
    }
}