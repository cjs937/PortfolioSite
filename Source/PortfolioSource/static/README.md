# Static Portfolio Site

This is a static version of the portfolio site using client-side MVC architecture for free hosting on GitHub Pages.

## Architecture

This site demonstrates **Client-Side MVC Pattern** with clear separation of concerns:

### Model Layer (`js/models/`)
- **PortfolioModel.js**: Manages portfolio data from JSON files
- Handles data loading, retrieval, and state management
- Provides methods for accessing portfolio and side project data

### View Layer (`js/views/`)
- **ModalView.js**: Handles template loading and UI rendering
- Template system using HTML files with placeholder variables
- Dynamic modal content generation
- Grid item rendering

### Controller Layer (`js/controllers/`)
- **PortfolioController.js**: Coordinates between Model and View
- Handles user interactions and modal management
- Manages application initialization and state

### Data Layer (`data/`)
- **PortfolioData.json**: Professional work portfolio data
- **SideProjData.json**: Side projects and learning projects
- Organized JSON structure for easy maintenance

### Template Layer (`modals/`)
- Individual HTML templates for each portfolio item
- Placeholder system (`{{variable}}`) for dynamic content
- Separate files allow per-modal customization

## Features

- **$0 hosting cost** when deployed to GitHub Pages
- **Separate HTML layouts** per modal for easy customization
- **Client-side MVC architecture** demonstrates architectural understanding
- **JSON data organization** for structured content management
- **Responsive design** using Bootstrap and custom CSS
- **Dynamic modal loading** with video and gallery support

## Local Development

1. **Start a local server:**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

2. **Open browser:**
   ```
   http://localhost:8000
   ```

## Deployment

See `GITHUB_PAGES_DEPLOYMENT.md` for detailed deployment instructions to GitHub Pages.

## Customization

### Adding New Portfolio Items

1. **Add to JSON data** (`data/PortfolioData.json` or `data/SideProjData.json`)
2. **Create modal template** (`modals/modal-{ID}.html`)
3. **No code changes needed** - the MVC system handles the rest

### Modifying Modal Layouts

Each modal has its own HTML template file:
- `modals/modal-ff.html` - Project Freefall
- `modals/modal-ss.html` - Silent Slayer
- `modals/modal-lr.html` - Lost Recipes
- `modals/modal-pc.html` - Pleasant Cove
- `modals/modal-br.html` - Breakaway
- `modals/modal-tt.html` - Task Tracker
- `modals/modal-arach.html` - Arachnotron
- `modals/modal-sss.html` - Super Sibling SMASHERINO
- `modals/modal-box.html` - The Box Ghost

### Styling

- Custom styles in `css/styles.css`
- Bootstrap integration via CDN
- Font Awesome icons via CDN

## File Structure

```
static/
├── index.html              # Main portfolio page
├── about.html              # About page
├── css/
│   ├── styles.css         # Main stylesheet
│   └── site.css           # Additional styles
├── js/
│   ├── models/
│   │   └── PortfolioModel.js    # Data management
│   ├── views/
│   │   └── ModalView.js         # Template rendering
│   ├── controllers/
│   │   └── PortfolioController.js # Application logic
│   └── portfolioModals.js   # Initialization
├── modals/
│   ├── modal-base.html     # Base template
│   ├── modal-ff.html       # Individual modal templates
│   ├── modal-ss.html
│   └── ... (one per portfolio item)
├── data/
│   ├── PortfolioData.json  # Professional work data
│   └── SideProjData.json  # Side projects data
├── assets/
│   └── img/               # Images and assets
├── GITHUB_PAGES_DEPLOYMENT.md  # Deployment guide
└── README.md              # This file
```

## Technical Details

### Template System

The View layer uses a simple template system:
- HTML templates use `{{variable}}` placeholders
- Templates are loaded dynamically via fetch
- Variables are replaced with actual data from the Model

### Data Flow

1. **Controller initializes** and loads data from Model
2. **Model fetches** JSON data from files
3. **View renders** grid items using Model data
4. **User clicks** grid item → Controller handles event
5. **Controller requests** modal content from View
6. **View loads** template and populates with Model data
7. **Controller displays** modal to user

### Benefits Over Server-Side

- **Zero hosting costs** (static hosting is free)
- **Faster performance** (no server processing)
- **Easier deployment** (no build process needed)
- **Better scalability** (CDN distribution)
- **Demonstrates architectural knowledge** (client-side MVC)

## Migration from ASP.NET Core

This static version replaces:
- **Controllers** → JavaScript Controllers
- **Views** → HTML Templates + JavaScript Views  
- **Models** → JavaScript Models + JSON data
- **Razor syntax** → Template placeholder system

The architecture demonstrates the same MVC principles but implemented entirely client-side.