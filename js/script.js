document.addEventListener('DOMContentLoaded', () => {

  // =================================================================
  // 1. GLOBAL DATA & STATE
  // =================================================================

  const products = [
      { id: "p1", name: "The Commuter", category: "Backpack", price: 4500, image: "public/backpacks.jpeg", description: "The perfect backpack for your daily commute, with a padded laptop sleeve and multiple organization pockets." },
      { id: "p2", name: "Everyday Tote", category: "Tote", price: 2800, image: "public/tote1.webp", description: "A stylish and spacious tote bag that will carry everything you need for your day, from work to workout." },
      { id: "p3", name: "Chic Crossbody", category: "Handbag", price: 3300, image: "public/handbags.jpeg", description: "An elegant crossbody bag that combines style and practicality, perfect for a night out or a day in the city." },
      { id: "p4", name: "Adventure Duffel", category: "Duffel", price: 5200, image: "public/duffels1.jpeg", description: "Your ideal companion for weekend getaways or gym sessions, made from durable, water-resistant materials." },
      { id: "p5", name: "Minimalist Wallet", category: "Wallet", price: 2000, image: "public/wallets.jpeg", description: "A slim and sleek wallet with enough space for your essential cards and cash, without the bulk." },
      { id: "p6", name: "City Explorer", category: "Backpack", price: 4700, image: "public/backpacks1.jpeg", description: "Navigate the urban jungle with this versatile and durable backpack, designed for comfort and style." },
      { id: "p7", name: "Market Haul", category: "Tote", price: 2300, image: "public/tote3.jpeg", description: "Your go-to tote for your market runs, beach trips, or as an everyday carry-all." },
      { id: "p8", name: "Evening Elegance", category: "Clutch", price: 2900, image: "public/clutch.jpeg", description: "A sophisticated clutch that adds a touch of glamour to any evening outfit." },
      { id: "p9", name: "The Globetrotter", category: "Duffel", price: 5500, image: "public/duffels2.jpeg", description: "Spacious, durable, and ready for any adventure. This duffel is built to handle life on the road." },
      { id: "p10", name: "The Organizer", category: "Wallet", price: 2200, image: "public/wallets.jpeg", description: "Keep your finances in perfect order with this wallet, featuring multiple compartments and a secure zip closure." },
      { id: "p11", name: "Urban Carryall", category: "Backpack", price: 3800, image: "public/backpacks2.jpg", description: "A functional and fashionable backpack that's ready for anything your day throws at you." },
      { id: "p12", name: "Canvas Shopper", category: "Tote", price: 2100, image: "public/tote2.webp", description: "A simple yet sturdy canvas shopper tote, perfect for your daily errands." }
  ];

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // =================================================================
  // 2. CORE FUNCTIONS
  // =================================================================

  function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    if (document.getElementById('cart-items')) {
        renderCartPage();
    }
  }

  function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    if (cartCountElements.length) {
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      cartCountElements.forEach(el => {
        el.textContent = totalItems;
      });
    }
  }

  function showAddToCartModal(product) {
      const modal = document.getElementById('add-to-cart-modal');
      if(modal) {
          document.getElementById('modal-product-image').src = product.image;
          document.getElementById('modal-product-name').textContent = product.name;
          document.getElementById('modal-product-price').textContent = `PKR ${product.price.toFixed(2)}`;
          modal.classList.add('visible');
      }
  }

  // =================================================================
  // 3. PAGE-SPECIFIC RENDER FUNCTIONS
  // =================================================================

  function renderShopProducts() {
    const shopGrid = document.querySelector('.product-grid-redesigned');
    if (!shopGrid) return;

    const categoryFilter = document.getElementById('category-filter').value;
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    const filteredProducts = products.filter(product => {
        const matchesCategory = categoryFilter === 'all' || product.category.toLowerCase() === categoryFilter;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    shopGrid.innerHTML = '';
    if (filteredProducts.length === 0) {
        shopGrid.innerHTML = '<p>No products found matching your criteria.</p>';
        return;
    }
    
    filteredProducts.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card-redesigned';
        card.style.animationDelay = `${index * 0.05}s`;
        card.dataset.id = product.id;
        
        card.innerHTML = `
            <a href="product.html?id=${product.id}" class="card-link">
                <div class="card-header-redesigned">
                    <div class="category-tag">${product.category}</div>
                    <img src="${product.image}" alt="${product.name}" class="card-image-redesigned">
                </div>
                <div class="card-content-redesigned">
                    <h3 class="product-title-redesigned">${product.name}</h3>
                </div>
            </a>
            <div class="card-content-redesigned" style="padding-top: 0;">
                 <div class="product-footer-redesigned">
                    <span class="price-redesigned">PKR ${product.price.toFixed(2)}</span>
                    <button class="btn-redesigned btn-primary-redesigned add-to-cart-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        `;
        shopGrid.appendChild(card);
    });
  }

  function renderProductPage() {
    const productPageGrid = document.querySelector('.product-page-grid');
    if (!productPageGrid) return;

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const product = products.find(p => p.id === productId);

    if (product) {
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-image').alt = product.name;
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `PKR ${product.price.toFixed(2)}`;
        document.getElementById('product-description').textContent = product.description;
        document.querySelector('.product-details').dataset.id = product.id;
    } else {
        productPageGrid.innerHTML = '<h2>Product not found</h2><p>Sorry, the product you are looking for does not exist.</p>';
    }
  }
  
  function renderCartPage() {
      const container = document.getElementById('cart-items');
      const summary = document.getElementById('cart-summary');
      const emptyMsg = document.getElementById('cart-empty');
      if (!container) return;

      if (cart.length === 0) {
          summary.style.display = 'none';
          emptyMsg.style.display = 'block';
          container.innerHTML = '';
      } else {
          summary.style.display = 'block';
          emptyMsg.style.display = 'none';
          
          container.innerHTML = cart.map(item => `
            <div class="cart-item-row" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-price">PKR ${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease-btn" aria-label="Decrease quantity">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn increase-btn" aria-label="Increase quantity">+</button>
                </div>
                <p class="cart-item-total-price">PKR ${(item.price * item.quantity).toFixed(2)}</p>
                <button class="cart-item-remove-btn" aria-label="Remove item">&times;</button>
            </div>
          `).join('');
          
          calculateCartTotal();
      }
  }

  function calculateCartTotal() {
      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      document.querySelectorAll('.cart-total').forEach(el => {
          el.textContent = `PKR ${total.toFixed(2)}`;
      });
  }

  // =================================================================
  // 4. INITIALIZATION & EVENT LISTENERS
  // =================================================================

  function initializePage() {
    initModal();
    updateCart();
    initializeHeader();
    renderShopProducts();
    renderProductPage();
    renderCartPage();
    
    const categoryFilter = document.getElementById('category-filter');
    const searchInput = document.getElementById('search-input');
    if(categoryFilter) categoryFilter.addEventListener('change', renderShopProducts);
    if(searchInput) searchInput.addEventListener('input', renderShopProducts);
    
    const cartItemsContainer = document.getElementById('cart-items');
    if(cartItemsContainer) {
        cartItemsContainer.addEventListener('click', e => {
            const target = e.target;
            const parentRow = target.closest('.cart-item-row');
            if (!parentRow) return;
            const productId = parentRow.dataset.id;
            const productIndex = cart.findIndex(item => item.id === productId);

            if (productIndex === -1) return;

            if(target.matches('.increase-btn')) {
                cart[productIndex].quantity++;
            }
            if(target.matches('.decrease-btn')) {
                if (cart[productIndex].quantity > 1) {
                    cart[productIndex].quantity--;
                } else {
                    cart.splice(productIndex, 1);
                }
            }
            if(target.matches('.cart-item-remove-btn')) {
                cart.splice(productIndex, 1);
            }
            updateCart();
        });
    }
  }

  const includes = document.querySelectorAll('[data-include]');
  Promise.all(Array.from(includes).map(include => {
    const file = include.getAttribute('data-include');
    return fetch(file).then(res => res.text()).then(data => include.innerHTML = data);
  })).then(initializePage);

  function initModal() {
      const modal = document.getElementById('add-to-cart-modal');
      if(modal) {
          const continueShoppingBtn = document.getElementById('continue-shopping-btn');
          const closeModal = () => modal.classList.remove('visible');
          if(continueShoppingBtn) continueShoppingBtn.addEventListener('click', closeModal);
          modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
      }
  }

  function initializeHeader() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggle) {
      mobileNavToggle.addEventListener('click', () => document.body.classList.toggle('nav-is-open'));
    }
  }
  
  document.body.addEventListener('click', (e) => {
    const addToCartBtn = e.target.closest('.add-to-cart-btn');
    if (addToCartBtn) {
      e.preventDefault();
      
      const productElement = e.target.closest('[data-id]');
      if (productElement) {
        const productId = productElement.dataset.id;
        const product = products.find(p => p.id === productId);

        if (product) {
          const existingProductIndex = cart.findIndex(item => item.id === productId);
          if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity++;
          } else {
            cart.push({ ...product, quantity: 1 });
          }
          updateCart();
          showAddToCartModal(product);
        }
      }
    }
  });
});