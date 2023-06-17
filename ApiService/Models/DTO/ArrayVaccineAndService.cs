namespace ApiService.Models.DTO
{
    public class ArrayVaccineAndService
    {
        public ICollection<Vaccine> Vaccines { get; set; }
        public ICollection<Service> Services { get; set; }
    }
}
