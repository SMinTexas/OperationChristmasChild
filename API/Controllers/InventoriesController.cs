using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class InventoriesController : BaseApiController
    {
        private readonly DataContext _context;
        public InventoriesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<InventoryDto>>> GetUserInventory(int userId)
        {
            List<InventoryDto> outItems = new List<InventoryDto>();
            List<Inventory> items = await _context.Inventories.Where(i => i.AppUserId == userId).ToListAsync();
            foreach (var item in items)
            {
                outItems.Add(new InventoryDto
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

            return outItems;
        }   

        [HttpGet("{userId}/{itemId}")]  
        public async Task<ActionResult<InventoryDto>> GetUserInventoryItem(int userId, int itemId)
        {
            Inventory item = await _context.Inventories.Where(i => i.InventoryId == itemId && i.AppUserId == userId).FirstOrDefaultAsync();
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

        [HttpPost("add")]
        //[Route("api/inventories")]
        public async Task<ActionResult<InventoryDto>> Add(InventoryDto inventoryDto)
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

        [HttpPut]
        //[Route("api/inventories/{id}")]
        public async Task<ActionResult<InventoryDto>> Update(int id, InventoryDto inventoryDto)
        {
            var item = new Inventory
            {
                InventoryId = id,
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

        //for illustration only; currently delete functionality is not included in the design
        [HttpDelete]
        //[Route("api/inventories/{id}")]
        public async Task<ActionResult<InventoryDto>> Delete(int id)
        {
            var item = await _context.Inventories.Where(i => i.InventoryId == id).FirstOrDefaultAsync();
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
    }
}