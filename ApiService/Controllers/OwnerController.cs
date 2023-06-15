using ApiService.Interface;
using ApiService.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OwnerController : ControllerBase
    {
        private readonly ICRUD<Owner> _owners;

        public OwnerController(ICRUD<Owner> owners)
        {
            _owners = owners;
        }

        // GET: api/<OwnerController>
        [HttpGet]
        public IEnumerable<Owner> Get()
        {
            return _owners.GetList();
        }

        // GET api/<OwnerController>/5
        [HttpGet("{id}")]
        public Owner Get(int id)
        {
            return _owners.Get(id);
        }

        // POST api/<OwnerController>
        [HttpPost]
        public void Post(Owner value)
        {
            _owners.Add(value);
        }

        // PUT api/<OwnerController>/5
        [HttpPut("{id}")]
        public void Put(int id, Owner value)
        {
            _owners.Change(id, value);
        }

        // DELETE api/<OwnerController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _owners.Delete(id);
        }
    }
}
