using Microsoft.AspNetCore.Mvc;

namespace PortfolioSource.Controllers
{    public class TestPagesController : Controller
    {
        [HttpGet]
        public IActionResult TestPage()
        {
            return View();
        }

        public IActionResult RandomNumber()
        {
            var rand = new Random();
            int randomNumber = rand.Next(1, 101); // Generates a random number between 1 and 100
            return Json(randomNumber);
        }
    }
}