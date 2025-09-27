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

        public IActionResult About()
        {
            return View();
        }

        // public IActionResult GetGalleryURLS(string path = "")
        // {
        //     var Files = ("1", "2", "3", "4", "5", "6", "7", "8", "9", "10");
            
        //     var GalleryModel = GalleryViewModel(Files, "Sample Gallery");
        //     return View(GalleryModel);
        // }
    }
}
