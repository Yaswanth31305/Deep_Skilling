using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RetailInventoryAPI.Data;
using RetailInventoryAPI.Models;

namespace RetailInventoryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ProductController(AppDbContext context) { _context = context; }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts() => await _context.Products.Include(p => p.Category).ToListAsync();

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProducts), new { id = product.ProductId }, product);
        }
    }
}
