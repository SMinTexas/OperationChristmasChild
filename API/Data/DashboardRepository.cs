using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Collections.Generic;
using System;
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
            List<ProductCategory> cats = new List<ProductCategory>();
            var responseList = new List<DashboardDto>();
            items = await _context.Inventories.Where(i => i.AppUserId == userId).ToListAsync();
            cats = await _context.ProductCategories.ToListAsync();

            //All gender and age range possibilities
            var response = new DashboardDto(){
                AppUserId = userId,
                Gender = "All",
                AgeRange = "All",
                AveragePrice = items?.Average(i => i?.ItemPrice),
                TotalCount = items?.Sum(i => i?.ItemCount),
                Categories = GetCategorySummary(items,cats)
            }; 
            responseList.Add(response);

            //Boys 2-4
            var itemsFiltered = items?.Where(i => i?.Gender == "Boys" && i?.AgeRange == "2 - 4");
            response = new DashboardDto(){
                AppUserId = userId,
                Gender = "Boys",
                AgeRange = "2 - 4",
                AveragePrice = itemsFiltered?.Average(i => i?.ItemPrice),
                TotalCount = itemsFiltered?.Sum(i => i?.ItemCount),
                Categories = GetCategorySummary(itemsFiltered.ToList(),cats)
            }; 
            responseList.Add(response);

            //Boys 5-9
            itemsFiltered = items?.Where(i => i?.Gender == "Boys" && i?.AgeRange == "5 - 9");
            response = new DashboardDto(){
                AppUserId = userId,
                Gender = "Boys",
                AgeRange = "5 - 9",
                AveragePrice = itemsFiltered?.Average(i => i?.ItemPrice),
                TotalCount = itemsFiltered?.Sum(i => i?.ItemCount),
                Categories = GetCategorySummary(itemsFiltered.ToList(),cats)
            }; 
            responseList.Add(response);

            //Boys 10-14
            itemsFiltered = items?.Where(i => i?.Gender == "Boys" && i?.AgeRange == "10 - 14");
            response = new DashboardDto(){
                AppUserId = userId,
                Gender = "Boys",
                AgeRange = "10 - 14",
                AveragePrice = itemsFiltered?.Average(i => i?.ItemPrice),
                TotalCount = itemsFiltered?.Sum(i => i?.ItemCount),
                Categories = GetCategorySummary(itemsFiltered.ToList(),cats)
            };
            responseList.Add(response);

            //Girls 2-4
            itemsFiltered = items?.Where(i => i?.Gender == "Girls" && i?.AgeRange == "2 - 4");
            response = new DashboardDto(){
                AppUserId = userId,
                Gender = "Girls",
                AgeRange = "2 - 4",
                AveragePrice = itemsFiltered?.Average(i => i?.ItemPrice),
                TotalCount = itemsFiltered?.Sum(i => i?.ItemCount),
                Categories = GetCategorySummary(itemsFiltered.ToList(),cats)
            };
            responseList.Add(response);

            //Girls 5-9
            itemsFiltered = items?.Where(i => i?.Gender == "Girls" && i?.AgeRange == "5 - 9");
            response = new DashboardDto(){
                AppUserId = userId,
                Gender = "Girls",
                AgeRange = "5 - 9",
                AveragePrice = itemsFiltered?.Average(i => i?.ItemPrice),
                TotalCount = itemsFiltered?.Sum(i => i?.ItemCount),
                Categories = GetCategorySummary(itemsFiltered.ToList(),cats)
            };
            responseList.Add(response);

            //Girls 10-14
            itemsFiltered = items?.Where(i => i?.Gender == "Girls" && i?.AgeRange == "10 - 14");
            response = new DashboardDto(){
                AppUserId = userId,
                Gender = "Girls",
                AgeRange = "10 - 14",
                AveragePrice = itemsFiltered?.Average(i => i?.ItemPrice),
                TotalCount = itemsFiltered?.Sum(i => i?.ItemCount),
                Categories = GetCategorySummary(itemsFiltered.ToList(),cats)
            };
            responseList.Add(response);

            //Either 2-4
            itemsFiltered = items?.Where(i => i?.Gender == "Either" && i?.AgeRange == "2 - 4");
            response = new DashboardDto(){
                AppUserId = userId,
                Gender = "Either",
                AgeRange = "2 - 4",
                AveragePrice = itemsFiltered?.Average(i => i?.ItemPrice),
                TotalCount = itemsFiltered?.Sum(i => i?.ItemCount),
                Categories = GetCategorySummary(itemsFiltered.ToList(),cats)
            };
            responseList.Add(response);

            //Either 5-9
            itemsFiltered = items?.Where(i => i?.Gender == "Either" && i?.AgeRange == "5 - 9");
            response = new DashboardDto(){
                AppUserId = userId,
                Gender = "Either",
                AgeRange = "5 - 9",
                AveragePrice = itemsFiltered?.Average(i => i?.ItemPrice),
                TotalCount = itemsFiltered?.Sum(i => i?.ItemCount),
                Categories = GetCategorySummary(itemsFiltered.ToList(),cats)
            };
            responseList.Add(response);

            //Either 10-14
            itemsFiltered = items?.Where(i => i?.Gender == "Either" && i?.AgeRange == "10 - 14");
            response = new DashboardDto(){
                AppUserId = userId,
                Gender = "Either",
                AgeRange = "10 - 14",
                AveragePrice = itemsFiltered?.Average(i => i?.ItemPrice),
                TotalCount = itemsFiltered?.Sum(i => i?.ItemCount),
                Categories = GetCategorySummary(itemsFiltered.ToList(),cats)
            };
            responseList.Add(response);            

            return responseList;
        }

        private List<CategoryCountDto> GetCategorySummary(List<Inventory> items, List<ProductCategory> cats)
        {
                // var Categories = from item in items
                //                  group item by item.ProductCategoryId into newGroup
                //                  orderby newGroup.Key
                //                  select new CategoryCountDto{ Category = newGroup.Key.ToString(), TotalCount = Sum()}
            // var Categories = items?.GroupBy(i => i.ProductCategoryId);
            var categorySummary = from i in items
                                  join c in cats on i.ProductCategoryId equals c.ProductCategoryId
                                  group i by new { i.ProductCategoryId, c.Category } into g
                                  select new CategoryCountDto
                                  {
                                      ProductCategoryId = g.Key.ProductCategoryId,
                                      Category = g.Key.Category,
                                      TotalCount = g.Sum(i => i.ItemCount)
                                  }; 

            return categorySummary.ToList();

        }
    }
}