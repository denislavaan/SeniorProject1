using API.Entities;
using AutoMapper;
using API.DTO;
using System.Linq;
using API.Extensions;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, ConnectionDTO>() //mapping from the AppUser to the Connection 
                .ForMember(destination => destination.PhotoUrl, option => option.MapFrom(
                src => src.Photos.FirstOrDefault(photo => photo.IsMain).Url))
                .ForMember(destination => destination.Age, option => option.MapFrom(
                    src => src.Birthday.CalculateAge()));
      
            CreateMap<Photo, PhotoDTO>();
            CreateMap<ConnectionUpdateDTO, AppUser>();
        }
    }
}