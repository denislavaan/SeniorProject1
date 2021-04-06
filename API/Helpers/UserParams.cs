namespace API.Helpers
{
    public class UserParams : PaginationParams
    {
    public string CurrentUsername { get; set; }
    public string Gender { get; set; }
    public int MinAge { get; set; } = 13;
    public int MaxAge { get; set; } = 80;  
    public string OrderBy {get; set; } = "lastActive";

    }
}