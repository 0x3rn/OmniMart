'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useCart } from '@/app/context/CartContext';

export default function Header({ variant = 'default' }: { variant?: 'home' | 'default' }) {
  const router = useRouter();
  const { getCartCount } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const drawerRef = useRef<HTMLElement>(null);
  const cartCount = getCartCount();

  const handleSearch = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setDrawerOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = [
    { name: 'Electronics', href: '/products?category=Electronics' },
    { name: 'Fashion', href: '/products?category=Fashion' },
    { name: 'Beauty', href: '/products?category=Beauty' },
    { name: 'Sports', href: '/products?category=Sports' },
    { name: 'Books', href: '/products?category=Books' },
    { name: 'Home', href: '/products?category=Home' },
  ];

  return (
    <header className={`main-header ${variant === 'home' ? 'home-header' : ''}`}>
      <div className="header-container">
        {variant === 'home' ? (
          <div className="home-left-group">
            <button
              type="button"
              className="action-icon menu-toggle"
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-expanded={drawerOpen}
              aria-controls="home-category-drawer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              <span className="action-text">Categories</span>
            </button>
            <Link href="/" className="logo">Omni<span>Mart</span></Link>
          </div>
        ) : (
          <Link href="/" className="logo">Omni<span>Mart</span></Link>
        )}

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button type="button" onClick={() => handleSearch()}>Search</button>
        </div>

        <div className="header-actions">
          <Link href="/login" className="action-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span className="action-text">Account</span>
          </Link>

          <Link href="/cart" className="action-icon cart-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="action-text">Cart</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            {cartCount === 0 && <span className="cart-badge" style={{ display: 'none' }}>0</span>}
          </Link>
        </div>
      </div>

      {variant === 'home' && (
        <aside
          ref={drawerRef}
          id="home-category-drawer"
          className={`mobile-drawer ${drawerOpen ? 'is-open' : ''}`}
        >
          <button
            className="drawer-close-btn"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <Link href="/" onClick={() => setDrawerOpen(false)} style={{ color: 'var(--clr-primary)', borderBottom: '1px solid var(--clr-border)', paddingBottom: '10px', marginBottom: '5px' }}>
            Home
          </Link>
          {categories.map(cat => (
            <Link key={cat.name} href={cat.href} onClick={() => setDrawerOpen(false)}>
              {cat.name}
            </Link>
          ))}
        </aside>
      )}
    </header>
  );
}