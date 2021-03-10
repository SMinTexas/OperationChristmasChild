using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class InventoryRepository : IInventoryRepository
    {
        private readonly DataContext _context;
        public InventoryRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<InventoryDto>> AddItemAsync(InventoryDto inventoryDto)
        {
            var item = new Inventory
            {
                Item = inventoryDto.Item,
                ItemDescription = inventoryDto.ItemDescription,
                ItemPrice = inventoryDto.ItemPrice,
                ItemCount = inventoryDto.ItemCount,
                AgeRange = inventoryDto.AgeRange,
                Gender = inventoryDto.Gender,
                BestPrice = inventoryDto.BestPrice,
                LastPurchasedDate = inventoryDto.LastPurchasedDate,
                Notes = inventoryDto.Notes,
                AppUserId = inventoryDto.AppUserId,
                ProductCategoryId = inventoryDto.ProductCategoryId
            };

            _context.Inventories.Add(item);
            await _context.SaveChangesAsync();

            return new InventoryDto
            {
                InventoryId = item.InventoryId,
                Item = item.Item,
                ItemDescription = inventoryDto.ItemDescription,
                ItemPrice = inventoryDto.ItemPrice,
                ItemCount = inventoryDto.ItemCount,
                AgeRange = inventoryDto.AgeRange,
                Gender = inventoryDto.Gender,
                BestPrice = inventoryDto.BestPrice,
                LastPurchasedDate = inventoryDto.LastPurchasedDate,
                Notes = inventoryDto.Notes,
                AppUserId = inventoryDto.AppUserId,
                ProductCategoryId = inventoryDto.ProductCategoryId
            };
        }

        public async Task<ActionResult<InventoryDto>> DeleteItemAsync(int inventoryId)
        {
            var item = await _context.Inventories.Where(i => i.InventoryId == inventoryId).FirstOrDefaultAsync();
            if (item != null)
            {
                _context.Inventories.Remove(item);
                await _context.SaveChangesAsync();
            }

            return new InventoryDto
            {
                InventoryId = item.InventoryId,
                Item = item.Item,
                ItemDescription = item.ItemDescription,
                ItemPrice = item.ItemPrice,
                ItemCount = item.ItemCount,
                AgeRange = item.AgeRange,
                Gender = item.Gender,
                BestPrice = item.BestPrice,
                LastPurchasedDate = item.LastPurchasedDate,
                Notes = item.Notes,
                AppUserId = item.AppUserId,
                ProductCategoryId = item.ProductCategoryId
            };
        }

        public async Task<IEnumerable<InventoryDto>> GetInventoryAsync(int userId)
        {
            List<InventoryDto> listItems = new List<InventoryDto>();
            List<Inventory> items = await _context.Inventories.Where(i => i.AppUserId == userId).ToListAsync();
            foreach (var item in items)
            {
                listItems.Add(new InventoryDto
                {
                    InventoryId = item.InventoryId,
                    Item = item.Item,
                    ItemDescription = item.ItemDescription,
                    ItemPrice = item.ItemPrice,
                    ItemCount = item.ItemCount,
                    AgeRange = item.AgeRange,
                    Gender = item.Gender,
                    BestPrice = item.BestPrice,
                    LastPurchasedDate = item.LastPurchasedDate,
                    Notes = item.Notes,
                    AppUserId = item.AppUserId,
                    ProductCategoryId = item.ProductCategoryId,
                    Category = (await _context.ProductCategories.Where(pc => pc.ProductCategoryId == item.ProductCategoryId).FirstOrDefaultAsync()).Category
                });
            }
            return listItems;
        }

        public async Task<ActionResult<InventoryDto>> GetItemAsync(int userId, int inventoryId)
        {
            Inventory item = await _context.Inventories.Where(i => i.InventoryId == inventoryId && i.AppUserId == userId).FirstOrDefaultAsync();
            return new InventoryDto
            {
                InventoryId = item.InventoryId,
                Item = item.Item,
                ItemDescription = item.ItemDescription,
                ItemPrice = item.ItemPrice,
                ItemCount = item.ItemCount,
                AgeRange = item.AgeRange,
                Gender = item.Gender,
                BestPrice = item.BestPrice,
                LastPurchasedDate = item.LastPurchasedDate,
                Notes = item.Notes,
                AppUserId = item.AppUserId,
                ProductCategoryId = item.ProductCategoryId,
                Category = (await _context.ProductCategories.Where(pc => pc.ProductCategoryId == item.ProductCategoryId).FirstOrDefaultAsync()).Category
            };            
        }

        public async Task<ActionResult<InventoryDto>> UpdateItemAsync(int inventoryId, InventoryDto inventoryDto)
        {
            var item = new Inventory
            {
                InventoryId = inventoryId,
                Item = inventoryDto.Item,
                ItemDescription = inventoryDto.ItemDescription,
                ItemPrice = inventoryDto.ItemPrice,
                ItemCount = inventoryDto.ItemCount,
                AgeRange = inventoryDto.AgeRange,
                Gender = inventoryDto.Gender,
                BestPrice = inventoryDto.BestPrice,
                LastPurchasedDate = inventoryDto.LastPurchasedDate,
                Notes = inventoryDto.Notes,
                AppUserId = inventoryDto.AppUserId,
                ProductCategoryId = inventoryDto.ProductCategoryId
            };

            _context.Inventories.Update(item);
            await _context.SaveChangesAsync();

            return new InventoryDto
            {
                InventoryId = item.InventoryId,
                Item = item.Item,
                ItemDescription = inventoryDto.ItemDescription,
                ItemPrice = inventoryDto.ItemPrice,
                ItemCount = inventoryDto.ItemCount,
                AgeRange = inventoryDto.AgeRange,
                Gender = inventoryDto.Gender,
                BestPrice = inventoryDto.BestPrice,
                LastPurchasedDate = inventoryDto.LastPurchasedDate,
                Notes = inventoryDto.Notes,
                AppUserId = inventoryDto.AppUserId,
                ProductCategoryId = inventoryDto.ProductCategoryId
            };
        }
    }
}