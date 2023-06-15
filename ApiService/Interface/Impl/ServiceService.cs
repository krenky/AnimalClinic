using ApiService.Data;
using ApiService.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiService.Interface.Impl
{
    public class ServiceService : ICRUD<Service>
    {
        private readonly ApplicationDataContext _context;

        public ServiceService(ApplicationDataContext context)
        {
            _context = context;
        }

        public void Add(Service newData)
        {
            _context.Services.Add(newData);
            SaveChanges();
        }

        public void Change(int id, Service newData)
        {
            _context.Entry(newData).State = EntityState.Modified;
            SaveChanges();
        }

        public void Delete(int id)
        {
            Service service = Get(id);
            _context.Services.Remove(service);
            SaveChanges();
        }

        public Service Get(int id)
        {
            Service? service = _context.Services.Find(id);
            if (service == null)
                throw new NullReferenceException();
            return service;
        }

        public ICollection<Service> GetList()
        {
            return _context.Services.ToList();
        }

        private void SaveChanges()
        {
            if (_context.SaveChanges() < 1)
                throw new DbUpdateException("Сохранение не удачно");
        }
    }
}
