
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
   
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<AppUser> Users { get; set; }
        public DbSet<UserRecommend> Recommendations { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder) {
            base.OnModelCreating(builder); 

            builder.Entity<UserRecommend>()
            .HasKey(k => new {k.SourceUserId, k.RecommendedUserId});
          
            builder.Entity<UserRecommend>() 
            .HasOne(s => s.SourceUser)
            .WithMany(r => r.RecommendedUsers) // source user can like many other users
            .HasForeignKey(s => s.SourceUserId) 
            .OnDelete(DeleteBehavior.Cascade); // if the user is deleted, the related entities will also disappear 

            builder.Entity<UserRecommend>() 
            .HasOne(s => s.RecommendedUser)
            .WithMany(r => r.RecommendedByUsers) 
            .HasForeignKey(s => s.RecommendedUserId) 
            .OnDelete(DeleteBehavior.Cascade); 

            builder.Entity<Message>()
                .HasOne(u => u.Receiver)
                .WithMany(m => m.MessagesReceived)
                .OnDelete(DeleteBehavior.Restrict); //so that the message cannot be removed if one of the users haven't deleted it as well

            builder.Entity<Message>()
                .HasOne(u => u.Sender)
                .WithMany(m => m.MessagesSent)
                .OnDelete(DeleteBehavior.Restrict);
      }
    }
}