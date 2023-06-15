using ApiService.Interface;
using ApiService.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        private readonly ICRUD<Service> _services;

        public ServiceController(ICRUD<Service> services)
        {
            _services = services;
        }

        // GET: api/<ServiceController>
        [HttpGet]
        public IEnumerable<Service> Get()
        {
            return _services.GetList();
        }

        // GET api/<ServiceController>/5
        [HttpGet("{id}")]
        public Service Get(int id)
        {
            return _services.Get(id);
        }

        // POST api/<ServiceController>
        [HttpPost]
        public void Post(Service value)
        {
            _services.Add(value);
        }

        // PUT api/<ServiceController>/5
        [HttpPut("{id}")]
        public void Put(int id, Service value)
        {
            _services.Change(id, value);
        }

        // DELETE api/<ServiceController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _services.Delete(id);
        }
    }
}
