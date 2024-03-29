using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<ConnectionDTO> GetConnectionAsync(string username)
        {
            return await _context.Users
            .Where(x => x.UserName == username)
            .ProjectTo<ConnectionDTO>(_mapper.ConfigurationProvider) //so it can go and get the configuration, I've provided in the AutomapperProfiles
            .SingleOrDefaultAsync();
        }

        public async Task<PagedList<ConnectionDTO>> GetConnectionsAsync(UserParams userParams)
        {
            var query = _context.Users.AsQueryable();
               
            query = query.Where(u => u.UserName != userParams.CurrentUsername);
            query = query.Where(u => u.Gender == userParams.Gender);
            var minBirth = DateTime.Today.AddYears(-userParams.MaxAge - 1);
            var maxBirth = DateTime.Today.AddYears(-userParams.MinAge);

            query = query.Where(u => u.Birthday >= minBirth && u.Birthday <= maxBirth);
            query = userParams.OrderBy switch {
                "created" => query.OrderByDescending(u => u.Created),
                _ => query.OrderByDescending(u => u.LastActive)
            };

            return await PagedList<ConnectionDTO>.CreateAsync(query.ProjectTo<ConnectionDTO>(_mapper
            .ConfigurationProvider).AsNoTracking(), 
            userParams.PageNumber, userParams.PageSize);
            //to include interested in as well
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.Include(p => p.Photos).SingleOrDefaultAsync(x => x.UserName == username);
            //this will include the related array of photos included in the response 
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
            .Include(p => p.Photos)
            .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
             // to inform the entity framework that the state has been modifiedd
        }
    }
}
       