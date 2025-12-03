# CarryCharm E-Commerce Website: Detailed Documentation

This document provides a detailed explanation of the project's architecture, file structure, and core functionalities.

## 1. High-Level Architecture

The project is a modern static front-end website that simulates a dynamic, single-page application (SPA) experience using client-side JavaScript. It relies on a component-based structure for the UI and a centralized JavaScript file for all logic and state management.

-   **Structure:** Static HTML files serve as templates or entry points.
-   **Styling:** A single source CSS file (`css/styles.css`) is processed by PostCSS into a final, optimized stylesheet (`dist/styles.css`) linked by all pages.
-   **Logic:** The `js/script.js` file is the central engine of the website. It handles dynamic content loading, all user interactions, and state management (like the shopping cart).

## 2. Core Technologies

-   **HTML5**
-   **CSS3** (with CSS Variables for theming)
-   **JavaScript (ES6+)**
-   **PostCSS:** For CSS processing.
    -   `autoprefixer`: Ensures cross-browser compatibility.
    -   `@fullhuman/postcss-purgecss`: Removes unused CSS in production builds.
-   **npm:** For managing development dependencies related to the build process.

---

## 3. Detailed File & Folder Structure

### `/css/`
-   `styles.css`: **This is the main source CSS file.** All new styles or changes should be made here. It contains the core theme variables, base styles, and utility classes for the entire project.

### `/dist/`
-   `styles.css`: **This is an auto-generated file.** Do not edit it directly. It is the output of the PostCSS build process. All HTML pages link to this final stylesheet.

### `/js/`
-   `script.js`: **The "brain" of the website.** This single file contains all JavaScript logic:
    -   Centralized product data.
    -   Shopping cart state management (`localStorage`).
    -   Dynamic rendering of the shop, product, and cart pages.
    -   Event handling for all user interactions (e.g., clicks, form inputs).
    -   Loading of HTML partials.

### `/partials/`
This folder contains reusable HTML snippets that are dynamically included in the main pages. This approach keeps the main HTML files clean and makes components easy to manage.
-   `header.html`: The website's main navigation header.
-   `footer.html`: The website's main footer.
-   `hero.html`, `featured-products.html`, `promo.html`, `categories.html`, `testimonials.html`: These are all modular sections included in `index.html` to build the home page.

### `/public/`
This directory holds all static assets, primarily images used for products.

### Root Files
-   `index.html`: The main landing page. It is constructed by including various partials.
-   `shop.html`: The main shop page. It contains containers for filters and the product grid, which are then populated by `js/script.js`.
-   `product.html`: A template for displaying a single product. The content is dynamically generated based on a product ID from the URL.
-   `cart.html`: The shopping cart page. The list of items and the order summary are dynamically generated.
-   `about.html` & `contact.html`: Themed content pages with self-contained styles.
-   `package.json`: Defines project metadata, dependencies (`devDependencies`), and `npm` scripts for the build process.
-   `postcss.config.js`: Configures the PostCSS build process, defining which plugins (like `autoprefixer` and `purgecss`) to use.

---

## 4. JavaScript Core Functionality (`js/script.js`)

The entire interactive experience is powered by this file, which executes after the main DOM is loaded.

### Initialization Process
1.  The `DOMContentLoaded` event listener fires.
2.  The script identifies all `<div data-include="...">` elements.
3.  It uses `Promise.all` to fetch all HTML partials concurrently.
4.  Once all partials are loaded and injected, the `initializePage()` function is called.
5.  `initializePage()` then runs all necessary setup functions:
    -   It initializes the "Add to Cart" modal.
    -   It updates the cart icon count based on `localStorage`.
    -   It initializes page-specific functions (like the header, promo timer, shop grid, etc.).

### State Management
-   **`products` array:** A constant array of product objects serves as the single source of truth for all product data.
-   **`cart` array:** A `let` variable that holds the current state of the shopping cart. It is initialized from `localStorage` on page load. The `updateCart()` function is the primary way to modify the cart, as it ensures the state is always saved back to `localStorage`.

### Page-Specific Rendering
To keep the application modular, the script contains several functions that only run if they find their target elements on the current page.
-   `renderShopProducts()`: Checks for `.product-grid-redesigned`. If found, it filters the `products` array based on the search and category inputs and renders the corresponding product cards.
-   `renderProductPage()`: Checks for `.product-page-grid`. If found, it parses the product ID from the URL and renders the details for that specific product.
-   `renderCartPage()`: Checks for `#cart-items`. If found, it renders the list of items from the `cart` array and attaches event listeners for quantity changes and item removal.

### Event Handling
-   A single, delegated event listener on `document.body` handles all "Add to Cart" clicks. This is efficient and works for both statically and dynamically generated buttons.
-   Page-specific listeners (e.g., for shop filters or cart item controls) are attached inside the `initializePage` function after ensuring the relevant elements exist on the page.

---

## 5. Build Process

The project uses PostCSS to process the source CSS file.
-   **Development (`npm run build:dev`):** This script runs `autoprefixer`, which adds necessary vendor prefixes to CSS rules for broad browser support.
-   **Production (`npm run build:prod`):** This script runs both `autoprefixer` and `@fullhuman/postcss-purgecss`. PurgeCSS scans all `.html` and `.js` files, intelligently identifies which CSS classes are actually being used, and removes all unused styles from the final `dist/styles.css` file. This results in a significantly smaller file size for faster load times in a live environment.
