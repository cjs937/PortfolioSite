using Microsoft.AspNetCore.Mvc;
using PortfolioSource.Models;
namespace PortfolioSource.Services
{
    public interface IPortfolioService
    {
        string GetViewNameByID(string ItemID = "", string DataFileName = "");
        PortfolioItemViewModel GetItemByID(string ItemID = "", string DataFileName = "");
    }

    public class PortfolioService : IPortfolioService
    {
        private IWebHostEnvironment Env;

        public PortfolioService(IWebHostEnvironment env)
        {
            Env = env;
        }

        public string GetViewNameByID(string ItemID, string DataFileName)
        {
            Console.WriteLine("Getting View Name for ID: " + ItemID);
            
            // Map modal IDs to their specific partial view names
            var viewMapping = new Dictionary<string, string>
            {
                { "FF", "_ModalFF" },
                { "SS", "_ModalSS" },
                { "LR", "_ModalLR" },
                { "PC", "_ModalPC" },
                { "BR", "_ModalBR" },
                { "TT", "_ModalTT" },
                { "ARACH", "_ModalARACH" },
                { "SSS", "_ModalSSS" },
                { "BOX", "_ModalBOX" }
            };

            if (viewMapping.ContainsKey(ItemID))
            {
                Console.WriteLine("Found view name: " + viewMapping[ItemID]);
                return viewMapping[ItemID];
            }

            Console.WriteLine("View name not found for: " + ItemID);
            return "_ModalLayout";
        }

        public PortfolioItemViewModel GetItemByID(string ItemID, string DataFileName)
        {
            Console.WriteLine("Getting Item By ID: " + ItemID);
            var ItemList = GetPortfolioItems(DataFileName);

            foreach (var item in ItemList)
            {
                Console.WriteLine("Checking " + item.ModalID);

                if (item.ModalID == ItemID)
                {
                    Console.WriteLine("Found " + ItemID + " returning..");

                    if (!item.UseJsonURLS)
                    {
                        item.GalleryURLs = GetGalleryURLs(item);
                    }

                    return item;
                }
            }

            Console.WriteLine(ItemID + "not found, returning empty item..");
            return new PortfolioItemViewModel();
        }


        private List<PortfolioItemViewModel> GetPortfolioItems(string DataFileName)
        {
            var JsonPath = Path.Combine(Env.WebRootPath, "data", DataFileName);

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

        private List<string> GetGalleryURLs(PortfolioItemViewModel Item)
        { 
            var RelativePath = $"assets/img/{Item.ModalID}/Carousel/";
            var RootPath = Path.Combine(Env.WebRootPath, "assets", "img", Item.ModalID, "Carousel");

            Console.WriteLine("Looking for gallery images in: " + RootPath);

            if (!Directory.Exists(RootPath))
            {
                Console.WriteLine("Gallery directory not found: " + RootPath);
                return new List<string>();
            }

            var Files = Directory.GetFiles(RootPath);
            var GalleryURLs = new List<string>();

            foreach (var file in Files)
            {
                var ImgPath = RelativePath + Path.GetFileName(file);
                GalleryURLs.Add(ImgPath);
                Console.WriteLine("Added img path: " + ImgPath);
            }

            return GalleryURLs;
        }
    }
}