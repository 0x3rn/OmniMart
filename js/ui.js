document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".carousel-slide");
    let currentSlideIndex = 0;
  
    if (slides.length > 0) {
      
      const nextSlide = () => {
        slides[currentSlideIndex].classList.remove("active");
  
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  
        slides[currentSlideIndex].classList.add("active");
      };
  
      setInterval(nextSlide, 5000);
    }
  });

function updateCartBadge() {
    const cartBadges = document.querySelectorAll('.cart-badge');
    const totalItems = getCartCount();
    
    cartBadges.forEach(badge => {
        if (totalItems > 0) {
            badge.textContent = totalItems;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    });
}

function initSearchBar() {
    const searchInputs = document.querySelectorAll('.search-bar input');
    const searchButtons = document.querySelectorAll('.search-bar button');

    const executeSearch = (query) => {
        if (query.trim() !== '') {
            window.location.href = `products.html?search=${encodeURIComponent(query.trim())}`;
        }
    };

    searchButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            executeSearch(searchInputs[index].value);
        });
    });

    searchInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                executeSearch(e.target.value);
            }
        });
    });
}

function initMobileMenus() {
    const homeToggle = document.getElementById('home-category-toggle');
    const homeDrawer = document.getElementById('home-category-drawer');
    const productToggle = document.getElementById('mobile-filter-toggle');
    const productSidebar = document.getElementById('products-sidebar');
    const categoryLinks = document.querySelectorAll('.sidebar-cat-link');

    if (homeToggle && homeDrawer) {
        homeToggle.addEventListener('click', () => {
            const isOpen = homeDrawer.classList.toggle('is-open');
            homeToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }

    if (productToggle && productSidebar) {
        productToggle.addEventListener('click', () => {
            const isOpen = productSidebar.classList.toggle('is-open');
            productToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }

    categoryLinks.forEach(link => {
        const subcategoryList = link.nextElementSibling;
        if (!subcategoryList || !subcategoryList.classList.contains('subcategory-list')) return;

        link.addEventListener('click', (event) => {
            if (window.innerWidth > 768) return;
            event.preventDefault();
            subcategoryList.classList.toggle('is-open');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('drawer-close-btn');
    const mobileDrawer = document.getElementById('home-category-drawer');

    if (closeBtn && mobileDrawer) {
        closeBtn.addEventListener('click', () => {
            mobileDrawer.classList.remove('is-open');
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {

    const ccInput = document.getElementById('cc-number');
    if (ccInput) {
        ccInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(.{4})/g, '$1 ').trim();
            e.target.value = value.substring(0, 23); 
        });
    }

    const expInput = document.getElementById('cc-exp');
    if (expInput) {
        expInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });

        expInput.addEventListener('blur', (e) => {
            let value = e.target.value;
            if (value.length === 5) {
                const parts = value.split('/');
                const month = parseInt(parts[0], 10);
                const year = parseInt('20' + parts[1], 10);
                
                const currentDate = new Date();
                const currentMonth = currentDate.getMonth() + 1;
                const currentYear = currentDate.getFullYear();

                if (month < 1 || month > 12 || year < currentYear || (year === currentYear && month < currentMonth)) {
                    e.target.classList.add('input-error');
                } else {
                    e.target.classList.remove('input-error');
                }
            } else if (value.length > 0) {
                e.target.classList.add('input-error');
            }
        });
    }

    const cvvInput = document.getElementById('cc-cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
        });
    }

    const emailInputs = document.querySelectorAll('input[type="email"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    emailInputs.forEach(input => {
        input.addEventListener('blur', (e) => {
            if (e.target.value.length > 0) {
                if (!emailRegex.test(e.target.value)) {
                    e.target.classList.add('input-error');
                } else {
                    e.target.classList.remove('input-error');
                }
            }
        });
        input.addEventListener('input', (e) => e.target.classList.remove('input-error'));
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const filterCloseBtn = document.getElementById('filter-close-btn');
    const productSidebar = document.getElementById('products-sidebar');
    const productToggle = document.getElementById('mobile-filter-toggle');

    if (filterCloseBtn && productSidebar) {
        filterCloseBtn.addEventListener('click', () => {
            productSidebar.classList.remove('is-open');
            if (productToggle) {
                productToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});