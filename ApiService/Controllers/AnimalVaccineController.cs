using ApiService.Interface;
using ApiService.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalVaccineController : ControllerBase
    {
        private readonly ICRDIntermediateModel<AnimalVaccine> _animalVaccine;

        public AnimalVaccineController(ICRDIntermediateModel<AnimalVaccine> animalVaccine)
        {
            _animalVaccine = animalVaccine;
        }

        // GET: api/<AnimalVaccineController>
        [HttpGet]
        public IEnumerable<AnimalVaccine> Get()
        {
            return _animalVaccine.GetList();
        }

        // GET api/<AnimalVaccineController>/5
        [HttpGet("{id}")]
        public IEnumerable<AnimalVaccine> Get(int animalsId)
        {
            return _animalVaccine.GetList(animalsId);
        }

        // POST api/<AnimalVaccineController>
        [HttpPost]
        public void Post(AnimalVaccine vaccine)
        {
            _animalVaccine.Add(vaccine);
        }

        // DELETE api/<AnimalVaccineController>/5
        [HttpDelete]
        public void Delete(AnimalVaccine vaccine)
        {
            _animalVaccine.Delete(vaccine);
        }
    }
}
