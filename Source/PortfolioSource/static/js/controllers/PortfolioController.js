/**
 * PortfolioController - Controller class for managing portfolio interactions
 * Part of client-side MVC architecture
 */
class PortfolioController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.modalShell = null;
    }

    /**
     * Initialize the controller
     */
    async initialize() {
        console.log('Initializing PortfolioController...');
        
        // Load data
        await this.model.loadPortfolioData();
        await this.model.loadSideProjData();
        
        // Set up modal shell
        this.modalShell = document.getElementById("modalShell");
        this.setupModalCleanup();
        
        console.log('PortfolioController initialized');
    }

    /**
     * Render portfolio grid
     */
    renderPortfolioGrid() {
        const portfolioGrid = document.getElementById("portfolioGrid");
        if (!portfolioGrid) return;

        const items = this.model.getAllPortfolioItems();
        items.forEach(item => {
            const gridItem = this.view.renderGridItem(item);
            portfolioGrid.appendChild(gridItem);
            
            // Add click handler - use lowercase for template file naming
            gridItem.querySelector('.portfolio-item').addEventListener('click', () => {
                this.openModal(item.ModalID.toLowerCase(), 'portfolio');
            });
        });
    }

    /**
     * Render side project grid
     */
    renderSideProjGrid() {
        const sideProjGrid = document.getElementById("sideProjGrid");
        if (!sideProjGrid) return;

        const items = this.model.getAllSideProjItems();
        items.forEach(item => {
            const gridItem = this.view.renderGridItem(item);
            sideProjGrid.appendChild(gridItem);
            
            // Add click handler - use lowercase for template file naming
            gridItem.querySelector('.portfolio-item').addEventListener('click', () => {
                this.openModal(item.ModalID.toLowerCase(), 'sideproj');
            });
        });
    }

    /**
     * Open modal by ID
     */
    async openModal(modalId, type) {
        console.log(`Opening modal: ${modalId} (${type})`);
        
        // Get item data
        let item;
        if (type === 'portfolio') {
            item = this.model.getPortfolioItem(modalId);
        } else {
            item = this.model.getSideProjItem(modalId);
        }

        if (!item) {
            console.error(`Item not found: ${modalId}`);
            return;
        }

        // Add gallery URLs - always use getGalleryURLs since we updated the logic
        item.GalleryURLs = this.model.getGalleryURLs(item);

        // Set current modal in model
        this.model.setCurrentModal(item);

        // Render modal (use lowercase for template file naming)
        const modalHtml = await this.view.renderModal(modalId.toLowerCase(), item);
        
        if (modalHtml) {
            this.modalShell.innerHTML = modalHtml;
            const modal = new bootstrap.Modal(this.modalShell);
            modal.show();
        } else {
            console.error('Failed to render modal');
        }
    }

    /**
     * Set up modal cleanup
     */
    setupModalCleanup() {
        if (this.modalShell) {
            this.modalShell.addEventListener("hidden.bs.modal", () => {
                // Clear iframe to stop video playback
                const iframe = this.modalShell.querySelector('iframe');
                if (iframe) {
                    iframe.src = "";
                }
            });
        }
    }

    /**
     * Get current modal data
     */
    getCurrentModal() {
        return this.model.getCurrentModal();
    }
}