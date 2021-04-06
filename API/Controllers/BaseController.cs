using API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [ServiceFilter(typeof(UserActivity))]
    [Route("api/[controller]")]
    public class BaseController : ControllerBase
    {
        
    }
}