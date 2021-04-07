using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
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

        [HttpPost("add")]
        //[Route("api/inventories")]
        public async Task<ActionResult<InventoryDto>> Add(InventoryDto inventoryDto)
        {
            return await _inventoryRepository.AddItemAsync(inventoryDto);
        }

        [HttpPut("{id}")]
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