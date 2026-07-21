using System.ComponentModel.DataAnnotations;

namespace RetailInventoryAPI.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Product name is required.")]
        [StringLength(200, MinimumLength = 2, ErrorMessage = "Product name must be between 2 and 200 characters.")]
        public string Name { get; set; } = string.Empty;

        [Range(0.01, 1000000, ErrorMessage = "Price must be between 0.01 and 1,000,000.")]
        public decimal Price { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "CategoryId must reference a valid category.")]
        public int CategoryId { get; set; }

        public Category? Category { get; set; }
    }
}