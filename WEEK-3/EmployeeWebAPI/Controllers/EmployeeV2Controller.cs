using Microsoft.AspNetCore.Mvc;
using EmployeeWebAPI.Models;

namespace EmployeeWebAPI.Controllers
{
    [ApiController]
    [Route("api/v2/employee")]
    public class EmployeeV2Controller : ControllerBase
    {
        [HttpGet]
        public ActionResult<object> GetEmployeesV2()
        {
            return Ok(new
            {
                Version = "2.0",
                Message = "Employee API Version 2 with extended details",
                Data = new[]
                {
                    new { Id = 1, FullName = "Rahul Sharma", AnnualSalary = 720000, Status = "Active" },
                    new { Id = 2, FullName = "Priya Reddy", AnnualSalary = 900000, Status = "Active" }
                }
            });
        }
    }
}
