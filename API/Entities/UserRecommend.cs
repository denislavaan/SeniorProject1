namespace API.Entities
{
    public class UserRecommend
    {
       public AppUser SourceUser { get; set; } 
       public int SourceUserId { get; set; }

       public AppUser RecommendedUser { get; set; }
       public int RecommendedUserId { get; set; }
    }
}