/**
 * PortfolioModel - Model class for managing portfolio data
 * Part of client-side MVC architecture
 */
class PortfolioModel {
    constructor() {
        this.portfolioData = [];
        this.sideProjData = [];
        this.currentModal = null;
    }

    /**
     * Load portfolio data from JSON files
     */
    async loadPortfolioData() {
        try {
            const response = await fetch('data/PortfolioData.json');
            this.portfolioData = await response.json();
            console.log('Portfolio data loaded:', this.portfolioData.length, 'items');
        } catch (error) {
            console.error('Error loading portfolio data:', error);
        }
    }

    /**
     * Load side project data from JSON files
     */
    async loadSideProjData() {
        try {
            const response = await fetch('data/SideProjData.json');
            this.sideProjData = await response.json();
            console.log('Side project data loaded:', this.sideProjData.length, 'items');
        } catch (error) {
            console.error('Error loading side project data:', error);
        }
    }

    /**
     * Get portfolio item by ID (case-insensitive)
     */
    getPortfolioItem(id) {
        return this.portfolioData.find(item => item.ModalID.toLowerCase() === id.toLowerCase());
    }

    /**
     * Get side project item by ID (case-insensitive)
     */
    getSideProjItem(id) {
        return this.sideProjData.find(item => item.ModalID.toLowerCase() === id.toLowerCase());
    }

    /**
     * Get all portfolio items
     */
    getAllPortfolioItems() {
        return this.portfolioData;
    }

    /**
     * Get all side project items
     */
    getAllSideProjItems() {
        return this.sideProjData;
    }

    /**
     * Get gallery URLs for a specific item
     */
    getGalleryURLs(item) {
        if (item.UseJsonURLS && item.GalleryURLs) {
            return item.GalleryURLs;
        }
        
        // For items without explicit gallery URLs, return empty array
        // Client-side cannot scan directories due to browser security
        return [];
    }

    /**
     * Set current modal item
     */
    setCurrentModal(item) {
        this.currentModal = item;
    }

    /**
     * Get current modal item
     */
    getCurrentModal() {
        return this.currentModal;
    }
}