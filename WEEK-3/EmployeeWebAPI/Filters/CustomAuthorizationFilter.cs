using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace EmployeeWebAPI.Filters
{
    public class CustomAuthorizationFilter : IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var path = context.HttpContext.Request.Path.Value;
            if (!string.IsNullOrEmpty(path) &&
                (path.StartsWith("/swagger") || path == "/"))
            {
                return;
            }

            if (!context.HttpContext.Request.Headers.ContainsKey("ApiKey"))
            {
                context.Result = new UnauthorizedObjectResult("API Key is missing.");
            }
        }
    }
}   