using System.ComponentModel.DataAnnotations;

namespace EmployeeWebAPI.Models
{
    public class Skill
    {
        [Range(1, int.MaxValue, ErrorMessage = "Skill ID must be a positive integer.")]
        public int SkillId { get; set; }

        [Required(ErrorMessage = "Skill name is required.")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Skill name must be between 2 and 100 characters.")]
        public string SkillName { get; set; } = "";
    }
}