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
            var JsonPath = Path.Combine(Env.WebRootPath, "data", "PortfolioData.json");

            if (!File.Exists(JsonPath))
            {
                throw new FileNotFoundException("PortfolioItems.json not found", JsonPath);
            }

            var JsonString = File.ReadAllText(JsonPath);
            var PortfolioItems = System.Text.Json.JsonSerializer.Deserialize<List<PortfolioItemViewModel>>(JsonString);

            if (PortfolioItems == null)
            {
                throw new Exception("Failed to deserialize PortfolioItems.json");
            }

            return PortfolioItems;
        }

        public PortfolioItemViewModel GetItemByID(string ItemID)
        {
            Console.WriteLine("Getting Item By ID: " + ItemID);
            var ItemList = GetPortfolioItems();

            foreach (var item in ItemList)
            {
                Console.WriteLine("Checking " + item.ModalID);

                if (item.ModalID == ItemID)
                {
                    Console.WriteLine("Found " + ItemID + " returning..");

                    return item;
                }
            }

            Console.WriteLine(ItemID + "not found, returning empty item..");
            return new PortfolioItemViewModel();
        }
    }
}