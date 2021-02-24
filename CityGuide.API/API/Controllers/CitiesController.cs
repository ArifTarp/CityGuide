using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.BusinessAndDataAccess;
using API.Dtos;
using API.Models;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private IAppRepository _appRepository;
        private IMapper _mapper;
        public CitiesController(IAppRepository appRepository,IMapper mapper)
        {
            _appRepository = appRepository;
            _mapper = mapper;
        }

        public ActionResult GetCities()
        {
            var cities = _appRepository.GetCities();
            var returnToCities = _mapper.Map<List<CityForListDto>>(cities);
            return Ok(returnToCities);
        }

        [HttpGet]
        [Route("detail")]
        public ActionResult GetCityById(int cityId)
        {
            var city = _appRepository.GetCityById(cityId);
            var returnToCity = _mapper.Map<CityForDetailDto>(city);
            return Ok(returnToCity);
        }

        [HttpPost]
        [Route("add")]
        public ActionResult Add([FromBody]City city)
        {
            _appRepository.Add(city);
            _appRepository.SaveAll();
            return Ok(city);
        }

        [HttpGet]
        [Route("photos")]
        public ActionResult GetPhotosByCity(int cityId)
        {
            var photos = _appRepository.GetPhotosByCityId(cityId);
            return Ok(photos);
        }
    }
}