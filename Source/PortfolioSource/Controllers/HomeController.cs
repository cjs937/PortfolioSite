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

        public IActionResult OpenModal(string ItemID = "")
        {
            var ModalData = PortfolioService.GetItemByID(ItemID);

            if (ModalData.ModalID == "")
            {
                return NotFound();
            }

            return PartialView("_ModalLayout", ModalData);
        }
    }
}
