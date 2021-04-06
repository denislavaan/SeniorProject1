namespace API.DTO
{
    public class UserDTO
    {
        public string UserName { get; set; }
        public string Token { get; set; }
        public string PhotoUrl { get; set; }
        public string Nickname { get; set; }
        public string Gender { get; set; }
    }
}
//The object we return when the user logs in (or registers)