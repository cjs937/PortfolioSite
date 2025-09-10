using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using PortfolioSource.Models;

namespace PortfolioSource.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
