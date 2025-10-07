using Microsoft.AspNetCore.Mvc;
using PortfolioSource.Models;
namespace PortfolioSource.Services
{
    public interface IPortfolioService
    {
        PortfolioItemViewModel GetItemByID(string ItemID = "");
    }

    public class PortfolioService : IPortfolioService
    {
        private IWebHostEnvironment Env;

        public PortfolioService(IWebHostEnvironment env)
        {
            Env = env;
        }

        private List<PortfolioItemViewModel> GetPortfolioItems()
        {
            var JsonPath = Path.Combine(Env.WebRootPath, "data", "PortfolioItems.json");

            if (!File.Exists(JsonPath))
            {
                throw new FileNotFoundException("PortfolioItems.json not found", JsonPath);
            }

            var JsonString = File.ReadAllText(JsonPath);
            var PortfolioItems = System.Text.Json.JsonSerializer.Deserialize<List<PortfolioItemViewModel>>(JsonString);

            return PortfolioItems;
        }

        public PortfolioItemViewModel GetItemByID(string ItemID = "")
        {
            var ItemList = GetPortfolioItems();

            foreach (var item in ItemList)
            {
                if (item.ModalID == ItemID)
                {
                    return item;
                }
            }

            return new PortfolioItemViewModel();
        }
    }
}