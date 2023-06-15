using ApiService.Data;
using ApiService.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiService.Interface.Impl
{
    public class AnimalVaccineService : ICRDIntermediateModel<AnimalVaccine>
    {
        private readonly ApplicationDataContext _context;

        public AnimalVaccineService(ApplicationDataContext context)
        {
            _context = context;
        }

        public void Add(AnimalVaccine newData)
        {
            _context.AnimalVaccines.Add(newData);
            SaveChanges();
        }


        public void Delete(AnimalVaccine data)
        {
            _context.AnimalVaccines.Remove(data);
            SaveChanges();
        }

        public ICollection<AnimalVaccine> GetList(int animalsId)
        {
            return _context.AnimalVaccines.Where(x => x.AnimalsId == animalsId).ToList();
        }

        public ICollection<AnimalVaccine> GetList()
        {
            return _context.AnimalVaccines.ToList();
        }

        private void SaveChanges()
        {
            if (_context.SaveChanges() < 1)
                throw new DbUpdateException("Сохранение не удачно");
        }
    }
}
