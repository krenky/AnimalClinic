using ApiService.Interface;
using ApiService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ApiService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalListController : ControllerBase
    {
        private readonly IAnimalListService _animal;

        public AnimalListController(IAnimalListService animal)
        {
            _animal = animal;
        }
        [HttpGet]
        public IEnumerable<Animal> GetListWithOwnerAndDoctor() 
        {
            return _animal.GetAnimalsWithOwnerDoctor();
        }
        [HttpGet("{id}")]
        public Animal GetAnimalWithOwnerAndDoctor(int id)
        {
            return _animal.GetAnimalWithOwnerDoctor(id);
        }
    }
}
