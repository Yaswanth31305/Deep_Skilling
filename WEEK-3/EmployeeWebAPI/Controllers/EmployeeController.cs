using Microsoft.AspNetCore.Mvc;
using EmployeeWebAPI.Models;

namespace EmployeeWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private static readonly List<Employee> Employees = new()
        {
            new Employee { Id = 1, Name = "Rahul Sharma", Salary = 60000, DepartmentId = 1 },
            new Employee { Id = 2, Name = "Priya Reddy", Salary = 75000, DepartmentId = 2 }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Employee>> GetEmployees() => Ok(Employees);

        [HttpGet("{id}")]
        public ActionResult<Employee> GetEmployee(int id)
        {
            var emp = Employees.FirstOrDefault(e => e.Id == id);
            if (emp == null) return NotFound();
            return Ok(emp);
        }

        [HttpPost]
        public ActionResult<Employee> CreateEmployee([FromBody] Employee employee)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            employee.Id = Employees.Max(e => e.Id) + 1;
            Employees.Add(employee);
            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEmployee(int id, [FromBody] Employee employee)
        {
            var existing = Employees.FirstOrDefault(e => e.Id == id);
            if (existing == null) return NotFound();
            existing.Name = employee.Name;
            existing.Salary = employee.Salary;
            existing.DepartmentId = employee.DepartmentId;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            var existing = Employees.FirstOrDefault(e => e.Id == id);
            if (existing == null) return NotFound();
            Employees.Remove(existing);
            return NoContent();
        }
    }
}
