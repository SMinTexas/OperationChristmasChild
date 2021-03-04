using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

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

        [HttpGet("{id}")]  
        //THIS ONE RETURNS A 404 EVEN THOUGH THE ROUTE WORKS
        // public async static Task<ActionResult<IEnumerable<Inventory>>> GetUserInventoryList(DataContext context, int id)
        // {
        //     Console.WriteLine("HOWDY AGGIES");
        //     var query = context.Inventories as IQueryable<Inventory>;
        //     query = query.Where(x => x.AppUserId == id);
        //     return await query.ToListAsync();
        // }

        //THIS ONE DOES NOT COMPILE AS CURRENTLY WRITTEN
        // public async Task<ActionResult<Inventory>> GetUserInventory(int id)
        // {
        //     return await _context.Inventories
        //         .FromSqlRaw("SELECT * FROM dbo.Inventories WHERE AppUserId = {0}", id)
        //         .ToListAsync();
        // }    

        //THIS IS THE ONE THAT WORKS IN TERMS OF NOT GENERATING A 404 BUT DATA RETURNED IS NOT WHAT IS NEEDED 
        public async Task<ActionResult<Inventory>> GetUserInventory(int id)
        {
            Console.WriteLine("GIG EM");
            return await _context.Inventories.FindAsync(id);
        }

                //     return _context.Inventories
                // .FromSqlRaw("SELECT * FROM dbo.Inventories WHERE AppUserId = {0}" , id)
                // .ToListAsync();

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