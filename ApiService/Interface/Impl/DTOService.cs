using ApiService.Data;
using ApiService.Models.DTO;

namespace ApiService.Interface.Impl
{
    public class DTOService : IDTOService
    {
        private readonly ApplicationDataContext _context;

        public DTOService(ApplicationDataContext context)
        {
            _context = context;
        }

        public ArrayOwnerAndDoctor GetArrayOwnerAndDoctor()
        {
            ArrayOwnerAndDoctor arrayOwnerAndDoctor = new ArrayOwnerAndDoctor();
            arrayOwnerAndDoctor.Doctors = _context.Doctors.ToList();
            arrayOwnerAndDoctor.Owners = _context.Owners.ToList();
            return arrayOwnerAndDoctor;
        }
    }
}
