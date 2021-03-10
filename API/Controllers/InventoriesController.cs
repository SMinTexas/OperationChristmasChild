using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class InventoriesController : BaseApiController
    {
        private readonly IInventoryRepository _inventoryRepository;
        private readonly IMapper _mapper;
        public InventoriesController(IInventoryRepository inventoryRepository, IMapper mapper)
        {
            _mapper = mapper;
            _inventoryRepository = inventoryRepository;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<InventoryDto>>> GetUserInventory(int userId)
        {
            var inventory = await _inventoryRepository.GetInventoryAsync(userId);
            var inventoryToReturn = _mapper.Map<IEnumerable<InventoryDto>>(inventory);
            return Ok(inventoryToReturn);
        }

        [HttpGet("{userId}/{itemId}")]
        public async Task<ActionResult<InventoryDto>> GetUserInventoryItem(int userId, int itemId)
        {
            var inventory = await _inventoryRepository.GetItemAsync(userId, itemId);
            return _mapper.Map<InventoryDto>(inventory);
            //this is not functioning correctly
        }

        [HttpPost("add")]
        //[Route("api/inventories")]
        public async Task<ActionResult<InventoryDto>> Add(InventoryDto inventoryDto)
        {
            return await _inventoryRepository.AddItemAsync(inventoryDto);
        }

        [HttpPut]
        //[Route("api/inventories/{id}")]
        public async Task<ActionResult<InventoryDto>> Update(int id, InventoryDto inventoryDto)
        {
            return await _inventoryRepository.UpdateItemAsync(id, inventoryDto);
        }

        //for illustration only; currently delete functionality is not included in the design
        [HttpDelete]
        //[Route("api/inventories/{id}")]
        public async Task<ActionResult<InventoryDto>> Delete(int id)
        {
            return await _inventoryRepository.DeleteItemAsync(id);
        }
    }
}