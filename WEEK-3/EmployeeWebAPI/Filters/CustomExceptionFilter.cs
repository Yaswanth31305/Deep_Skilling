using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace EmployeeWebAPI.Filters
{
    public class CustomExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            context.Result = new ObjectResult(new
            {
                Error = "An unexpected error occurred",
                Details = context.Exception.Message
            })
            { StatusCode = 500 };
            context.ExceptionHandled = true;
        }
    }
}
