using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiService.Migrations
{
    public partial class AddKey2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AnimalVaccine",
                table: "AnimalVaccine");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "AnimalVaccine",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_AnimalVaccine",
                table: "AnimalVaccine",
                columns: new[] { "AnimalsId", "VaccinesId", "Date" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AnimalVaccine",
                table: "AnimalVaccine");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "AnimalVaccine",
                type: "timestamp with time zone",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AnimalVaccine",
                table: "AnimalVaccine",
                columns: new[] { "AnimalsId", "VaccinesId" });
        }
    }
}
