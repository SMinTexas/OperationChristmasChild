using API.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IDashboardRepository
    {
        Task<IEnumerable<DashboardDto>> GetDashboardData(int userId); 
    }
}