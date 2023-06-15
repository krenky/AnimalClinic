using ApiService.Data;
using ApiService.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiService.Interface.Impl
{
    public class AnimalServiceService : ICRDIntermediateModel<AnimalService>
    {
        private readonly ApplicationDataContext _context;

        public AnimalServiceService(ApplicationDataContext context)
        {
            _context = context;
        }

        public void Add(AnimalService newData)
        {
            _context.AnimalServices.Add(newData);
            SaveChanges();
        }

        public void Delete(AnimalService data)
        {
            _context.AnimalServices.Remove(data);
            SaveChanges();
        }

        public ICollection<AnimalService> GetList(int animalsId)
        {
            return _context.AnimalServices.Where(x => x.AnimalsId == animalsId).ToList();
        }

        public ICollection<AnimalService> GetList()
        {
            return _context.AnimalServices.ToList();
        }

        private void SaveChanges()
        {
            if (_context.SaveChanges() < 1)
                throw new DbUpdateException("Сохранение не удачно");
        }
    }
}
