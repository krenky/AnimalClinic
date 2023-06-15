using System;
using System.Collections.Generic;

namespace ApiService.Models
{
    public partial class Vaccine
    {
        public Vaccine()
        {
            AnimalVaccines = new HashSet<AnimalVaccine>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public decimal Price { get; set; }

        public virtual ICollection<AnimalVaccine> AnimalVaccines { get; set; }
    }
}
