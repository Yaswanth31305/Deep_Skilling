using System.ComponentModel.DataAnnotations;

namespace EmployeeWebAPI.Models
{
    public class Department
    {
        [Range(1, int.MaxValue, ErrorMessage = "Department ID must be a positive integer.")]
        public int DepartmentId { get; set; }

        [Required(ErrorMessage = "Department name is required.")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Department name must be between 2 and 100 characters.")]
        public string DepartmentName { get; set; } = "";
    }
}