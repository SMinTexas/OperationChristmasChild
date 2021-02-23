using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) {}

        public DbSet<AppUser> Users {get; set;}
        public DbSet<Gender> Genders {get; set;}
        public DbSet<Age> Ages {get; set;}
        public DbSet<ProductCategory> ProductCategories {get; set;}
    }
}