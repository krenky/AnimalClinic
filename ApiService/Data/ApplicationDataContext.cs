using ApiService.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiService.Data
{
    public class ApplicationDataContext : DbContext
    {
        public ApplicationDataContext(DbContextOptions<ApplicationDataContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        public virtual DbSet<Animal> Animals { get; set; } = null!;
        public virtual DbSet<AnimalService> AnimalServices { get; set; } = null!;
        public virtual DbSet<AnimalVaccine> AnimalVaccines { get; set; } = null!;
        public virtual DbSet<Doctor> Doctors { get; set; } = null!;
        public virtual DbSet<Owner> Owners { get; set; } = null!;
        public virtual DbSet<Service> Services { get; set; } = null!;
        public virtual DbSet<Vaccine> Vaccines { get; set; } = null!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Animal>(entity =>
            {
                entity.HasIndex(e => e.DoctorId, "IX_Animals_DoctorId");

                entity.HasIndex(e => e.OwnerId, "IX_Animals_OwnerId");

                entity.HasOne(d => d.Doctor)
                    .WithMany(p => p.Animals)
                    .HasForeignKey(d => d.DoctorId);

                entity.HasOne(d => d.Owner)
                    .WithMany(p => p.Animals)
                    .HasForeignKey(d => d.OwnerId);
            });

            modelBuilder.Entity<AnimalService>(entity =>
            {
                entity.HasKey(e => new { e.Id });

                entity.ToTable("AnimalService");

                entity.HasIndex(e => e.ServicesId, "IX_AnimalService_ServicesId");

                entity.HasOne(d => d.Animals)
                    .WithMany(p => p.AnimalServices)
                    .HasForeignKey(d => d.AnimalsId);

                entity.HasOne(d => d.Services)
                    .WithMany(p => p.AnimalServices)
                    .HasForeignKey(d => d.ServicesId);
            });

            modelBuilder.Entity<AnimalVaccine>(entity =>
            {
                entity.HasKey(e => new { e.Id });

                entity.ToTable("AnimalVaccine");

                entity.HasIndex(e => e.VaccinesId, "IX_AnimalVaccine_VaccinesId");

                entity.HasOne(d => d.Animals)
                    .WithMany(p => p.AnimalVaccines)
                    .HasForeignKey(d => d.AnimalsId);

                entity.HasOne(d => d.Vaccines)
                    .WithMany(p => p.AnimalVaccines)
                    .HasForeignKey(d => d.VaccinesId);
            });

        }

    }
}
