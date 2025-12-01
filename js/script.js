document.addEventListener('DOMContentLoaded', () => {
  const includes = document.querySelectorAll('[data-include]');
  includes.forEach((include) => {
    const file = include.getAttribute('data-include');
    fetch(file)
      .then((response) => response.text())
      .then((data) => {
        include.innerHTML = data;
        if (file === 'partials/header.html') {
          initializeHeader();
        }

        if (file === 'partials/promo.html') {
          initializePromo();
        }
        if (file === 'partials/footer.html') {
          document.getElementById('year').textContent = new Date().getFullYear();
        }
      })
      .catch((err) => console.error('Error including file:', err));
  });



  function initializeHeader() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.nav');

    if (mobileNavToggle && nav) {
      mobileNavToggle.addEventListener('click', () => {
        document.body.classList.toggle('nav-is-open');
      });
    }
  }



  function initializePromo() {
    const countdown = document.querySelector('#countdown');
    if (!countdown) return;

    const daysEl = document.querySelector('#days');
    const hoursEl = document.querySelector('#hours');
    const minutesEl = document.querySelector('#minutes');
    const secondsEl = document.querySelector('#seconds');

    const promotionEndDate = new Date();
    promotionEndDate.setDate(promotionEndDate.getDate() + 7);

    function updateCountdown() {
      const now = new Date();
      const distance = promotionEndDate - now;

      if (distance < 0) {
        clearInterval(countdownInterval);
        countdown.innerHTML = '<p>This promotion has expired.</p>';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Function to animate number changes
      function animateValueChange(element, newValue) {
        if (element.textContent !== newValue) {
          element.classList.add('animate-change');
          element.textContent = newValue;
          element.addEventListener('animationend', () => {
            element.classList.remove('animate-change');
          }, { once: true });
        }
      }

      animateValueChange(daysEl, days.toString().padStart(2, '0'));
      animateValueChange(hoursEl, hours.toString().padStart(2, '0'));
      animateValueChange(minutesEl, minutes.toString().padStart(2, '0'));
      animateValueChange(secondsEl, seconds.toString().padStart(2, '0'));
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
  }

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = document.querySelector('.cart-count');
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('.cart-total');

  function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
    calculateCartTotal();
  }

  function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    if (cartCountElements.length) {
      const total = cart.reduce((total, item) => total + item.quantity, 0);
      cartCountElements.forEach(el => {
        el.textContent = total;
      });
    }
  }

  function displayCartItems() {
    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = '';
      cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>$${item.price.toFixed(2)}</p>
          </div>
          <div class="cart-item-quantity">
            <input type="number" value="${item.quantity}" min="1" data-index="${index}" />
          </div>
          <button class="remove-from-cart-btn" data-index="${index}">&times;</button>
        `;
        cartItemsContainer.appendChild(cartItem);
      });

      const quantityInputs = document.querySelectorAll(
        '.cart-item-quantity input'
      );
      quantityInputs.forEach((input) => {
        input.addEventListener('change', (e) => {
          const index = e.target.dataset.index;
          const newQuantity = parseInt(e.target.value);
          if (newQuantity > 0) {
            cart[index].quantity = newQuantity;
            updateCart();
          }
        });
      });

      const removeButtons = document.querySelectorAll('.remove-from-cart-btn');
      removeButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
          const index = e.target.dataset.index;
          cart.splice(index, 1);
          updateCart();
        });
      });
    }
  }

  function calculateCartTotal() {
    if (cartTotal) {
      const total = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      cartTotal.textContent = `$${total.toFixed(2)}`;
    }
  }

  document.body.addEventListener('click', (e) => {
    if (e.target.matches('.add-to-cart-btn')) {
      const productElement =
        e.target.closest('.product-card') ||
        e.target.closest('.product-details');
      const productId = productElement.dataset.id;
      const productName = productElement.querySelector('h2, h1').textContent;
      const productPrice = parseFloat(
        productElement.querySelector('.price').textContent.replace('$', '')
      );
      const productImage = productElement.querySelector('img').src;

      const existingProductIndex = cart.findIndex(
        (item) => item.id === productId
      );

      if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity++;
      } else {
        cart.push({
          id: productId,
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1,
        });
      }
      updateCart();
    }
  });

  updateCartCount();
  displayCartItems();
  calculateCartTotal();
});

