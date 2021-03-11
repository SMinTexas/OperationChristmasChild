using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IAccountRepository
    {
        Task<ActionResult<UserDto>> Register(RegisterDto registerDto);
        Task<ActionResult<UserDto>> Login(LoginDto loginDto);
    }
}