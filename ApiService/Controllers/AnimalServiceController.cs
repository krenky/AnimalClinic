using ApiService.Interface;
using ApiService.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalServiceController : ControllerBase
    {
        private readonly ICRDIntermediateModel<AnimalService> _animalService;

        public AnimalServiceController(ICRDIntermediateModel<AnimalService> animalService)
        {
            _animalService = animalService;
        }

        // GET: api/<AnimalServiceController>
        [HttpGet]
        public IEnumerable<AnimalService> Get()
        {
            return _animalService.GetList();
        }

        // GET api/<AnimalServiceController>/5
        [HttpGet("{id}")]
        public IEnumerable<AnimalService> Get(int animalsId)
        {
            return _animalService.GetList(animalsId);
        }

        // POST api/<AnimalServiceController>
        [HttpPost]
        public void Post(AnimalService value)
        {
            _animalService.Add(value);
        }

        // DELETE api/<AnimalServiceController>/5
        [HttpDelete]
        public void Delete(AnimalService service)
        {
            _animalService.Delete(service);
        }
    }
}
