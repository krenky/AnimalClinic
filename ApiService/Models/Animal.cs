using ApiService.Data;
using ApiService.Interface;
using System;
using System.Collections.Generic;

namespace ApiService.Models
{
    public class Animal
    {
        private readonly ApplicationDataContext _context;
        public Animal()
        {
            AnimalServices = new HashSet<AnimalService>();
            AnimalVaccines = new HashSet<AnimalVaccine>();
        }
        public Animal(ApplicationDataContext context)
        {
            _context = context;
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int OwnerId { get; set; }
        public int? DoctorId { get; set; }

        public virtual Doctor? Doctor { get; set; }
        public virtual Owner? Owner { get; set; }
        public virtual ICollection<AnimalService>? AnimalServices { get; set; }
        public virtual ICollection<AnimalVaccine>? AnimalVaccines { get; set; }
    }
}
