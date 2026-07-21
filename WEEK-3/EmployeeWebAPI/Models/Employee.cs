using System.ComponentModel.DataAnnotations;

namespace EmployeeWebAPI.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; } = string.Empty;
        [Required]
        [Range(10000, 500000)]
        public decimal Salary { get; set; }
        public int DepartmentId { get; set; }
        public Department? Department { get; set; }
        public List<Skill> Skills { get; set; } = new();
    }
}
