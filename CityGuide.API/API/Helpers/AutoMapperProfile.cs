using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using API.Dtos;
using API.Models;

namespace API.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<City, CityForListDto>()
            .ForMember(dest=>dest.PhotoUrl,opt=>
            {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            })
            .ForMember(dest => dest.AddedDateOfPhoto, opt =>
            {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).DateAdded);
            });
            CreateMap<City, CityForDetailDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<PhotoForReturnDto, Photo>().ReverseMap();
        }
    }
}
