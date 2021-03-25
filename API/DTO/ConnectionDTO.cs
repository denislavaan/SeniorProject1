using System;
using System.Collections.Generic;

namespace API.DTO
{
    public class ConnectionDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PhotoUrl { get; set; }
        public int Age { get; set; }
        public string Nickname { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; } 
        public string Gender { get; set; }
        public string Bio { get; set; }
        public string LookingFor { get; set; } 
        public string InterestedIn { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public ICollection<PhotoDTO> Photos { get; set; } 

    }
}