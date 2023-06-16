using ApiService.Data;
using ApiService.Interface;
using ApiService.Interface.Impl;
using ApiService.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
string connection = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationDataContext>(options => options.UseNpgsql(connection));
builder.Services.AddScoped<IDTOService, DTOService>();
builder.Services.AddScoped<ICRUD<Animal>, AnimalServiceImpl>();
builder.Services.AddScoped<ICRUD<Doctor>, DoctorService>();
builder.Services.AddScoped<ICRUD<Owner>, OwnerService>();
builder.Services.AddScoped<ICRUD<Service>, ServiceService>();
builder.Services.AddScoped<ICRUD<Vaccine>, VaccineService>();
builder.Services.AddScoped<ICRDIntermediateModel<AnimalService>, AnimalServiceService>();
builder.Services.AddScoped<ICRDIntermediateModel<AnimalVaccine>, AnimalVaccineService>();
builder.Services.AddScoped<IAnimalListService, AnimalServiceImpl>();

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(builder => builder.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod());

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", false);

app.Run();
