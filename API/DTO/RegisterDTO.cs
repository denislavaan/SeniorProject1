using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class RegisterDTO
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Nickname { get; set; }
         [Required]
        public string Gender { get; set; }
         [Required]
        public DateTime Birthday { get; set; }
         [Required]
        public string City { get; set; }
         [Required]
        public string Country { get; set; }

        [Required]
        [StringLength(15, MinimumLength = 5)]
        public string Password { get; set; }
    }
}