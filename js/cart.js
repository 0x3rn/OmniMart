let cart = JSON.parse(localStorage.getItem('omniCart')) ||[];

function saveCart() {
    localStorage.setItem('omniCart', JSON.stringify(cart));
}

window.addToCart = function(productId, productName, price, image) {
    let existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ 
            id: productId, 
            name: productName, 
            price: price, 
            image: image,
            quantity: 1 
        });
    }
    
    saveCart();
    
    if (typeof updateCartBadge === 'function') {
        updateCartBadge();
    }
};

function getCartCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}