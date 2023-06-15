using ApiService.Models;
using System;
using System.Collections.Generic;

namespace ApiService.Models
{
    public partial class AnimalService
    {
        public int AnimalsId { get; set; }
        public int ServicesId { get; set; }
        public DateTime? Date { get; set; }

        public virtual Animal? Animals { get; set; } = null!;
        public virtual Service? Services { get; set; } = null!;
    }
}
