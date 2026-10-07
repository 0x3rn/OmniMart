'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

const carouselImages = [
  'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1920&q=80',
];

const categories = [
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80', desc: 'Laptops, Smartphones, Tablets, and more', slug: 'Electronics' },
  { name: 'Home', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80', desc: 'Furniture, Appliances, Home Decor, and more', slug: 'Home' },
  { name: 'Beauty', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=80', desc: 'Skin Care, Hair Care, Makeup, and more', slug: 'Beauty' },
  { name: 'Sports', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80', desc: 'Sports Equipment, Outdoor Gear, and more', slug: 'Sports' },
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80', desc: 'Clothing, Shoes, Jewelry, and more', slug: 'Fashion' },
  { name: 'Books', image: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=600&q=80', desc: 'Fiction, Non-fiction, Textbooks, and more', slug: 'Books' },
];

const featuredProducts = [
  { id: 'featured-smartphone-256gb', name: 'Omni Pro Smartphone 256GB', price: 899, oldPrice: 1099, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80', category: 'Electronics', subcategory: 'Smartphones', rating: 5, reviewCount: 128, badge: { label: 'Sale', className: 'badge-sale' } },
  { id: 'featured-velocity-sneakers', name: 'Velocity Run Air Sneakers', price: 120, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80', category: 'Fashion', subcategory: 'Shoes', rating: 4, reviewCount: 84 },
  { id: 'featured-noise-canceling-headphones', name: 'Noise-Canceling Headphones', price: 250, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80', category: 'Electronics', subcategory: 'Audio', rating: 5, reviewCount: 342, badge: { label: 'New', className: 'badge-new' } },
  { id: 'featured-wireless-earbuds-pro', name: 'Wireless Earbuds Pro', price: 149, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80', category: 'Electronics', subcategory: 'Audio', rating: 4, reviewCount: 56 },
  { id: 'featured-minimalist-smartwatch', name: 'Minimalist Smartwatch', price: 199, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80', category: 'Electronics', subcategory: 'Wearables', rating: 5, reviewCount: 215 },
  { id: 'featured-espresso-machine', name: 'Premium Espresso Machine', price: 349, oldPrice: 450, image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=500&q=80', category: 'Home', subcategory: 'Appliances', rating: 4, reviewCount: 92, badge: { label: 'Sale', className: 'badge-sale' } },
  { id: 'featured-gaming-console-1tb', name: 'NextGen Gaming Console 1TB', price: 499, image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=500&q=80', category: 'Electronics', subcategory: 'Gaming', rating: 5, reviewCount: 1045, badge: { label: 'Top Seller', className: 'badge-sale' } },
  { id: 'featured-security-camera-4k', name: 'WiFi Security Camera 4K', price: 79.99, oldPrice: 99.99, image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=500&q=80', category: 'Smart Home', subcategory: 'Security', rating: 4, reviewCount: 412 },
];

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      <Header variant="home" />

      <main className="main-container">
        <div className="carousel-track">
          {carouselImages.map((img, i) => (
            <img
              key={i}
              src={img}
              className={`carousel-slide ${i === activeSlide ? 'active' : ''}`}
              alt={`Slide ${i + 1}`}
              fetchPriority={i === 0 ? 'high' : undefined}
            />
          ))}
          <div className="carousel-overlay"></div>
        </div>
        <div className="hero-content">
          <h1>Welcome to <span className="hero-brand">OmniMart</span></h1>
          <p>Discover amazing products at unbeatable prices. Shop electronics, fashion, and more.</p>
          <div className="hero-buttons">
            <Link href="/products" className="btn btn-accent">Shop Now</Link>
            <Link href="/products" className="btn btn-outline hero-btn-alt">Browse Categories</Link>
          </div>
        </div>
      </main>

      <section className="trust-badges">
        <div className="badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
          <h3>Secure Payment</h3>
          <p>100% secure checkout</p>
        </div>
        <div className="badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
          <h3>Free Shipping</h3>
          <p>On orders over $50</p>
        </div>
        <div className="badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 14L4 9l5-5"></path><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"></path></svg>
          <h3>Easy Returns</h3>
          <p>30-day return policy</p>
        </div>
        <div className="badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
          <h3>Quality Products</h3>
          <p>Top brands guaranteed</p>
        </div>
      </section>

      <section className="category-section">
        <h2>Shop by Category</h2>
        <div className="category-container">
          {categories.map(cat => (
            <div key={cat.slug} className="category-item">
              <div className="category-image-wrapper">
                <img src={cat.image} alt={cat.name} loading="lazy" />
              </div>
              <div className="category-content">
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
                <Link href={`/products?category=${cat.slug}`} className="category-link">
                  Shop {cat.name} &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="promo-banner">
        <div className="promo-content">
          <h4>Limited Time Offer</h4>
          <h2>Apple Days Event</h2>
          <p>Save up to 30% on MacBooks, iPads, and accessories. Sale ends soon!</p>
          <Link href="/products" className="btn btn-accent">Shop the Sale</Link>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <Link href="/products" className="view-all-link">View All &rarr;</Link>
        </div>
        <div className="product-grid">
          {featuredProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              oldPrice={product.oldPrice}
              image={product.image}
              category={product.category}
              subcategory={product.subcategory}
              rating={product.rating}
              reviewCount={product.reviewCount}
              badge={product.badge || null}
            />
          ))}
        </div>
      </section>

      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Get 10% Off Your First Order</h2>
          <p>Subscribe to our newsletter for exclusive offers, updates, and more.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit" className="btn btn-accent">Subscribe</button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
