using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class InventoriesController : BaseApiController
    {
        private readonly DataContext _context;
        public InventoriesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Inventory>>> GetInventories()
        {
            return await _context.Inventories.ToListAsync();
        }   

        
        [HttpPost("add")]
        public async Task<ActionResult<InventoryDto>> AddItem(InventoryDto inventoryDto)
        {
            var item = new Inventory
            {
                Item = inventoryDto.Item,
                ItemDescription = inventoryDto.ItemDescription,
                ItemPrice = inventoryDto.ItemPrice,
                ItemCount = inventoryDto.ItemCount,
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
                Item = item.Item,
                ItemDescription = inventoryDto.ItemDescription,
                ItemPrice = inventoryDto.ItemPrice,
                ItemCount = inventoryDto.ItemCount,
                BestPrice = inventoryDto.BestPrice,
                LastPurchasedDate = inventoryDto.LastPurchasedDate,
                Notes = inventoryDto.Notes,
                AppUserId = inventoryDto.AppUserId,
                ProductCategoryId = inventoryDto.ProductCategoryId
            };

        } 
    }
}