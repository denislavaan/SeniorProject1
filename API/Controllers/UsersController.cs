using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.Helpers;
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

        public async Task<ActionResult<IEnumerable<ConnectionDTO>>> GetUsers([FromQuery]UserParams userParams) 
        {
            //to include interested in as well
           var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
           userParams.CurrentUsername = user.UserName;
           if (string.IsNullOrEmpty(userParams.Gender))
           userParams.Gender = user.Gender == "female" ? "female" : "male";

            var users = await _userRepository.GetConnectionsAsync(userParams);
                //now the users variiable is now a paged list of type connection dto 
            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
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
        public async Task<ActionResult<PhotoDTO>> AddPhoto([FromForm] IFormFile file)
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
                    "GetUser", new { username = user.UserName }, _mapper.Map<PhotoDTO>(photo));
            }
            return BadRequest("There was a problem with adding your photo. Please try again");
        }

        [HttpPut]
        [Route("set-profile-photo/{photoId}")]
        public async Task<ActionResult> SetProfilePhoto(int photoId)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
            var photo = user.Photos.FirstOrDefault(p => p.Id == photoId);
            if (photo.IsMain) return BadRequest("This is already your profile photo!");
            var currentMain = user.Photos.FirstOrDefault(photo => photo.IsMain);
            if (currentMain != null) currentMain.IsMain = false;
            photo.IsMain = true;

            if (await _userRepository.SaveAllAsync()) return NoContent();
            return BadRequest("There was a problem setting up this photo");
        }

        [HttpDelete]
        [Route("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
            var photo = user.Photos.FirstOrDefault(p => p.Id == photoId);

            if (photo == null) return NotFound();    //if the photo is not existing, then - not found 
            if (photo.IsMain) return BadRequest("Please first choose another main photo!"); //the user should not be able to delete its main photo before first selecting his new main photo
            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }         // to check if we have the public id for this photo first and then delete the photo //if there's a problem with deleting it, then we'll notify the user 

            user.Photos.Remove(photo);
            if (await _userRepository.SaveAllAsync()) return Ok();
            return BadRequest("There was a problem deleting your photo");
        }

    }
}
