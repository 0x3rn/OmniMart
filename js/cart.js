let cart = JSON.parse(localStorage.getItem('omniCart')) || [];

function saveCart() { 
    localStorage.setItem('omniCart', JSON.stringify(cart)); 
}

window.showGlobalToast = function(message) {

    const existingToast = document.querySelector('.toast-notification');
    if(existingToast) existingToast.remove();

    let toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

window.addToCart = function(productId, productName, price, image, qty = 1) { 
    let existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({ 
            id: productId, 
            name: productName, 
            price: price, 
            image: image,
            quantity: qty 
        });
    }

    saveCart();

    if (typeof updateCartBadge === 'function') {
        updateCartBadge();
    }

    showGlobalToast(`${qty}x ${productName} added to cart!`);
};

function getCartCount() { 
    return cart.reduce((total, item) => total + item.quantity, 0); 
}