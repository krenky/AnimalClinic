using ApiService.Data;
using ApiService.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiService.Interface.Impl
{
    public class AnimalServiceImpl : ICRUD<Animal>, IAnimalListService
    {
        private readonly ApplicationDataContext _context;

        public AnimalServiceImpl(ApplicationDataContext context)
        {
            _context = context;
        }

        public Animal Get(int id)
        {
            Animal? animal = _context.Animals.Find(id);
            if (animal == null)
                throw new NullReferenceException();
            return animal;
        }

        public ICollection<Animal> GetList()
        {
            return _context.Animals.ToList();
        }

        public void Change(int id, Animal newData)
        {
            Animal animal = _context.Animals.Find(id);
            SaveDeleteAnimalService(newData);
            SaveDeleteAnimalVaccine(newData);
            animal.Name = newData.Name;
            animal.AnimalVaccines = newData.AnimalVaccines;
            animal.AnimalServices = newData.AnimalServices;
            SaveChanges();
        }

        public void Delete(int id)
        {
            Animal animal = Get(id);
            _context.Animals.Remove(animal);
            SaveChanges();
        }

        public void Add(Animal newData)
        {
            _context.Animals.Add(newData);
            SaveChanges();
        }
        private void SaveChanges()
        {
            if (_context.SaveChanges() < 1)
                throw new DbUpdateException("Сохранение не удачно");
        }

        public ICollection<Animal> GetAnimalsWithOwnerDoctor()
        {
            ICollection<Animal> animals = _context.Animals.ToList();
            foreach(Animal animal in animals)
            {
                animal.Owner = _context.Owners.Find(animal.OwnerId);
                animal.Doctor = _context.Doctors.Find(animal.DoctorId);
            }
            return animals;
        }

        public Animal GetAnimalWithAllData(int animalId)
        {
            Animal animal = _context.Animals.Find(animalId);
            animal.Doctor = _context.Doctors.Find(animal.DoctorId);
            animal.Owner = _context.Owners.Find(animal.OwnerId);
            animal.AnimalVaccines = _context.AnimalVaccines.Where(x => x.AnimalsId == animal.Id).ToList();
            animal.AnimalServices = _context.AnimalServices.Where(x => x.AnimalsId == animal.Id).ToList();
            return animal;
        }

        private void SaveDeleteAnimalService(Animal animal)
        {
            List<AnimalService> deleteAnimalServices = _context.AnimalServices.Where(x => !animal.AnimalServices.Contains(x) && animal.Id == x.AnimalsId).ToList();
            _context.AnimalServices.RemoveRange(deleteAnimalServices);
        }

        private void SaveDeleteAnimalVaccine(Animal animal)
        {
            List<AnimalVaccine> deleteAnimalVaccines = _context.AnimalVaccines.Where(x => !animal.AnimalVaccines.Contains(x) && animal.Id == x.AnimalsId).ToList();
            _context.AnimalVaccines.RemoveRange(deleteAnimalVaccines);
        }
    }
}
