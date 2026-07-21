using System.ComponentModel.DataAnnotations;

namespace EmployeeWebAPI.Models
{
    public class Skill
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string SkillName { get; set; } = string.Empty;
    }
}
