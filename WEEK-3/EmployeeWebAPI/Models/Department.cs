using System.ComponentModel.DataAnnotations;

namespace EmployeeWebAPI.Models
{
    public class Department
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string DepartmentName { get; set; } = string.Empty;
    }
}
