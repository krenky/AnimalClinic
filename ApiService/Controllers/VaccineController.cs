using ApiService.Interface;
using ApiService.Interface.Impl;
using ApiService.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VaccineController : ControllerBase
    {
        private readonly ICRUD<Vaccine> _vaccines;

        public VaccineController(ICRUD<Vaccine> vaccines)
        {
            _vaccines = vaccines;
        }

        // GET: api/<VaccineController>
        [HttpGet]
        public IEnumerable<Vaccine> Get()
        {
            return _vaccines.GetList();
        }

        // GET api/<VaccineController>/5
        [HttpGet("{id}")]
        public Vaccine Get(int id)
        {
            return _vaccines.Get(id);
        }

        // POST api/<VaccineController>
        [HttpPost]
        public void Post(Vaccine value)
        {
            _vaccines.Add(value);
        }

        // PUT api/<VaccineController>/5
        [HttpPut("{id}")]
        public void Put(int id, Vaccine value)
        {
            _vaccines.Change(id, value);
        }

        // DELETE api/<VaccineController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _vaccines.Delete(id);
        }
    }
}
