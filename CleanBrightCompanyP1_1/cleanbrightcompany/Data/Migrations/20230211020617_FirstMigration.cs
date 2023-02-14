using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace cleanbrightcompany.Data.Migrations
{
    /// <inheritdoc />
    public partial class FirstMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Manufacturers",
                columns: table => new
                {
                    ManufacturerID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ManufacturerName = table.Column<string>(type: "TEXT", maxLength: 225, nullable: false),
                    ManufacturerEmail = table.Column<string>(type: "TEXT", maxLength: 225, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Manufacturers", x => x.ManufacturerID);
                });

            migrationBuilder.InsertData(
                table: "Manufacturers",
                columns: new[] { "ManufacturerID", "ManufacturerEmail", "ManufacturerName" },
                values: new object[,]
                {
                    { 1, "Manufacturer1@gmail.com", "Manufacturer 1" },
                    { 2, "Manufacturer2@gmail.com", "Manufacturer 2" },
                    { 3, "Manufacturer3@gmail.com", "Manufacturer 3" },
                    { 4, "Manufacturer4@gmail.com", "Manufacturer 4" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Manufacturers");
        }
    }
}
