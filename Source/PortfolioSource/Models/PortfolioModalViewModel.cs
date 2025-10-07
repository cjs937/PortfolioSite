namespace PortfolioSource.Models
{
    public class PortfolioItemViewModel
    {
        public string ModalID { get; set; } = "";
        public string ModalSize { get; set; } = "modal-xl";
        public string fasIcon { get; set; } = "fa-star";
        public string Title { get; set; } = "EmptyTitle";
        public string ImageURL { get; set; } = "";
        public Dictionary<string, string> Badges { get; set; } = new Dictionary<string, string>(); //Title, Color
        public string BodyIntro { get; set; } = "";
        public string BodyMain { get; set; } = "";
        public List<string> Contribrutions { get; set; } = new List<string>();
        public string Footer { get; set; } = "";
        public bool UseJsonURLS { get; set; } = false;
        public List<string> GalleryURLs { get; set; } = new List<string>();
    }
}