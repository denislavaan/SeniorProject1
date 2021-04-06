using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class RecommendationsController : BaseController
    {
        private readonly IUserRepository _userRepository;
        private readonly IRecommendationsRepository _recommendationsRepository;
        public RecommendationsController(IUserRepository userRepository, IRecommendationsRepository recommendationsRepository)
        {
            _recommendationsRepository = recommendationsRepository;
            _userRepository = userRepository;
        }

        [HttpPost("{username}")]
        public async Task<ActionResult> AddRecommend(string username)
        {
            var sourceUserId = User.GetUserId();
            var recommendedUser = await _userRepository.GetUserByUsernameAsync(username);
            var sourceUser = await _recommendationsRepository.GetUserWithRecommendations(sourceUserId);

            if (recommendedUser == null) return NotFound();

            if (sourceUser.UserName == username) return BadRequest("You cannot recommend yourself");

            var userRecommend = await _recommendationsRepository.GetUserRecommend(sourceUserId, recommendedUser.Id);

            if (userRecommend != null) return BadRequest("You already recommended this user");

            userRecommend = new UserRecommend
            {
                SourceUserId = sourceUserId,
                RecommendedUserId = recommendedUser.Id
            };

            sourceUser.RecommendedUsers.Add(userRecommend);

            if (await _userRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to like user");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecommendDTO>>> GetUserRecommendations([FromQuery]RecommendationsParams recommendationsParams)
        {
            recommendationsParams.UserId = User.GetUserId();
            var users = await _recommendationsRepository.GetUserRecommendations(recommendationsParams);
            
            Response.AddPaginationHeader(users.CurrentPage, users.PageSize,
                 users.TotalCount, users.TotalPages);
                 
            return Ok(users);
        }
    }
}
