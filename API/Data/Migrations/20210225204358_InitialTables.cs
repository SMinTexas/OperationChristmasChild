using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class InitialTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Users",
                newName: "AppUserId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "ProductCategories",
                newName: "ProductCategoryId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Genders",
                newName: "GenderId");

            migrationBuilder.RenameColumn(
                name: "AgeRange",
                table: "Ages",
                newName: "AgeGroup");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Ages",
                newName: "AgeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AppUserId",
                table: "Users",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "ProductCategoryId",
                table: "ProductCategories",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "GenderId",
                table: "Genders",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "AgeGroup",
                table: "Ages",
                newName: "AgeRange");

            migrationBuilder.RenameColumn(
                name: "AgeId",
                table: "Ages",
                newName: "Id");
        }
    }
}
