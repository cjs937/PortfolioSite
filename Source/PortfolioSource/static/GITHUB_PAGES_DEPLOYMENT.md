# GitHub Pages Deployment Guide

This guide will help you deploy your portfolio site to GitHub Pages for free hosting.

## Prerequisites
- GitHub account
- Git installed on your local machine
- Your portfolio site code in the `static/` folder

## Step 1: Prepare Your Repository

1. **Create a new GitHub repository** (or use an existing one)
   - Go to GitHub and create a new repository
   - Name it something like `portfolio-site` or `username.github.io`
   - Make it public

2. **Initialize Git in your static folder**
   ```bash
   cd F:/Documents/Repos/PortfolioSite/Source/PortfolioSource/static
   git init
   git add .
   git commit -m "Initial commit of static portfolio site"
   ```

3. **Connect to GitHub repository**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Enable GitHub Pages

1. **Go to your repository on GitHub**
2. **Click Settings** → **Pages** (in the left sidebar)
3. **Under Source**, select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
4. **Click Save**

## Step 3: Configure Custom Domain (Optional)

If you want to use `csmith.work` instead of `username.github.io`:

1. **In GitHub Pages settings**, click "Custom domain"
2. **Enter your domain**: `csmith.work`
3. **Update your DNS settings** at your domain registrar:
   - Add an A record pointing to GitHub Pages IP addresses:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Or add a CNAME record pointing to `username.github.io`

4. **Enable HTTPS** in GitHub Pages settings (takes a few minutes)

## Step 4: Update Your Site Configuration

1. **Update any hardcoded URLs** in your HTML files
2. **Test locally** before deploying:
   ```bash
   # Simple HTTP server (Python)
   python -m http.server 8000
   
   # Or use Node.js http-server
   npx http-server
   ```
3. **Open http://localhost:8000** to test

## Step 5: Deploy Updates

Whenever you make changes to your portfolio:

```bash
cd F:/Documents/Repos/PortfolioSite/Source/PortfolioSource/static
git add .
git commit -m "Update portfolio content"
git push
```

GitHub Pages will automatically rebuild and deploy your changes within 1-2 minutes.

## Step 6: Azure Cleanup (Optional)

To stop paying for Azure hosting:

1. **Delete your Azure App Service**
   - Go to Azure Portal → App Services
   - Select your app service
   - Click "Delete"
   - Confirm deletion

2. **Delete your App Service Plan**
   - Go to App Service Plans
   - Select your plan
   - Click "Delete"
   - Confirm deletion

3. **Verify no other resources are costing money**
   - Check Cost Management → Cost analysis
   - Ensure all related resources are deleted

## Architecture Overview

Your new static site uses **Client-Side MVC Pattern**:

### Model Layer (`js/models/PortfolioModel.js`)
- Manages data from JSON files
- Handles data retrieval and storage
- Provides data access methods

### View Layer (`js/views/ModalView.js`)
- Handles template loading and rendering
- Manages UI component generation
- Template system for modals

### Controller Layer (`js/controllers/PortfolioController.js`)
- Coordinates between Model and View
- Handles user interactions
- Manages application state

### Benefits of This Approach
- **$0 hosting cost** (GitHub Pages is free)
- **Demonstrates MVC understanding** beyond just .NET
- **Separate HTML layouts** per modal for customization
- **Easy maintenance** with organized code structure
- **Fast performance** with static content delivery

## Troubleshooting

**Site not loading after deployment:**
- Wait 1-2 minutes for GitHub Pages to build
- Check the Actions tab for build errors
- Ensure all file paths are relative (not absolute)

**Custom domain not working:**
- Verify DNS settings have propagated (can take 24-48 hours)
- Check GitHub Pages settings for SSL certificate status
- Ensure A records are correctly configured

**Images not loading:**
- Check file paths in your HTML
- Ensure images are in the correct directory structure
- Verify file names match exactly (case-sensitive)

**Modals not opening:**
- Check browser console for JavaScript errors
- Ensure all JS files are loading correctly
- Verify JSON data files are accessible

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Client-Side MVC Pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modelviewcontrollermvc)

Your portfolio site is now ready for free hosting on GitHub Pages!