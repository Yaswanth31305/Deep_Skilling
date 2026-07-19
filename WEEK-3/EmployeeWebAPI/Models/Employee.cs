using System.ComponentModel.DataAnnotations;

namespace EmployeeWebAPI.Models
{
    public class Employee
    {
        [Range(1, int.MaxValue, ErrorMessage = "Employee ID must be a positive integer.")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Employee name is required.")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Name must be between 2 and 100 characters.")]
        public string Name { get; set; } = "";

        [Range(1000, 10000000, ErrorMessage = "Salary must be between 1,000 and 10,000,000.")]
        public decimal Salary { get; set; }

        [Required(ErrorMessage = "Department is required.")]
        public Department Department { get; set; } = new();

        [Required(ErrorMessage = "Skills list is required.")]
        [MinLength(1, ErrorMessage = "At least one skill is required.")]
        public List<Skill> Skills { get; set; } = new();
    }
}