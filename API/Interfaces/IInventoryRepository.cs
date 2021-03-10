using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IInventoryRepository
    {
        Task<IEnumerable<InventoryDto>> GetInventoryAsync(int userId);
        Task<ActionResult<InventoryDto>> GetItemAsync(int userId, int inventoryId);
        Task<ActionResult<InventoryDto>> AddItemAsync(InventoryDto inventoryDto);
        Task<ActionResult<InventoryDto>> UpdateItemAsync(int inventoryId, InventoryDto inventoryDto);
        Task<ActionResult<InventoryDto>> DeleteItemAsync(int inventoryId);
    }
}