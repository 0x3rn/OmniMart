document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const loadingState = document.getElementById('loading-state');
    const productContent = document.getElementById('product-content');

    if (!productId) {
        loadingState.innerHTML = `<h3 style="color: var(--clr-danger);">Product not found. Return to <a href="products.html" style="text-decoration: underline;">shop</a>.</h3>`;
        return;
    }

    try {
        let apiProducts = [];
        try {
            apiProducts = await fetchProducts();
        } catch (fetchError) {
            console.warn("Could not fetch API products, relying on fallback data.", fetchError);
        }

        const featuredFallback = [
            { id: 'featured-smartphone-256gb', product_name: 'Omni Pro Smartphone 256GB', price: 1099.00, final_price: 899.00, category: 'Electronics', subcategory: 'Smartphones', brand: 'Omni', image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80', description: 'Experience the next generation of mobile technology. Features a stunning 6.7-inch OLED display, pro-grade camera system, and all-day battery life.', rating: 5, review_count: 128, stock: 45, discount: 18 },
            { id: 'featured-velocity-sneakers', product_name: 'Velocity Run Air Sneakers', price: 120.00, final_price: 120.00, category: 'Fashion', subcategory: 'Shoes', brand: 'Velocity', image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80', description: 'Lightweight, breathable, and designed for maximum speed and comfort on any terrain. Features responsive cushioning.', rating: 4, review_count: 84, stock: 120, discount: 0 },
            { id: 'featured-noise-canceling-headphones', product_name: 'Noise-Canceling Headphones', price: 250.00, final_price: 250.00, category: 'Electronics', subcategory: 'Audio', brand: 'SoundMax', image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80', description: 'Immerse yourself in pure audio with industry-leading active noise cancellation. Enjoy up to 30 hours of wireless listening.', rating: 5, review_count: 342, stock: 8, discount: 0 },
            { id: 'featured-wireless-earbuds-pro', product_name: 'Wireless Earbuds Pro', price: 149.00, final_price: 149.00, category: 'Electronics', subcategory: 'Audio', brand: 'SoundMax', image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', description: 'Compact, powerful, and sweat-resistant earbuds perfect for workouts or commutes. Includes a wireless charging case.', rating: 4, review_count: 56, stock: 200, discount: 0 },
            { id: 'featured-minimalist-smartwatch', product_name: 'Minimalist Smartwatch', price: 199.00, final_price: 199.00, category: 'Electronics', subcategory: 'Wearables', brand: 'TimeTech', image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80', description: 'Track your fitness, receive notifications, and monitor your heart rate with this sleek, minimalist smartwatch.', rating: 5, review_count: 215, stock: 60, discount: 0 },
            { id: 'featured-espresso-machine', product_name: 'Premium Espresso Machine', price: 450.00, final_price: 349.00, category: 'Home', subcategory: 'Appliances', brand: 'CafeBrew', image_url: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=500&q=80', description: 'Brew barista-quality espresso at home. Features a built-in milk frother and precise temperature controls.', rating: 4, review_count: 92, stock: 15, discount: 22 },
            { id: 'featured-gaming-console-1tb', product_name: 'NextGen Gaming Console 1TB', price: 499.00, final_price: 499.00, category: 'Electronics', subcategory: 'Gaming', brand: 'PlayTech', image_url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=500&q=80', description: 'Experience lightning-fast loading, ultra-high-definition gaming, and incredibly realistic graphics.', rating: 5, review_count: 1045, stock: 5, discount: 0 },
            { id: 'featured-security-camera-4k', product_name: 'WiFi Security Camera 4K', price: 99.99, final_price: 79.99, category: 'Home', subcategory: 'Smart Home', brand: 'SecureEye', image_url: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=500&q=80', description: 'Keep your home safe with crystal clear 4K video monitoring, two-way audio, and advanced motion detection.', rating: 4, review_count: 412, stock: 85, discount: 20 }
        ];
        
        const safeApiProducts = Array.isArray(apiProducts) ? apiProducts : [];
        const allProducts = [...safeApiProducts, ...featuredFallback];

        const product = allProducts.find(p => p.product_id === productId || p.id === productId);

        if (!product) {
            loadingState.innerHTML = `<h3 style="color: var(--clr-danger);">Product not found. Return to <a href="products.html" style="text-decoration: underline;">shop</a>.</h3>`;
            return;
        }

        const productName = product.product_name || `${product.brand} ${product.subcategory}`;
        const productPrice = product.final_price || product.price;
        const oldPrice = product.final_price < product.price ? product.price : null;
        const productImage = product.image_url || `https://placehold.co/800x800/f3f4f6/6b7280?text=${product.brand}`;
        
        document.getElementById('pd-title').textContent = productName;
        document.getElementById('pd-price').textContent = `$${productPrice.toFixed(2)}`;
        document.getElementById('pd-description').textContent = product.description || "No detailed description available for this product.";
        document.getElementById('pd-category-link').textContent = product.category || 'General';
        document.getElementById('pd-brand-label').textContent = product.brand || 'Unbranded';
        document.getElementById('pd-sku').textContent = product.sku || productId.substring(0,8).toUpperCase();
        document.getElementById('pd-category').textContent = `${product.category} > ${product.subcategory}`;
        
        if (oldPrice) {
            const oldPriceEl = document.getElementById('pd-old-price');
            oldPriceEl.textContent = `$${oldPrice.toFixed(2)}`;
            oldPriceEl.style.display = 'inline-block';
            
            if (product.discount > 0) {
                const badgeEl = document.getElementById('pd-discount-badge');
                badgeEl.textContent = `${Math.round(product.discount)}% OFF`;
                badgeEl.style.display = 'inline-block';
            }
        }

        document.getElementById('pd-stars').textContent = generateStars(product.rating);
        document.getElementById('pd-reviews').textContent = `(${product.review_count || 0} reviews)`;

        const stockEl = document.getElementById('pd-stock');
        if (product.stock && product.stock < 10) {
            stockEl.textContent = `Only ${product.stock} left in stock - order soon`;
            stockEl.style.color = 'var(--clr-danger)';
        } else if (product.stock === 0) {
            stockEl.textContent = 'Out of Stock';
            stockEl.style.color = 'var(--clr-danger)';
            document.getElementById('pd-add-to-cart').disabled = true;
            document.getElementById('pd-add-to-cart').style.opacity = '0.5';
        }

        const mainImgEl = document.getElementById('main-product-image');
        mainImgEl.src = productImage;
        
        const thumbContainer = document.getElementById('thumbnail-list');
        thumbContainer.innerHTML = `<img src="${productImage}" class="thumb-img active" alt="${productName} thumb">`;

        const qtyInput = document.getElementById('pd-qty-input');
            
        document.getElementById('pd-qty-minus').addEventListener('click', () => {
            let val = parseInt(qtyInput.value);
            if (val > 1) qtyInput.value = val - 1;
        });

        document.getElementById('pd-qty-plus').addEventListener('click', () => {
            let val = parseInt(qtyInput.value);
            if (val < 99) qtyInput.value = val + 1;
        });

        qtyInput.addEventListener('change', (e) => {
            let val = parseInt(e.target.value);
            if (isNaN(val) || val < 1) e.target.value = 1;
            if (val > 99) e.target.value = 99; 
        });

        document.getElementById('pd-add-to-cart').addEventListener('click', () => {
            const qty = parseInt(qtyInput.value);
            
            addToCart(product.product_id || product.id, productName, productPrice, productImage, qty);
            
            const btn = document.getElementById('pd-add-to-cart');
            const originalText = btn.textContent;
            btn.textContent = 'Added!';
            btn.style.backgroundColor = 'var(--clr-success)';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = 'var(--clr-accent)';
            }, 1500);
        });

        loadingState.style.display = 'none';
        productContent.style.display = 'grid';

        function generateStars(rating) {
            let starsHTML = '';
            const roundedRating = Math.round(rating || 0); 
            for (let i = 1; i <= 5; i++) {
                starsHTML += i <= roundedRating ? '★' : '☆';
            }
            return starsHTML;
        }

    } catch (error) {
        console.error("Error loading product page:", error);
        loadingState.innerHTML = `<h3 style="color: var(--clr-danger);">An error occurred loading this product. Please check your console.</h3>`;
    }
});