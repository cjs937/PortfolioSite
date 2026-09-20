// Client-side MVC Architecture for Portfolio Site
// This file initializes the MVC components and handles page loading

let portfolioController = null;

async function initializePortfolioApp() {
    console.log('Initializing Portfolio Application...');
    
    // Create MVC components
    const model = new PortfolioModel();
    const view = new ModalView();
    portfolioController = new PortfolioController(model, view);
    
    // Initialize controller
    await portfolioController.initialize();
    
    // Render grids
    portfolioController.renderPortfolioGrid();
    portfolioController.renderSideProjGrid();
    
    console.log('Portfolio Application initialized successfully');
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initializePortfolioApp);