using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly DataContext _context;
        public DashboardRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DashboardDto>> GetDashboardData(int userId)
        {
            List<Inventory> items = new List<Inventory>();
            var responseList = new List<DashboardDto>();
            items = await _context.Inventories.Where(i => i.AppUserId == userId).ToListAsync();

            var response = new DashboardDto(){
                AppUserId = userId,
                Gender = "All",
                AgeRange = "All",
                AveragePrice = items.Average(i => i.ItemPrice),
                TotalCount = items.Sum(i => i.ItemCount)
            }; 
            responseList.Add(response); 

            response = new DashboardDto(){
                AppUserId = userId,
                Gender = "Boys",
                AgeRange = "All",
                AveragePrice = items.Where(i => i.Gender == "Boys").Average(i => i.ItemPrice),
                TotalCount = items.Where(i => i.Gender == "Boys").Sum(i => i.ItemCount)
            }; 
            responseList.Add(response);

            response = new DashboardDto(){
                AppUserId = userId,
                Gender = "Girls",
                AgeRange = "All",
                AveragePrice = items.Where(i => i.Gender == "Girls").Average(i => i.ItemPrice),
                TotalCount = items.Where(i => i.Gender == "Girls").Sum(i => i.ItemCount)
            };
            responseList.Add(response);

                response = new DashboardDto(){
                AppUserId = userId,
                Gender = "Either",
                AgeRange = "All",
                AveragePrice = items.Where(i => i.Gender == "Either").Average(i => i.ItemPrice),
                TotalCount = items.Where(i => i.Gender == "Either").Sum(i => i.ItemCount)
            };
            responseList.Add(response);

            response = new DashboardDto(){
                AppUserId = userId,
                Gender = "All",
                AgeRange = "2 - 4",
                AveragePrice = items.Where(i => i.AgeRange == "2 - 4").Average(i => i.ItemPrice),
                TotalCount = items.Where(i => i.AgeRange == "2 - 4").Sum(i => i.ItemCount)
            }; 
            responseList.Add(response);

                response = new DashboardDto(){
                AppUserId = userId,
                Gender = "All",
                AgeRange = "5 - 9",
                AveragePrice = items.Where(i => i.AgeRange == "5 - 9").Average(i => i.ItemPrice),
                TotalCount = items.Where(i => i.AgeRange == "5 - 9").Sum(i => i.ItemCount)
            };
            responseList.Add(response);

                response = new DashboardDto(){
                AppUserId = userId,
                Gender = "All",
                AgeRange = "10 - 14",
                AveragePrice = items.Where(i => i.AgeRange == "10 - 14").Average(i => i.ItemPrice),
                TotalCount = items.Where(i => i.AgeRange == "10 - 14").Sum(i => i.ItemCount)
            };
            responseList.Add(response);
            
            return responseList;
        }
    }
}