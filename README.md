# CarryCharm E-Commerce Website

A modern, responsive, and fully functional e-commerce front-end for "CarryCharm," a fictional online store specializing in stylish bags and accessories.

This project was developed to showcase a premium user experience with a clean design, interactive features, and a complete shopping flow from browsing products to managing a persistent shopping cart.

## Features

- **Fully Responsive Design:** The layout is optimized for a seamless experience on mobile, tablet, and desktop devices.
- **Dynamic Product Pages:** A single `product.html` template is used to dynamically generate pages for each unique product using URL parameters.
- **Interactive Shopping Cart:**
    - Add items to the cart from the shop or product pages.
    - Real-time cart icon updates in the header.
    - Persistent cart state using `localStorage`.
    - Ability to update item quantities and remove items directly from the cart page.
    - Dynamic calculation of totals.
- **Shop Page Functionality:**
    - Filter products by category.
    - Search for products by name or description.
- **Component-Based Structure:** The UI is built using reusable HTML partials that are dynamically included via JavaScript.
- **Optimized CSS:** A PostCSS build process with `PurgeCSS` is set up to automatically remove unused CSS for production builds.

## Technologies Used

-   **HTML5**
-   **CSS3:** With CSS Variables for easy theming.
-   **JavaScript (ES6+):** For all dynamic functionality, including page rendering, cart management, and event handling.
-   **PostCSS:** A tool for transforming CSS with plugins.
    -   `autoprefixer`: Adds vendor prefixes for cross-browser compatibility.
    -   `@fullhuman/postcss-purgecss`: Removes unused CSS for production.
-   **npm:** For managing development dependencies.

## Folder Structure

```
.
├── /css/
│   └── styles.css        # Main source CSS file. Edit this file.
├── /dist/
│   └── styles.css        # Auto-generated, optimized CSS file for production. Do not edit directly.
├── /js/
│   └── script.js         # Main JavaScript file containing all website logic.
├── /partials/
│   ├── header.html       # Reusable header component.
│   ├── footer.html       # Reusable footer component.
│   └── ...               # Other reusable HTML components.
├── /public/
│   └── ...               # Static assets like images.
├── index.html            # Home page.
├── shop.html             # Shop page with product grid and filters.
├── product.html          # Template for single product detail pages.
├── cart.html             # Shopping cart page.
├── about.html            # About Us page.
├── contact.html          # Contact Us page.
├── package.json          # Project dependencies and scripts.
└── postcss.config.js     # Configuration for the PostCSS build process.
```

## Installation and Setup

This is a static front-end project but includes a build step for CSS optimization.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd carrycharm
    ```
3.  **Install dependencies:**
    This project uses `npm` to manage the PostCSS build tools.
    ```bash
    npm install
    ```

## Usage

Simply open the `.html` files in your browser to view the website. For the best experience, it is recommended to use a live server extension in your code editor (like VS Code's "Live Server") to handle the dynamic `fetch` requests for HTML partials correctly.

### Build Scripts

-   **Development Build:** To build the CSS for development (includes all styles):
    ```bash
    npm run build:dev
    ```
-   **Production Build:** To build the CSS for production (runs `PurgeCSS` to remove unused styles):
    ```bash
    npm run build:prod
    ```

## Contribution Guidelines

Contributions are welcome! Please follow these steps:
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/YourFeature`).
6.  Open a Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
