using System;
using System.Collections.Generic;
using API.Extensions;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }

        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        
        public DateTime Birthday { get; set; }
        public string Nickname { get; set; }
        public DateTime Created { get; set; } = DateTime.Now; //the date and time of their profile creation
        public DateTime LastActive { get; set; } = DateTime.Now; 
        public string Gender { get; set; }
        public string Bio { get; set; }
        
        public string LookingFor { get; set; } //what type of resources they need - HTML,CSS, etc.
        public string InterestedIn { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public ICollection<Photo> Photos { get; set; } // one to many relationship because one user can have many photos 
        
    }
}

