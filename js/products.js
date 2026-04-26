document.addEventListener('DOMContentLoaded', async () => {
    const productGrid = document.getElementById('dynamic-product-grid');
    const productCount = document.getElementById('product-count');
    const pageTitle = document.querySelector('.category-header h1');
    const brandCheckboxes = document.querySelectorAll('.brand-filter input[type="checkbox"]');
    
    const urlParams = new URLSearchParams(window.location.search);
    const categoryQuery = urlParams.get('category');       
    const subcategoryQuery = urlParams.get('subcategory'); 
    const searchQuery = urlParams.get('search');

    const data = await fetchProducts();
    let filteredProducts = data;

    if (data.length === 0) {
        productGrid.innerHTML = `<h3 style="color: red;">Error: Could not load products.</h3>`;
        return;
    }

    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredProducts = data.filter(product => {
            const pBrand = (product.brand || '').toLowerCase();
            const pCat = (product.category || '').toLowerCase();
            const pSubCat = (product.subcategory || '').toLowerCase();
            const pName = (product.product_name || `${pBrand} ${pSubCat}`).toLowerCase();

            return pName.includes(query) || pBrand.includes(query) || pCat.includes(query);
        });
        
        pageTitle.textContent = `Search results for "${searchQuery}"`;
    } 
    else if (categoryQuery && subcategoryQuery) {
        filteredProducts = data.filter(product => 
            product.category && product.category.toLowerCase() === categoryQuery.toLowerCase() &&
            product.subcategory && product.subcategory.toLowerCase() === subcategoryQuery.toLowerCase()
        );
        pageTitle.textContent = capitalizeWords(subcategoryQuery);
    } else if (categoryQuery) {
        filteredProducts = data.filter(product => 
            product.category && product.category.toLowerCase() === categoryQuery.toLowerCase()
        );
        pageTitle.textContent = capitalizeWords(categoryQuery);
    } else {
        pageTitle.textContent = "All Products";
    }

    function normalizeBrand(brand) {
        return (brand || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    }

    function getSelectedBrands() {
        return Array.from(brandCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => normalizeBrand(checkbox.value));
    }

    function applyBrandFilter(products) {
        const selectedBrands = getSelectedBrands();
        if (selectedBrands.length === 0) return products;

        return products.filter(product => {
            const productBrand = normalizeBrand(product.brand);
            return selectedBrands.some(selectedBrand => productBrand.includes(selectedBrand));
        });
    }

    function applyActiveFilters() {
        const visibleProducts = applyBrandFilter(filteredProducts);
        productCount.textContent = visibleProducts.length;
        renderProducts(visibleProducts);
    }

    brandCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyActiveFilters);
    });

    applyActiveFilters();

    function capitalizeWords(str) {
        if (!str) return '';
        return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    function generateStars(rating) {
        let starsHTML = '';
        const roundedRating = Math.round(rating || 0); 
        for (let i = 1; i <= 5; i++) {
            starsHTML += i <= roundedRating ? '★' : '☆';
        }
        return starsHTML;
    }

    function renderProducts(productsToRender) {
        productGrid.innerHTML = '';

        if (productsToRender.length === 0) {
            productGrid.innerHTML = `<h3>No products found. Try a different search.</h3>`;
            return;
        }

        productsToRender.forEach(product => {
            const productName = product.product_name || `${product.brand} ${product.subcategory}`;
            const productImage = product.image_url || `https://placehold.co/500x500/f3f4f6/6b7280?text=${product.brand}`;
            
            let badgeHTML = '';
            if (product.stock < 50) {
                badgeHTML = `<span class="product-badge badge-sale">Low Stock</span>`;
            } else if (product.discount > 50) {
                badgeHTML = `<span class="product-badge badge-new">${Math.round(product.discount)}% OFF</span>`;
            }

            const productHTML = `
                <div class="product-card">
                    ${badgeHTML}
                    <div class="product-image">
                        <img src="${productImage}" alt="${productName}" loading="lazy">
                    </div>
                    <div class="product-info">
                        <span class="product-cat-label">${product.category} &rsaquo; ${product.subcategory}</span>
                        <h3 class="product-title">
                            <a href="product.html?id=${product.product_id}">${productName}</a>
                        </h3>
                        
                        <div class="product-rating">
                            <span class="stars">${generateStars(product.rating)}</span> 
                            <span class="review-count">(${product.review_count})</span>
                        </div>

                        <div class="product-price">
                            <span class="current-price">$${product.final_price.toFixed(2)}</span>
                            <span class="old-price">$${product.price.toFixed(2)}</span>
                        </div>
                        
                        <button class="btn btn-accent btn-full" onclick="addToCart('${product.product_id}', '${productName}', ${product.final_price}, '${productImage}')">Add to Cart</button>
                    </div>
                </div>
            `;
            productGrid.insertAdjacentHTML('beforeend', productHTML);
        });
    }
});