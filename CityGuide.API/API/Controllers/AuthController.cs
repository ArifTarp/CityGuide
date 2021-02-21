using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using API.BusinessAndDataAccess;
using API.Dtos;
using API.Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IConfiguration _configuration;
        private IAuthRepository _authRepository;
        public AuthController(IConfiguration configuration, IAuthRepository authRepository)
        {
            _configuration = configuration;
            _authRepository = authRepository;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody]UserForRegisterDto userForRegisterDto)
        {
            if (await _authRepository.UserExists(userForRegisterDto.UserName))
            {
                ModelState.AddModelError("UserExists","User Name Already Exists");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createToUser = new User
            {
                UserName = userForRegisterDto.UserName
            };

            var createdUser = await _authRepository.Register(createToUser, userForRegisterDto.Password);

            return StatusCode(201);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody]UserForLoginDto userForLoginDto)
        {
            var user = await _authRepository.Login(userForLoginDto.UserName, userForLoginDto.Password);
            if (user == null)
            {
                return Unauthorized();
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration.GetSection("AppSettings:Token").Value);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                    new Claim(ClaimTypes.Name,user.UserName)
                }),
                Expires = DateTime.Now.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(tokenString);
        }
    }
}