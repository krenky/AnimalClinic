using ApiService.Models;

namespace ApiService.Interface
{
    public interface IAnimalService
    {
        public void AddAnimal(Animal animal);
        public void RemoveAnimal(Animal animal);
        public void ChangeAnimal(int id, Animal newData);
        public Animal GetAnimal(int id);
        public ICollection<Animal> GetAnimals();
    }
}
