using Microsoft.EntityFrameworkCore;
using RetailInventoryAPI.Models;

namespace RetailInventoryAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

        public DbSet<Category> Categories { get; set; }

        /// <summary>
        /// Seeds default categories and products so the database is immediately
        /// queryable after running migrations. (Exercise 5 — EF Core Seed Data)
        /// </summary>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure decimal precision to avoid silent truncation
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);

            // Seed Categories
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Electronics" },
                new Category { Id = 2, Name = "Clothing" },
                new Category { Id = 3, Name = "Groceries" },
                new Category { Id = 4, Name = "Sports & Fitness" }
            );

            // Seed Products
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "Laptop",          Price = 75000m,  CategoryId = 1 },
                new Product { Id = 2, Name = "Wireless Mouse",  Price = 1299m,   CategoryId = 1 },
                new Product { Id = 3, Name = "Bluetooth Speaker", Price = 3499m, CategoryId = 1 },
                new Product { Id = 4, Name = "Men's T-Shirt",   Price = 499m,    CategoryId = 2 },
                new Product { Id = 5, Name = "Running Shoes",   Price = 2999m,   CategoryId = 2 },
                new Product { Id = 6, Name = "Basmati Rice 5kg", Price = 350m,   CategoryId = 3 },
                new Product { Id = 7, Name = "Olive Oil 1L",    Price = 649m,    CategoryId = 3 },
                new Product { Id = 8, Name = "Yoga Mat",        Price = 799m,    CategoryId = 4 },
                new Product { Id = 9, Name = "Dumbbells Set",   Price = 2499m,   CategoryId = 4 }
            );
        }
    }
}