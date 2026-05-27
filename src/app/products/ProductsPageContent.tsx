'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getAllProducts, searchProducts, getProductsByCategory, getProductsByCategoryAndSubcategory } from '@/lib/data';

const categories = [
  {
    name: 'Electronics',
    slug: 'Electronics',
    subcategories: ['Laptops', 'Smartphones', 'Audio'],
  },
  {
    name: 'Fashion',
    slug: 'Fashion',
    subcategories: ["Men's Clothing", "Women's Clothing", 'Shoes'],
  },
  {
    name: 'Beauty',
    slug: 'Beauty',
    subcategories: ['Skincare', 'Makeup', 'Haircare'],
  },
  {
    name: 'Sports',
    slug: 'Sports',
    subcategories: ['Fitness', 'Camping'],
  },
  {
    name: 'Books',
    slug: 'Books',
    subcategories: ['Self-Help', 'Fiction'],
  },
  {
    name: 'Home',
    slug: 'Home',
    subcategories: ['Furniture', 'Appliances'],
  },
];

const brandsList = ['Nike', 'Sony', 'Apple', 'Samsung', 'LG', 'Lenovo', 'HP', 'Adidas', 'Puma', 'Boat', 'H&M', 'Zara'];

export default function ProductsPageContent() {
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get('category');
  const subcategoryQuery = searchParams.get('subcategory');
  const searchQuery = searchParams.get('search');

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const filteredProducts = useMemo(() => {
    let products;
    if (searchQuery) {
      products = searchProducts(searchQuery);
    } else if (categoryQuery && subcategoryQuery) {
      products = getProductsByCategoryAndSubcategory(categoryQuery, subcategoryQuery);
    } else if (categoryQuery) {
      products = getProductsByCategory(categoryQuery);
    } else {
      products = getAllProducts();
    }

    if (selectedBrands.length > 0) {
      products = products.filter(p =>
        selectedBrands.some(
          brand => (p.brand || '').toLowerCase().replace(/[^a-z0-9]/g, '') === brand.toLowerCase().replace(/[^a-z0-9]/g, '')
        )
      );
    }

    return products;
  }, [categoryQuery, subcategoryQuery, searchQuery, selectedBrands]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
  };

  const pageTitle = searchQuery
    ? `Search results for "${searchQuery}"`
    : subcategoryQuery
    ? subcategoryQuery
    : categoryQuery
    ? categoryQuery
    : 'All Products';

  const catIcons: Record<string, JSX.Element> = {
    Electronics: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>,
    Fashion: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46L16 2a8 8 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"></path></svg>,
    Beauty: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
    Sports: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
    Books: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
    Home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
  };

  return (
    <>
      <Header />
      <div className="category-header-content">
        <div className="category-header-inner">
          <Link href="/" className="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Home
          </Link>
          <div style={{ textAlign: 'center', marginTop: '-10px' }}>
            <h1>{pageTitle}</h1>
            <p>Showing <span>{filteredProducts.length}</span> results</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-outline mobile-filter-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-expanded={sidebarOpen}
        aria-controls="products-sidebar"
      >
        Filter Categories
      </button>

      <main className="shop-container">
        <aside id="products-sidebar" className={`filters-sidebar ${sidebarOpen ? 'is-open' : ''}`}>
          <button className="filter-close-btn" onClick={() => setSidebarOpen(false)}>Close</button>

          <div className="filter-group">
            <h3>Categories</h3>
            <ul style={{ listStyle: 'none', lineHeight: 2 }}>
              {categories.map(cat => (
                <li key={cat.slug} style={{ marginBottom: '10px' }}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="sidebar-cat-link"
                    onClick={() => setSidebarOpen(false)}
                  >
                    {catIcons[cat.slug]}
                    {cat.name}
                  </Link>
                  <ul className="subcategory-list">
                    {cat.subcategories.map(sub => (
                      <li key={sub}>
                        <Link
                          href={`/products?category=${cat.slug}&subcategory=${encodeURIComponent(sub)}`}
                          style={{ color: 'var(--clr-text-muted)' }}
                          onClick={() => setSidebarOpen(false)}
                        >
                          &rsaquo; {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group">
            <h3>Brands</h3>
            {brandsList.map(brand => (
              <label
                key={brand}
                style={{ display: 'block', marginBottom: '8px', color: 'var(--clr-text-muted)', cursor: 'pointer' }}
              >
                <input
                  type="checkbox"
                  value={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  style={{ marginRight: '8px' }}
                />
                {brand}
              </label>
            ))}
          </div>

          <button className="btn btn-outline btn-full" onClick={clearFilters} style={{ textAlign: 'center' }}>
            Clear All Filters
          </button>
        </aside>

        <section style={{ flexGrow: 1 }}>
          <div className="product-grid">
            {filteredProducts.length === 0 ? (
              <h3 style={{ color: 'var(--clr-text-muted)', padding: '40px 0' }}>No products found. Try a different search.</h3>
            ) : (
              filteredProducts.map(product => {
                const productName = product.product_name || `${product.brand} ${product.subcategory}`;
                const productImage = product.image_url || `https://placehold.co/500x500/f3f4f6/6b7280?text=${product.brand}`;
                return (
                  <ProductCard
                    key={product.product_id}
                    id={product.product_id}
                    name={productName}
                    price={product.final_price}
                    oldPrice={product.price}
                    image={productImage}
                    category={product.category}
                    subcategory={product.subcategory}
                    rating={product.rating}
                    reviewCount={product.review_count}
                    badgeAuto={{ stock: product.stock, discount: product.discount }}
                  />
                );
              })
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}