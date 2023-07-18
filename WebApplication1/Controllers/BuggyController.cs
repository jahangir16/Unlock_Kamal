using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{

    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound(); 
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails {Title = "This is bad Request" }); 
        }

        
        [HttpGet("unauthorised")]
        public ActionResult GetUnauthorized()
        {
            return Unauthorized();
        }

         [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem1","This is first error"); 
            ModelState.AddModelError("Problem2","This is second error"); 
            return ValidationProblem();
        }

         [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("This is Server Error");
        
        }
    }
}