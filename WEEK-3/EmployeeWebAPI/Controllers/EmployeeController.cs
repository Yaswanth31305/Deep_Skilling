using Asp.Versioning;
using EmployeeWebAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeWebAPI.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private static List<Employee> employees = new()
        {
            new Employee
            {
                Id = 1,
                Name = "Rahul",
                Salary = 50000,
                Department = new Department
                {
                    DepartmentId = 101,
                    DepartmentName = "IT"
                },
                Skills = new List<Skill>
                {
                    new Skill
                    {
                        SkillId = 1,
                        SkillName = "C#"
                    },
                    new Skill
                    {
                        SkillId = 2,
                        SkillName = "SQL"
                    }
                }
            },
            new Employee
            {
                Id = 2,
                Name = "Priya",
                Salary = 45000,
                Department = new Department
                {
                    DepartmentId = 102,
                    DepartmentName = "HR"
                },
                Skills = new List<Skill>
                {
                    new Skill
                    {
                        SkillId = 3,
                        SkillName = "Communication"
                    }
                }
            }
        };
        [HttpGet]
        public IActionResult GetEmployees()
        {
            return Ok(employees);
        }
        [HttpGet("{id}")]
        public IActionResult GetEmployee(int id)
        {
            if (id <= 0)
                return BadRequest("Invalid Employee ID.");

            var employee = employees.FirstOrDefault(e => e.Id == id);

            if (employee == null)
                return NotFound("Employee not found.");

            return Ok(employee);
        }
        [HttpPost]
        public IActionResult AddEmployee(Employee employee)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (employee.Id <= 0)
                return BadRequest("Employee ID must be greater than 0.");

            if (employees.Any(e => e.Id == employee.Id))
                return BadRequest("Employee ID already exists.");

            employees.Add(employee);

            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
        }
        [HttpPut("{id}")]
        public IActionResult UpdateEmployee(int id, Employee updatedEmployee)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id <= 0)
                return BadRequest("Invalid Employee ID.");
            var employee = employees.FirstOrDefault(e => e.Id == id);
            if (employee == null)
                return NotFound("Employee not found.");
            employee.Name = updatedEmployee.Name;
            employee.Salary = updatedEmployee.Salary;
            employee.Department = updatedEmployee.Department;
            employee.Skills = updatedEmployee.Skills;
            return Ok(employee);
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            if (id <= 0)
                return BadRequest("Invalid Employee ID.");
            var employee = employees.FirstOrDefault(e => e.Id == id);
            if (employee == null)
                return NotFound("Employee not found.");
            employees.Remove(employee);
            return Ok("Employee deleted successfully.");
        }
    }
}