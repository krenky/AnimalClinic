using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ApiService.Migrations
{
    public partial class AddPrimaryKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AnimalVaccine",
                table: "AnimalVaccine");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AnimalService",
                table: "AnimalService");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "AnimalVaccine",
                type: "timestamp with time zone",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "AnimalVaccine",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "AnimalService",
                type: "timestamp with time zone",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "AnimalService",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_AnimalVaccine",
                table: "AnimalVaccine",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AnimalService",
                table: "AnimalService",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_AnimalVaccine_AnimalsId",
                table: "AnimalVaccine",
                column: "AnimalsId");

            migrationBuilder.CreateIndex(
                name: "IX_AnimalService_AnimalsId",
                table: "AnimalService",
                column: "AnimalsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AnimalVaccine",
                table: "AnimalVaccine");

            migrationBuilder.DropIndex(
                name: "IX_AnimalVaccine_AnimalsId",
                table: "AnimalVaccine");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AnimalService",
                table: "AnimalService");

            migrationBuilder.DropIndex(
                name: "IX_AnimalService_AnimalsId",
                table: "AnimalService");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "AnimalVaccine");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "AnimalService");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "AnimalVaccine",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "AnimalService",
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

            migrationBuilder.AddPrimaryKey(
                name: "PK_AnimalService",
                table: "AnimalService",
                columns: new[] { "AnimalsId", "ServicesId", "Date" });
        }
    }
}
