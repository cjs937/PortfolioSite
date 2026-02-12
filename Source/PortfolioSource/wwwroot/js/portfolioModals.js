async function LoadPortfolioGrid() {
    const result = await fetch("/data/PortfolioData.json");
    const jsonItems = await result.json();

    const divGrid = document.getElementById("portfolioGrid");

    jsonItems.forEach(item => {
        const divCol = document.createElement("div");
        divCol.className = "col-md-6 col-lg-4 mb-5";

        const divPortfolioItem = document.createElement("div");
        divPortfolioItem.className = "portfolio-item mx-auto";
        divPortfolioItem.setAttribute("data-bs-toggle", "#modal");
        divPortfolioItem.setAttribute("data-bs-target", "#" + item.ModalID);
        divPortfolioItem.setAttribute("id", item.ModalID);

        const divCaption = document.createElement("div");
        divCaption.className = "portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100";

        const divCaptionContent = document.createElement("div");
        divCaptionContent.className = "portfolio-item-caption-content text-center text-white";

        const icon = document.createElement("i");
        icon.className = item.Icon;

        const img = document.createElement("img");
        img.className = "img-fluid uniform-grid-img";
        img.src = item.ImageURL || "";
        img.alt = item.Title || "...";

        divCaptionContent.appendChild(icon);
        divCaption.appendChild(divCaptionContent);
        divPortfolioItem.appendChild(divCaption);
        divPortfolioItem.appendChild(img);
        divCol.appendChild(divPortfolioItem);
        divGrid.appendChild(divCol);

        console.log("Registering Modal: " + item.ModalID);

        divPortfolioItem.addEventListener("click", function()
        {
            console.log(item.ModalID + " clicked");

            OpenModal(item.ModalID);
        });
    });
}

async function OpenModal(ModalID)
{
    console.log("Opening Modal: " + ModalID);
    const response = await fetch(`/Home/OpenModal/${ModalID}`);
    const partialViewText = await response.text();

    document.getElementById("modalShell").innerHTML = partialViewText;
    const modal = new bootstrap.Modal(document.getElementById("modalShell"));
    modal.show();
}

document.addEventListener("DOMContentLoaded", LoadPortfolioGrid);