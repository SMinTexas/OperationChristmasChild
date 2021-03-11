using API.Data;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly IAccountRepository _accountRepository;
        private readonly IMapper _mapper;
        public AccountController(DataContext context, IAccountRepository accountRepository, IMapper mapper, ITokenService tokenService)
        {
            _mapper = mapper;
            _accountRepository = accountRepository;
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            return await _accountRepository.Register(registerDto);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            return await _accountRepository.Login(loginDto);
        }
    }
}