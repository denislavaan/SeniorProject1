using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BugsController : BaseController
    {
        private readonly DataContext _context;
        public BugsController(DataContext context)
        {
            _context = context;
        }
        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret() {
            return "secret content";
        }
         [HttpGet("notFound")]
        public ActionResult<AppUser> GetNotFound() {
            var request = _context.Users.Find(-1);
            if(request == null)
            return NotFound();
            return Ok(request);
        }
              [HttpGet("serverError")]
        public ActionResult<string> GetServerError() {
            var request = _context.Users.Find(-1); 
            var requestToReturn = request.ToString();
            return requestToReturn;
        }
              [HttpGet("badRequest")]
        public ActionResult<string> GetBadRequest() {
            return BadRequest();
        }
    }
}