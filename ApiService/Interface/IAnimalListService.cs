using ApiService.Models;

namespace ApiService.Interface
{
    public interface IAnimalListService
    {
        public ICollection<Animal> GetAnimalsWithOwnerDoctor();
        public Animal GetAnimalWithOwnerDoctor(int animalId);
    }
}
