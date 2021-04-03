using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService)
        {
            _photoService = photoService;
            _mapper = mapper;
            _userRepository = userRepository;

        }

        [HttpGet]

        public async Task<ActionResult<IEnumerable<ConnectionDTO>>> GetUsers()
        {
            var users = await _userRepository.GetConnectionsAsync();

            return Ok(users);
        }


        [HttpGet("{username}", Name = "GetUser")]
        public async Task<ActionResult<ConnectionDTO>> GetUser(string username)
        {
            return await _userRepository.GetConnectionAsync(username);

        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(ConnectionUpdateDTO connectionUpdateDTO)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
            _mapper.Map(connectionUpdateDTO, user);
            _userRepository.Update(user);
            if (await _userRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Update has failed. Try again!");
        }

        [HttpPost("add-photo")]
   public async Task<ActionResult<PhotoDTO>> AddPhoto([FromForm]IFormFile file)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (user.Photos.Count == 0)
            {
                photo.IsMain = true;
            }

            user.Photos.Add(photo);

            if (await _userRepository.SaveAllAsync())
             {
                return CreatedAtRoute(
                    "GetUser", new {username = user.UserName}, _mapper.Map<PhotoDTO>(photo));
            }
            return BadRequest("Problem addding photo");
        }
    }
}