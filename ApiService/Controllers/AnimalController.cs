using ApiService.Interface;
using ApiService.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalController : ControllerBase
    {
        private readonly ICRUD<Animal> _animals;

        public AnimalController(ICRUD<Animal> animals)
        {
            _animals = animals;
        }

        // GET: api/<AnimalController>
        [HttpGet]
        public IEnumerable<Animal> Get()
        {
            return _animals.GetList();
        }

        // GET api/<AnimalController>/5
        [HttpGet("{id}")]
        public Animal Get(int id)
        {
            return _animals.Get(id);
        }

        // POST api/<AnimalController>
        [HttpPost]
        public void Post(Animal value)
        {
            _animals.Add(value);
        }

        // PUT api/<AnimalController>/5
        [HttpPut("{id}")]
        public void Put(int id, Animal value)
        {
            _animals.Change(id, value);
        }

        // DELETE api/<AnimalController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _animals.Delete(id);
        }
    }
}
