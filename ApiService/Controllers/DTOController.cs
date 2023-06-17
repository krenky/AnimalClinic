using ApiService.Interface;
using ApiService.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ApiService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DTOController : ControllerBase
    {
        private readonly IDTOService _dtoService;

        public DTOController(IDTOService dtoService)
        {
            _dtoService = dtoService;
        }

        [HttpGet("/api/ownerdoctor")]
        public ArrayOwnerAndDoctor GetArrayOwnerAndDoctor()
        {
            return _dtoService.GetArrayOwnerAndDoctor();
        }
        [HttpGet("/api/vaccineservice")]
        public ArrayVaccineAndService GetArrayVaccineAndService()
        {
            return _dtoService.GetArrayVaccineAndService();
        }
    }
}
