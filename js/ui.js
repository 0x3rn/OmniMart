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