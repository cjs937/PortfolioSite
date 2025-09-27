namespace PortfolioSource.Models
{
    public class GalleryViewModel
    {
        // GalleryViewModel(List<string> imageURLs, string galleryTitle)
        // {
        //     ImageURLs = imageURLs;
        //     GalleryTitle = galleryTitle;
        // }

        public List<string> ImageURLs { get; set; } = new List<string>();
        public string GalleryTitle { get; set; } = "Gallery";
    }
}