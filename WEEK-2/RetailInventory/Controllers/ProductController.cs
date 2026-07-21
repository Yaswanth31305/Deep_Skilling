using Microsoft.AspNetCore.Mvc;
using RetailInventory.Data;
using RetailInventory.Models;

namespace RetailInventory.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetProducts()
        {
            var products = _context.Products.ToList();

            return Ok(products);
        }
    }
}