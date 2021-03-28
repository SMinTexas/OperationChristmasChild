using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class DashboardController : BaseApiController
    {
        private readonly IDashboardRepository _dashboardRepository;
        public DashboardController(IDashboardRepository dashboardRepository)
        {
            _dashboardRepository = dashboardRepository;
        }

        [HttpGet("{userId}")]
        public  async Task<IEnumerable<DashboardDto>> GetDashboardData(int userId)
        {
            return await _dashboardRepository.GetDashboardData(userId);
        }
    }
}