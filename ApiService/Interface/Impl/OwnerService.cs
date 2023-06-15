using ApiService.Data;
using ApiService.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiService.Interface.Impl
{
    public class OwnerService : ICRUD<Owner>
    {
        private readonly ApplicationDataContext _context;

        public OwnerService(ApplicationDataContext context)
        {
            _context = context;
        }

        public void Add(Owner newData)
        {
            _context.Owners.Add(newData);
            SaveChanges();
        }

        public void Change(int id, Owner newData)
        {
            _context.Entry(newData).State = EntityState.Modified;
            SaveChanges();
        }

        public void Delete(int id)
        {
            Owner owner = Get(id);
            _context.Owners.Remove(owner);
            SaveChanges();
        }

        public Owner Get(int id)
        {
            Owner? owner = _context.Owners.Find(id);
            if (owner == null)
                throw new NullReferenceException();
            return owner;
        }

        public ICollection<Owner> GetList()
        {
            return _context.Owners.ToList();
        }

        private void SaveChanges()
        {
            if (_context.SaveChanges() < 1)
                throw new DbUpdateException("Сохранение не удачно");
        }
    }
}
