using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class RecommendationsRepository : IRecommendationsRepository
    {
        private readonly DataContext _context;
        public RecommendationsRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<UserRecommend> GetUserRecommend(int sourceUserId, int recommendedUserId)
        {
           return await _context.Recommendations.FindAsync(sourceUserId, recommendedUserId);
        }

        public async Task<PagedList<RecommendDTO>> GetUserRecommendations(RecommendationsParams recommendationsParams)
        {
            var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();
            var recommendations = _context.Recommendations.AsQueryable();

            if (recommendationsParams.Predicate == "recommended") {
                recommendations = recommendations.Where(recommend => recommend.SourceUserId == recommendationsParams.UserId);
                users = recommendations.Select(recommend => recommend.RecommendedUser);
            }

            if (recommendationsParams.Predicate == "recommendedBy") {
                 recommendations = recommendations.Where(recommend => recommend.RecommendedUserId == recommendationsParams.UserId);
                users = recommendations.Select(recommend => recommend.SourceUser); //list of users that have recommended the currently logged in user 
            }
            var RecommendedUsers = users.Select(user => new RecommendDTO {
                Username = user.UserName,
                Nickname = user.Nickname,
                Age = user.Birthday.CalculateAge(),
                PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain).Url,
                InterestedIn = user.InterestedIn,
                Id = user.Id
            });
            return await PagedList<RecommendDTO>.CreateAsync(RecommendedUsers, 
            recommendationsParams.PageNumber, recommendationsParams.PageSize);
        }

        public async Task<AppUser> GetUserWithRecommendations(int userId)
        {
            return await _context.Users.Include(x => x.RecommendedUsers)
            .FirstOrDefaultAsync(x => x.Id == userId);
        }
    }
}