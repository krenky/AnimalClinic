using ApiService.Data;
using ApiService.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiService.Interface.Impl
{
    public class VaccineService : ICRUD<Vaccine>
    {
        private readonly ApplicationDataContext _context;

        public VaccineService(ApplicationDataContext context)
        {
            _context = context;
        }

        public void Add(Vaccine newData)
        {
            _context.Vaccines.Add(newData);
            SaveChanges();
        }

        public void Change(int id, Vaccine newData)
        {
            _context.Entry(newData).State = EntityState.Modified;
            SaveChanges();
        }

        public void Delete(int id)
        {
            Vaccine vaccine = Get(id);
            _context.Vaccines.Remove(vaccine);
            SaveChanges();
        }

        public Vaccine Get(int id)
        {
            Vaccine? vaccine = _context.Vaccines.Find(id);
            if (vaccine == null)
                throw new NullReferenceException();
            return vaccine;
        }

        public ICollection<Vaccine> GetList()
        {
            return _context.Vaccines.ToList();
        }

        private void SaveChanges()
        {
            if (_context.SaveChanges() < 1)
                throw new DbUpdateException("Сохранение не удачно");
        }
    }
}
