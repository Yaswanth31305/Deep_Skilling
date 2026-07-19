using Asp.Versioning;
using EmployeeWebAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeWebAPI.Controllers
{

    [ApiController]
    [ApiVersion("2.0")]
    [Route("api/v{version:apiVersion}/employee")]
    public class EmployeeV2Controller : ControllerBase
    {
        private static readonly List<Employee> employees = new()
        {
            new Employee
            {
                Id = 1,
                Name = "Rahul",
                Salary = 50000,
                Department = new Department { DepartmentId = 101, DepartmentName = "IT" },
                Skills = new List<Skill>
                {
                    new Skill { SkillId = 1, SkillName = "C#" },
                    new Skill { SkillId = 2, SkillName = "SQL" }
                }
            },
            new Employee
            {
                Id = 2,
                Name = "Priya",
                Salary = 45000,
                Department = new Department { DepartmentId = 102, DepartmentName = "HR" },
                Skills = new List<Skill>
                {
                    new Skill { SkillId = 3, SkillName = "Communication" }
                }
            },
            new Employee
            {
                Id = 3,
                Name = "Arjun",
                Salary = 120000,
                Department = new Department { DepartmentId = 103, DepartmentName = "Finance" },
                Skills = new List<Skill>
                {
                    new Skill { SkillId = 4, SkillName = "Excel" },
                    new Skill { SkillId = 5, SkillName = "Accounting" }
                }
            }
        };


        [HttpGet]
        public IActionResult GetEmployees()
        {
            var result = employees.Select(e => new
            {
                e.Id,
                e.Name,
                e.Salary,
                SalaryBand = GetSalaryBand(e.Salary),
                Department = e.Department.DepartmentName,
                SkillCount = e.Skills.Count,
                Skills = e.Skills.Select(s => s.SkillName),
                ApiVersion = "2.0"
            });

            return Ok(result);
        }


        [HttpGet("{id}")]
        public IActionResult GetEmployee(int id)
        {
            if (id <= 0)
                return BadRequest("Invalid Employee ID.");

            var employee = employees.FirstOrDefault(e => e.Id == id);

            if (employee == null)
                return NotFound($"Employee with ID {id} not found.");

            var result = new
            {
                employee.Id,
                employee.Name,
                employee.Salary,
                SalaryBand = GetSalaryBand(employee.Salary),
                Department = employee.Department.DepartmentName,
                SkillCount = employee.Skills.Count,
                Skills = employee.Skills.Select(s => s.SkillName),
                ApiVersion = "2.0"
            };

            return Ok(result);
        }



        private static string GetSalaryBand(decimal salary) => salary switch
        {
            < 30000  => "Entry Level",
            < 60000  => "Mid Level",
            < 100000 => "Senior Level",
            _        => "Executive"
        };
    }
}
