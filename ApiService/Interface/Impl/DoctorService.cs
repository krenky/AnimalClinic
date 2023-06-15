using ApiService.Data;
using ApiService.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiService.Interface.Impl
{
    public class DoctorService : ICRUD<Doctor>
    {
        private readonly ApplicationDataContext _context;

        public DoctorService(ApplicationDataContext context)
        {
            _context = context;
        }

        public void Add(Doctor newData)
        {
            _context.Doctors.Add(newData);
            SaveChanges();
        }

        public void Change(int id, Doctor newData)
        {
            _context.Entry(newData).State = EntityState.Modified;
            SaveChanges();
        }

        public void Delete(int id)
        {
            Doctor doctor = Get(id);
            _context.Doctors.Remove(doctor);
            SaveChanges();
        }

        public Doctor Get(int id)
        {
            Doctor? doctor = _context.Doctors.Find(id);
            if (doctor == null)
                throw new NullReferenceException();
            return doctor;
        }

        public ICollection<Doctor> GetList()
        {
            return _context.Doctors.ToList();
        }

        private void SaveChanges()
        {
            if (_context.SaveChanges() < 1)
                throw new DbUpdateException("Сохранение не удачно");
        }
    }
}
