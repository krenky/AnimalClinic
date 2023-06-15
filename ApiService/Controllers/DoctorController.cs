using ApiService.Interface;
using ApiService.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly ICRUD<Doctor> _doctor;

        public DoctorController(ICRUD<Doctor> doctor)
        {
            _doctor = doctor;
        }

        // GET: api/<DoctorController>
        [HttpGet]
        public IEnumerable<Doctor> Get()
        {
            return _doctor.GetList();
        }

        // GET api/<DoctorController>/5
        [HttpGet("{id}")]
        public Doctor Get(int id)
        {
            return _doctor.Get(id);
        }

        // POST api/<DoctorController>
        [HttpPost]
        public void Post(Doctor value)
        {
            _doctor.Add(value);
        }

        // PUT api/<DoctorController>/5
        [HttpPut("{id}")]
        public void Put(int id, Doctor value)
        {
            _doctor.Change(id, value);
        }

        // DELETE api/<DoctorController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _doctor.Delete(id);
        }
    }
}
