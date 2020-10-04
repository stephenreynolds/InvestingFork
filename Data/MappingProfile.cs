using AutoMapper;
using InvestingOak.Models;
using InvestingOak.Data.Entities;

namespace InvestingOak.Data
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Project, ProjectDescModel>()
                .ForMember(p => p.Name, ex => ex.MapFrom(p => p.Name))
                .ForMember(p => p.Description, ex => ex.MapFrom(p => p.Description))
                .ForMember(p => p.Balance, ex => ex.MapFrom(p => p.Balance))
                .ReverseMap();
        }
    }
}
