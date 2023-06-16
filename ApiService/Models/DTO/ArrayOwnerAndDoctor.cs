using System.Collections;

namespace ApiService.Models.DTO
{
    public class ArrayOwnerAndDoctor
    {
        public ICollection<Owner> Owners { get; set; }
        public ICollection<Doctor> Doctors { get; set; }
    }
}
