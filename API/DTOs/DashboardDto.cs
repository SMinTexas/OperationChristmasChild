using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class DashboardDto
    {
        public int AppUserId { get; set; }
        public string Gender { get; set; }
        public string AgeRange { get; set; }
        public decimal AveragePrice { get; set; }
        public int TotalCount { get; set; }
    }
}