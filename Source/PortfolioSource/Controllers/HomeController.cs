using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using PortfolioSource.Services;
namespace PortfolioSource.Controllers
{
    public class HomeController : Controller
    {
        private PortfolioService PortfolioService;

        public HomeController(PortfolioService PService)
        {
            PortfolioService = PService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            return View();
        }

        public IActionResult OpenModal(string id)
        {
            Console.WriteLine("Attempting to open modal: " + id);

            var ModalData = PortfolioService.GetItemByID(id);

            if (ModalData.ModalID == "")
            {
                return NotFound();
            }

            Console.WriteLine("Building partial view for " + id);

            return PartialView("_ModalLayout", ModalData);
        }
    }
}
