using System;
using System.Collections.Generic;

namespace ApiService.Models
{
    public partial class Service
    {
        public Service()
        {
            AnimalServices = new HashSet<AnimalService>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public decimal Price { get; set; }

        public virtual ICollection<AnimalService> AnimalServices { get; set; }
    }
}
