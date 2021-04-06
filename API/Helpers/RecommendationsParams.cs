namespace API.Helpers
{
    public class RecommendationsParams : PaginationParams
    {
        public int UserId { get; set; }
        public string Predicate { get; set; }
        
    }
}