using ApiService.Models;
using System;
using System.Collections.Generic;

namespace ApiService.Models
{
    public partial class AnimalVaccine
    {
        public int Id { get; set; }
        public int AnimalsId { get; set; }
        public int VaccinesId { get; set; }
        public DateTime? Date { get; set; }

        public virtual Animal? Animals { get; set; } = null!;
        public virtual Vaccine? Vaccines { get; set; } = null!;
    }
}
