/**
 * ModalView - View class for rendering modal content
 * Part of client-side MVC architecture
 */
class ModalView {
    constructor() {
        this.modalTemplates = new Map();
        this.templateCache = new Map();
        this.currentGalleryURLs = [];
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
            let template = null;

            if (!response.ok) {
                console.log(`Template not found: ${templatePath}, using base template`);
                // Fall back to base template if specific template not found
                template = await this.loadBaseTemplate();
            }
            else
            {
                template = await response.text();
            }
            
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
            const carouselControlWidth = 50; // px - must match the image's reserved side gap below
            const carouselHtml = `
                <div id="modal-carousel" class="carousel slide">
                    <div class="carousel-inner">
                        ${data.GalleryURLs.map((img, index) => `
                            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                <img src="${img}" class="d-block carousel-image expandable-carousel-img" alt="Carousel Image"
                                     style="height: 400px; width: 100%; max-width: calc(100% - ${carouselControlWidth * 2}px); object-fit: contain; cursor: pointer; margin: 0 auto;"
                                     data-src="${img}" tabindex="-1">
                            </div>
                        `).join('')}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#modal-carousel" data-bs-slide="prev"
                            style="background-color: transparent; border: none; width: ${carouselControlWidth}px;">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#modal-carousel" data-bs-slide="next"
                            style="background-color: transparent; border: none; width: ${carouselControlWidth}px;">
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

        const populatedTemplate = this.populateTemplate(template, data);
        
        // Store the gallery URLs for expand functionality
        this.currentGalleryURLs = data.GalleryURLs || [];
        
        // Add click handlers after modal is rendered
        setTimeout(() => {
            const expandableImages = document.querySelectorAll('.expandable-carousel-img');
            expandableImages.forEach(img => {
                img.addEventListener('click', () => {
                    const imageUrl = img.getAttribute('data-src');
                    this.expandImage(imageUrl, img);
                });
            });
        }, 100);
        
        return populatedTemplate;
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

    /**
     * Expand image to full size on click
     */
    expandImage(imageUrl, triggerElement) {
        // Store current scroll position. Bootstrap modals scroll on the .modal element itself
        // (overflow-y: auto), not the window, so that's what needs to be captured/restored -
        // window.scrollTo alone is a no-op for a scrolled-down modal.
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        const modalElement = document.querySelector('.modal.show');
        const modalScrollTop = modalElement ? modalElement.scrollTop : 0;

        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            cursor: pointer;
        `;

        // Create image container to properly constrain the image
        const imageContainer = document.createElement('div');
        imageContainer.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        `;

        // Create expanded image
        const expandedImg = document.createElement('img');
        expandedImg.src = imageUrl;
        expandedImg.style.cssText = `
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            display: block;
        `;

        // Add close button (white and more visible)
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.type = 'button';
        closeBtn.style.cssText = `
            position: absolute;
            top: -15px;
            right: -15px;
            background: white;
            color: black;
            border: none;
            font-size: 40px;
            cursor: pointer;
            padding: 5px 15px;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            opacity: 1;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        `;

        // Close on click
        const closeOverlay = () => {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
                // Restore scroll position
                window.scrollTo(0, scrollPosition);
                // Return focus to the thumbnail that opened the overlay (without letting the
                // browser scroll it into view) instead of letting focus fall through to <body>.
                // Otherwise Bootstrap's modal focus trap force-focuses the modal root, which
                // shows a focus outline.
                if (triggerElement) {
                    triggerElement.focus({ preventScroll: true });
                }
                // Belt-and-suspenders: explicitly restore the modal's own scroll position, since
                // that's the element that actually scrolls (not the window), and re-set it after
                // the focus() call in case any browser scrolls the modal into view despite
                // preventScroll.
                if (modalElement) {
                    modalElement.scrollTop = modalScrollTop;
                }
                document.removeEventListener('keydown', handleEscape, true);
            }
        };

        // Close button click handler (prevent propagation)
        closeBtn.onclick = (e) => {
            e.stopPropagation();
            e.preventDefault();
            closeOverlay();
        };

        overlay.onclick = closeOverlay;

        // Prevent image click from closing
        expandedImg.onclick = (e) => {
            e.stopPropagation();
        };

        // Handle ESC key - close expanded image, and stop the key from ever reaching
        // Bootstrap's modal (capture phase runs before the modal's own keydown listener).
        // Without this, the modal still sees Escape and plays its "static backdrop" shake
        // animation since we're not calling its hide().
        const handleEscape = (e) => {
            if (e.key === 'Escape' && document.body.contains(overlay)) {
                e.stopPropagation();
                e.preventDefault();
                closeOverlay();
            }
        };

        document.addEventListener('keydown', handleEscape, true);

        imageContainer.appendChild(expandedImg);
        imageContainer.appendChild(closeBtn);
        overlay.appendChild(imageContainer);
        document.body.appendChild(overlay);
    }
}




