/**
 * ModalView - View class for rendering modal content
 * Part of client-side MVC architecture
 */
class ModalView {
    constructor() {
        this.modalTemplates = new Map();
        this.templateCache = new Map();
    }

    /**
     * Load modal template by ID
     */
    async loadTemplate(modalId) {
        if (this.templateCache.has(modalId)) {
            return this.templateCache.get(modalId);
        }

        try {
            const templatePath = `modals/modal-${modalId.toLowerCase()}.html`;
            const response = await fetch(templatePath);
            
            if (!response.ok) {
                console.error(`Template not found: ${templatePath}, using base template`);
                // Fall back to base template if specific template not found
                return await this.loadBaseTemplate();
            }
            
            const template = await response.text();
            this.templateCache.set(modalId, template);
            return template;
        } catch (error) {
            console.error(`Error loading template for ${modalId}:`, error);
            // Fall back to base template on error
            return await this.loadBaseTemplate();
        }
    }

    /**
     * Load base template as fallback
     */
    async loadBaseTemplate() {
        try {
            const response = await fetch('modals/modal-base.html');
            if (response.ok) {
                return await response.text();
            }
        } catch (error) {
            console.error('Error loading base template:', error);
        }
        
        // Return a minimal template if everything fails
        return this.getMinimalTemplate();
    }

    /**
     * Get minimal template as last resort
     */
    getMinimalTemplate() {
        return `
        <div class="modal-dialog {{ModalSize}}">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center pb-5">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-10">
                                <h1 class="portfolio-modal-title text-secondary text-uppercase mb-0">
                                    <a class="title-link" href="{{WebsiteURL}}" target="_blank">{{Title}}</a>
                                </h1>
                                <br/>
                                {{VideoOrImage}}
                                <br/>
                                <div>{{Badges}}</div>
                                <br/>
                                <div class="modal-body bordered">{{BodyIntro}}</div>
                                <div>{{Gallery}}</div>
                                <div class="modal-body">{{BodyMain}}</div>
                                {{Contributions}}
                                <div class="d-flex justify-content-center gap-2">
                                    {{WebsiteButton}}
                                    <button class="btn btn-primary" data-bs-dismiss="modal">
                                        <i class="fas fa-xmark fa-fw"></i> Close Window
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0">{{Footer}}</div>
            </div>
        </div>`;
    }

    /**
     * Populate template with data
     */
    populateTemplate(template, data) {
        let populatedTemplate = template;
        
        // Replace simple placeholders
        populatedTemplate = populatedTemplate.replace(/\{\{Title\}\}/g, data.Title || '');
        populatedTemplate = populatedTemplate.replace(/\{\{ModalSize\}\}/g, data.ModalSize || 'modal-xl');
        populatedTemplate = populatedTemplate.replace(/\{\{ImageURL\}\}/g, data.ImageURL || '');
        populatedTemplate = populatedTemplate.replace(/\{\{WebsiteURL\}\}/g, data.WebsiteURL || '');
        populatedTemplate = populatedTemplate.replace(/\{\{GameplayVideoURL\}\}/g, data.GameplayVideoURL || '');
        populatedTemplate = populatedTemplate.replace(/\{\{BodyIntro\}\}/g, data.BodyIntro || '');
        populatedTemplate = populatedTemplate.replace(/\{\{BodyMain\}\}/g, data.BodyMain || '');
        populatedTemplate = populatedTemplate.replace(/\{\{Footer\}\}/g, data.Footer || '');

        // Handle badges
        if (data.Badges) {
            const badgesHtml = Object.entries(data.Badges)
                .map(([key, value]) => 
                    `<span class="badge ${value === '' ? 'text-bg-secondary' : value} m-1 p-2">${key}</span>`
                ).join('');
            populatedTemplate = populatedTemplate.replace(/\{\{Badges\}\}/g, badgesHtml);
        } else {
            populatedTemplate = populatedTemplate.replace(/\{\{Badges\}\}/g, '');
        }

        // Handle contributions
        if (data.Contributions && Object.keys(data.Contributions).length > 0) {
            const contributionsHtml = Object.entries(data.Contributions)
                .map(([key, value]) => `
                    <li>
                        <h4 class="bordered contribution-item"><strong>${key}</strong></h4>
                        ${value ? `${value}<br/><br/>` : ''}
                    </li>
                `).join('');
            
            const contributionsSection = `
                <h3 class="bordered">Contributions</h3>
                <ul class="no-bullets">
                    ${contributionsHtml}
                </ul>
            `;
            populatedTemplate = populatedTemplate.replace(/\{\{Contributions\}\}/g, contributionsSection);
        } else {
            populatedTemplate = populatedTemplate.replace(/\{\{Contributions\}\}/g, '');
        }

        // Handle gallery carousel
        if (data.GalleryURLs && data.GalleryURLs.length > 0) {
            const carouselHtml = `
                <div id="modal-carousel" class="carousel slide">
                    <div class="carousel-inner">
                        ${data.GalleryURLs.map((img, index) => `
                            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                <img src="${img}" class="d-block w-100" alt="Carousel Image">
                            </div>
                        `).join('')}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#modal-carousel" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#modal-carousel" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            `;
            populatedTemplate = populatedTemplate.replace(/\{\{Gallery\}\}/g, carouselHtml);
        } else {
            populatedTemplate = populatedTemplate.replace(/\{\{Gallery\}\}/g, '');
        }

        // Handle video or image placeholder
        if (data.GameplayVideoURL) {
            const videoHtml = `
                <div class="ratio ratio-16x9 mb-4">
                    <iframe src="${data.GameplayVideoURL}?rel=0" title="Gameplay Video" allowfullscreen></iframe>
                </div>
            `;
            populatedTemplate = populatedTemplate.replace(/\{\{VideoOrImage\}\}/g, videoHtml);
        } else {
            const imageHtml = `<img class="img-fluid rounded mb-5" src="${data.ImageURL}" alt="..." />`;
            populatedTemplate = populatedTemplate.replace(/\{\{VideoOrImage\}\}/g, imageHtml);
        }

        // Handle website button
        if (data.WebsiteURL) {
            const buttonHtml = `
                <a href="${data.WebsiteURL}" target="_blank" class="btn btn-secondary">
                    <i class="fas fa-globe fa-fw"></i>
                    Visit Website
                </a>
            `;
            populatedTemplate = populatedTemplate.replace(/\{\{WebsiteButton\}\}/g, buttonHtml);
        } else {
            populatedTemplate = populatedTemplate.replace(/\{\{WebsiteButton\}\}/g, '');
        }

        return populatedTemplate;
    }

    /**
     * Render modal with data
     */
    async renderModal(modalId, data) {
        const template = await this.loadTemplate(modalId);
        
        if (!template) {
            console.error(`Could not load template for modal ID: ${modalId}`);
            return null;
        }

        return this.populateTemplate(template, data);
    }

    /**
     * Render portfolio grid item
     */
    renderGridItem(item) {
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

        return divCol;
    }
}