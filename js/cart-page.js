document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('summary-subtotal');
    const taxEl = document.getElementById('summary-tax');
    const totalEl = document.getElementById('summary-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    function renderCartPage() {
        cartContainer.innerHTML = '';

        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <h2>Your cart is empty</h2>
                    <p style="margin: 15px 0;">Looks like you haven't added any items yet.</p>
                    <a href="products.html" class="btn btn-primary btn-outline">Start Shopping</a>
                </div>
            `;
            checkoutBtn.style.pointerEvents = 'none';
            checkoutBtn.style.opacity = '0.5';
            updateTotals();
            return;
        }

        checkoutBtn.style.pointerEvents = 'auto';
        checkoutBtn.style.opacity = '1';

        cart.forEach(item => {
            const itemHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h3 class="cart-item-title">${item.name}</h3>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="qty-controls">
                            <button class="qty-btn" onclick="updateQty('${item.id}', -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
                            <button class="remove-btn" onclick="removeItem('${item.id}')">Remove</button>
                        </div>
                    </div>
                    <div class="cart-item-total">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                </div>
            `;
            cartContainer.insertAdjacentHTML('beforeend', itemHTML);
        });

        updateTotals();
    }

    function updateTotals() {
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += (item.price * item.quantity);
        });

        const tax = subtotal * 0.08;
        const total = subtotal + tax;

        subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        taxEl.textContent = `$${tax.toFixed(2)}`;
        totalEl.textContent = `$${total.toFixed(2)}`;

        localStorage.setItem('omniCartTotal', `$${total.toFixed(2)}`);
    }

    window.updateQty = function(id, change) {
        let item = cart.find(i => i.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeItem(id);
            } else {
                saveCart();
                renderCartPage();
                updateCartBadge();
            }
        }
    };

    window.removeItem = function(id) {
        cart = cart.filter(i => i.id !== id);
        saveCart();
        renderCartPage();
        updateCartBadge();
    };

    renderCartPage();
});