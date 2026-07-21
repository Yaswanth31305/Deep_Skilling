using System.ComponentModel.DataAnnotations;

namespace RetailInventory.Models
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        public List<Product> Products { get; set; } = new();
    }
}
