using API.Entities;
using AutoMapper;
using API.DTO;
using System.Linq;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, ConnectionDTO>() //mapping from the AppUser to the Connection 
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(
                src => src.Photos.FirstOrDefault(x => x.IsMain).Url));
                
        CreateMap<Photo, PhotoDTO>(); 
        
        }
    }
}