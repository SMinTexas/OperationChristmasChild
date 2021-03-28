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

            //All gender and age range possibilities
            var response = new DashboardDto(){
                AppUserId = userId,
                Gender = "All",
                AgeRange = "All",
                AveragePrice = items?.Average(i => i?.ItemPrice),
                TotalCount = items?.Sum(i => i?.ItemCount)
            }; 
            responseList.Add(response);

            //Boys 2-4
            response = new DashboardDto(){
                AppUserId = userId,
                Gender = "Boys",
                AgeRange = "2 - 4",
                AveragePrice = items?.Where(i => i?.Gender == "Boys" && i?.AgeRange == "2 - 4")?.Average(i => i?.ItemPrice),
                TotalCount = items?.Where(i => i?.Gender == "Boys" && i?.AgeRange == "2 - 4")?.Sum(i => i?.ItemCount)
            }; 
            responseList.Add(response);

            //Boys 5-9
            response = new DashboardDto(){
                AppUserId = userId,
                Gender = "Boys",
                AgeRange = "5 - 9",
                AveragePrice = items?.Where(i => i?.Gender == "Boys" && i?.AgeRange == "5 - 9")?.Average(i => i?.ItemPrice),
                TotalCount = items?.Where(i => i?.Gender == "Boys" && i?.AgeRange == "5 - 9")?.Sum(i => i?.ItemCount)
            }; 
            responseList.Add(response);

            //Boys 10-14
            response = new DashboardDto(){
                AppUserId = userId,
                Gender = "Boys",
                AgeRange = "10 - 14",
                AveragePrice = items?.Where(i => i?.Gender == "Boys" && i?.AgeRange == "10 - 14")?.Average(i => i?.ItemPrice),
                TotalCount = items?.Where(i => i?.Gender == "Boys" && i?.AgeRange == "10 - 14")?.Sum(i => i?.ItemCount)
            };
            responseList.Add(response);

            //Girls 2-4
            response = new DashboardDto(){
                AppUserId = userId,
                Gender = "Girls",
                AgeRange = "2 - 4",
                AveragePrice = items?.Where(i => i?.Gender == "Girls" && i?.AgeRange == "2 - 4")?.Average(i => i?.ItemPrice),
                TotalCount = items?.Where(i => i?.Gender == "Girls" && i?.AgeRange == "2 - 4")?.Sum(i => i?.ItemCount)
            };
            responseList.Add(response);

            //Girls 5-9
            response = new DashboardDto(){
                AppUserId = userId,
                Gender = "Girls",
                AgeRange = "5 - 9",
                AveragePrice = items?.Where(i => i?.Gender == "Girls" && i?.AgeRange == "5 - 9")?.Average(i => i?.ItemPrice),
                TotalCount = items?.Where(i => i?.Gender == "Girls" && i?.AgeRange == "5 - 9")?.Sum(i => i?.ItemCount)
            };
            responseList.Add(response);

            //Girls 10-14
            response = new DashboardDto(){
                AppUserId = userId,
                Gender = "Girls",
                AgeRange = "10 - 14",
                AveragePrice = items?.Where(i => i?.Gender == "Girls" && i?.AgeRange == "10 - 14")?.Average(i => i?.ItemPrice),
                TotalCount = items?.Where(i => i?.Gender == "Girls" && i?.AgeRange == "10 - 14")?.Sum(i => i?.ItemCount)
            };
            responseList.Add(response);

            //Either 2-4
            response = new DashboardDto(){
                AppUserId = userId,
                Gender = "Either",
                AgeRange = "2 - 4",
                AveragePrice = items?.Where(i => i?.Gender == "Either" && i?.AgeRange == "2 - 4")?.Average(i => i?.ItemPrice),
                TotalCount = items?.Where(i => i?.Gender == "Either" && i?.AgeRange == "2 - 4")?.Sum(i => i?.ItemCount)
            };
            responseList.Add(response);

            //Either 5-9
            response = new DashboardDto(){
                AppUserId = userId,
                Gender = "Either",
                AgeRange = "5 - 9",
                AveragePrice = items?.Where(i => i?.Gender == "Either" && i?.AgeRange == "5 - 9")?.Average(i => i?.ItemPrice),
                TotalCount = items?.Where(i => i?.Gender == "Either" && i?.AgeRange == "5 - 9")?.Sum(i => i?.ItemCount)
            };
            responseList.Add(response);

            //Either 10-14
            response = new DashboardDto(){
                AppUserId = userId,
                Gender = "Either",
                AgeRange = "10 - 14",
                AveragePrice = items?.Where(i => i?.Gender == "Either" && i?.AgeRange == "10 - 14")?.Average(i => i?.ItemPrice),
                TotalCount = items?.Where(i => i?.Gender == "Either" && i?.AgeRange == "10 - 14")?.Sum(i => i?.ItemCount)
            };
            responseList.Add(response);            

            return responseList;
        }
    }
}