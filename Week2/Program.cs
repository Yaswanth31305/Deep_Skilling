using Microsoft.EntityFrameworkCore;
using RetailInventory.Data;
using RetailInventory.Models;

using AppDbContext context = new AppDbContext();

Category electronics = new Category { Name = "Electronics" };
Category groceries = new Category { Name = "Groceries" };

context.Categories.Add(electronics);
context.Categories.Add(groceries);
context.SaveChanges();

Product laptop = new Product
{
    Name = "Laptop",
    Price = 75000,
    CategoryId = electronics.Id
};

Product mouse = new Product
{
    Name = "Mouse",
    Price = 800,
    CategoryId = electronics.Id
};

Product rice = new Product
{
    Name = "Rice Bag",
    Price = 1200,
    CategoryId = groceries.Id
};

context.Products.AddRange(laptop, mouse, rice);
context.SaveChanges();

Console.WriteLine("Data inserted successfully.\n");

foreach (var category in context.Categories.ToList())
    Console.WriteLine($"{category.Id} - {category.Name}");

Console.WriteLine();

foreach (var product in context.Products.ToList())
    Console.WriteLine($"{product.Id} - {product.Name} - ₹{product.Price}");

Console.WriteLine();

var products = context.Products.Include(p => p.Category).ToList();

foreach (var product in products)
    Console.WriteLine($"{product.Name} | ₹{product.Price} | {product.Category?.Name}");

Console.WriteLine();

var foundProduct = context.Products.Find(1);

if (foundProduct != null)
    Console.WriteLine($"{foundProduct.Name} - ₹{foundProduct.Price}");

Console.WriteLine();

foreach (var product in context.Products.Where(p => p.Price > 1000).ToList())
    Console.WriteLine($"{product.Name} - ₹{product.Price}");

Console.WriteLine();

foreach (var product in context.Products.OrderBy(p => p.Price).ToList())
    Console.WriteLine($"{product.Name} - ₹{product.Price}");

Console.WriteLine();

foreach (var product in context.Products.Where(p => p.Name.Contains("Lap")).ToList())
    Console.WriteLine(product.Name);

Console.WriteLine();

Console.WriteLine($"Total Categories : {context.Categories.Count()}");
Console.WriteLine($"Total Products : {context.Products.Count()}");