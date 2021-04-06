using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IRecommendationsRepository
    {
        Task<UserRecommend> GetUserRecommend(int sourceUserId, int recommendedUserId);
        Task<AppUser> GetUserWithRecommendations(int userId);
        Task<PagedList<RecommendDTO>> GetUserRecommendations(RecommendationsParams recommendationsParams);
        
    }
}