namespace PortfolioSource.Models
{
    public class ModalViewModel
    {
        public string ModalID { get; set; } = "";
        public string Title { get; set; } = "EmptyTitle";
        public string SizeClass { get; set; } = "modal-xl";
        public string ImageURL { get; set; } = "";

        public string BodyIntro { get; set; } = "";

        public string BodyMain { get; set; } = "";

        public string FooterHTML { get; set; } = "";
        //public string FooterHtml { get; set; }
    }
}