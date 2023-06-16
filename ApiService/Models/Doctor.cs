using ApiService.Models;
using System;
using System.Collections.Generic;

namespace ApiService.Models
{
    public partial class Doctor
    {
        public Doctor()
        {
            Animals = new HashSet<Animal>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        
        public virtual ICollection<Animal> Animals { get; set; }
    }
}
