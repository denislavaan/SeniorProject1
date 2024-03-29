using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
        {
        public static async Task SeedUsers(DataContext context) {
            if (await context.Users.AnyAsync()) return; //to check if we have any users

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json"); 
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData); //to deserialize whats inside of the user data above into an onject
            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();
                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Parola"));
                user.PasswordSalt = hmac.Key;
                context.Users.Add(user);
            }
        await context.SaveChangesAsync();
            
        }
    }

}