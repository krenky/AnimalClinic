using ApiService.Models.DTO;

namespace ApiService.Interface
{
    public interface IDTOService
    {
        public ArrayOwnerAndDoctor GetArrayOwnerAndDoctor();

        public ArrayVaccineAndService GetArrayVaccineAndService();
    }
}
