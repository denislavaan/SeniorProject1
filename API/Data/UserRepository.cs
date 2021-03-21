using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
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

        public async Task<IEnumerable<ConnectionDTO>> GetConnectionAsync()
        {
            return await _context.Users
            .ProjectTo<ConnectionDTO>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
            .Include(p => p.Photos)
            .SingleOrDefaultAsync(x => x.UserName == username);
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
        }

        Task<IEnumerable<ConnectionDTO>> IUserRepository.GetConnectionAsync()
        {
            throw new System.NotImplementedException();
        }

        Task<ConnectionDTO> IUserRepository.GetConnectionAsync(string username)
        {
            throw new System.NotImplementedException();
        }

        Task<AppUser> IUserRepository.GetUserByIdAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        Task<AppUser> IUserRepository.GetUserByUsernameAsync(string username)
        {
            throw new System.NotImplementedException();
        }

        Task<IEnumerable<AppUser>> IUserRepository.GetUsersAsync()
        {
            throw new System.NotImplementedException();
        }

        Task<bool> IUserRepository.SaveAllAsync()
        {
            throw new System.NotImplementedException();
        }

        void IUserRepository.Update(AppUser user)
        {
            throw new System.NotImplementedException();
        }
    }
}