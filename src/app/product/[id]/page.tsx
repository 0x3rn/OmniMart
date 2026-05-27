'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProductById, Product } from '@/lib/data';
import { useCart } from '@/app/context/CartContext';
import { useToast } from '@/app/context/ToastContext';

const featuredFallback: Product[] = [
  { user_id: '', product_id: 'featured-smartphone-256gb', category: 'Electronics', subcategory: 'Smartphones', brand: 'Omni', price: 1099, discount: 18, final_price: 899, rating: 5, review_count: 128, stock: 45, seller_id: '', seller_rating: 0, purchase_date: '', shipping_time_days: 0, location: '', device: '', payment_method: '', is_returned: 'FALSE', delivery_status: '', product_name: 'Omni Pro Smartphone 256GB', image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80' },
  { user_id: '', product_id: 'featured-velocity-sneakers', category: 'Fashion', subcategory: 'Shoes', brand: 'Velocity', price: 120, discount: 0, final_price: 120, rating: 4, review_count: 84, stock: 120, seller_id: '', seller_rating: 0, purchase_date: '', shipping_time_days: 0, location: '', device: '', payment_method: '', is_returned: 'FALSE', delivery_status: '', product_name: 'Velocity Run Air Sneakers', image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80' },
  { user_id: '', product_id: 'featured-noise-canceling-headphones', category: 'Electronics', subcategory: 'Audio', brand: 'SoundMax', price: 250, discount: 0, final_price: 250, rating: 5, review_count: 342, stock: 8, seller_id: '', seller_rating: 0, purchase_date: '', shipping_time_days: 0, location: '', device: '', payment_method: '', is_returned: 'FALSE', delivery_status: '', product_name: 'Noise-Canceling Headphones', image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80' },
  { user_id: '', product_id: 'featured-wireless-earbuds-pro', category: 'Electronics', subcategory: 'Audio', brand: 'SoundMax', price: 149, discount: 0, final_price: 149, rating: 4, review_count: 56, stock: 200, seller_id: '', seller_rating: 0, purchase_date: '', shipping_time_days: 0, location: '', device: '', payment_method: '', is_returned: 'FALSE', delivery_status: '', product_name: 'Wireless Earbuds Pro', image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80' },
  { user_id: '', product_id: 'featured-minimalist-smartwatch', category: 'Electronics', subcategory: 'Wearables', brand: 'TimeTech', price: 199, discount: 0, final_price: 199, rating: 5, review_count: 215, stock: 60, seller_id: '', seller_rating: 0, purchase_date: '', shipping_time_days: 0, location: '', device: '', payment_method: '', is_returned: 'FALSE', delivery_status: '', product_name: 'Minimalist Smartwatch', image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80' },
  { user_id: '', product_id: 'featured-espresso-machine', category: 'Home', subcategory: 'Appliances', brand: 'CafeBrew', price: 450, discount: 22, final_price: 349, rating: 4, review_count: 92, stock: 15, seller_id: '', seller_rating: 0, purchase_date: '', shipping_time_days: 0, location: '', device: '', payment_method: '', is_returned: 'FALSE', delivery_status: '', product_name: 'Premium Espresso Machine', image_url: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=500&q=80' },
  { user_id: '', product_id: 'featured-gaming-console-1tb', category: 'Electronics', subcategory: 'Gaming', brand: 'PlayTech', price: 499, discount: 0, final_price: 499, rating: 5, review_count: 1045, stock: 5, seller_id: '', seller_rating: 0, purchase_date: '', shipping_time_days: 0, location: '', device: '', payment_method: '', is_returned: 'FALSE', delivery_status: '', product_name: 'NextGen Gaming Console 1TB', image_url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=500&q=80' },
  { user_id: '', product_id: 'featured-security-camera-4k', category: 'Home', subcategory: 'Smart Home', brand: 'SecureEye', price: 99.99, discount: 20, final_price: 79.99, rating: 4, review_count: 412, stock: 85, seller_id: '', seller_rating: 0, purchase_date: '', shipping_time_days: 0, location: '', device: '', payment_method: '', is_returned: 'FALSE', delivery_status: '', product_name: 'WiFi Security Camera 4K', image_url: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=500&q=80' },
];

function generateStars(rating: number): string {
  const rounded = Math.round(rating || 0);
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += i <= rounded ? '★' : '☆';
  }
  return stars;
}

export default function ProductPage() {
  const params = useParams();
  const productId = decodeURIComponent(params.id as string);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let found = getProductById(productId);
    if (!found) {
      found = featuredFallback.find(p => p.product_id === productId);
    }
    setProduct(found || null);
    setLoading(false);
  }, [productId]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="product-detail-layout" style={{ textAlign: 'center', padding: '40px' }}>
          <h3 style={{ color: 'var(--clr-text-muted)' }}>Loading product details...</h3>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <main className="product-detail-layout" style={{ textAlign: 'center', padding: '40px' }}>
          <h3 style={{ color: 'var(--clr-danger)' }}>
            Product not found. Return to <Link href="/products" style={{ textDecoration: 'underline' }}>shop</Link>.
          </h3>
        </main>
        <Footer />
      </>
    );
  }

  const productName = product.product_name || `${product.brand} ${product.subcategory}`;
  const productPrice = product.final_price || product.price;
  const oldPrice = product.final_price < product.price ? product.price : null;
  const productImage = product.image_url || `https://placehold.co/800x800/f3f4f6/6b7280?text=${product.brand}`;
  const discount = product.price > 0 ? ((product.price - product.final_price) / product.price * 100) : 0;

  const handleAddToCart = () => {
    addToCart(product.product_id, productName, productPrice, productImage, qty);
    showToast(`${qty}x ${productName} added to cart!`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      <Header />
      <main className="product-detail-layout">
        <div className="product-grid-single">
          <div className="product-gallery">
            <div className="main-image-wrapper">
              <img src={productImage} alt={productName} />
            </div>
            <div className="thumbnail-list">
              <img src={productImage} className="thumb-img active" alt={`${productName} thumb`} />
            </div>
          </div>

          <div className="product-details-content">
            <div className="breadcrumbs">
              <Link href="/">Home</Link> › <span>{product.category || 'Category'}</span> › <span>{product.brand || 'Brand'}</span>
            </div>

            <h1 className="pd-title">{productName}</h1>

            <div className="product-rating pd-rating">
              <span className="stars">{generateStars(product.rating)}</span>
              <span className="review-count">({product.review_count || 0} reviews)</span>
            </div>

            <div className="pd-price-wrap">
              <span className="current-price pd-current-price">${productPrice.toFixed(2)}</span>
              {oldPrice && (
                <span className="old-price">${oldPrice.toFixed(2)}</span>
              )}
              {discount > 0 && (
                <span className="product-badge badge-sale pd-badge" style={{ position: 'static', marginLeft: '15px' }}>
                  {Math.round(discount)}% OFF
                </span>
              )}
            </div>

            <p className="pd-description">
              Premium {product.brand} {product.subcategory} - {product.category}. High quality product with excellent ratings from customers.
            </p>

            <div className="pd-stock-status" style={{
              color: product.stock && product.stock < 10 ? 'var(--clr-danger)' : product.stock === 0 ? 'var(--clr-danger)' : 'var(--clr-success)'
            }}>
              {product.stock === 0
                ? 'Out of Stock'
                : product.stock && product.stock < 10
                ? `Only ${product.stock} left in stock - order soon`
                : 'In Stock'}
            </div>

            <div className="pd-actions">
              <div className="qty-controls pd-qty">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val >= 1 && val <= 99) setQty(val);
                  }}
                  min="1"
                  max="99"
                />
                <button className="qty-btn" onClick={() => setQty(q => Math.min(99, q + 1))}>+</button>
              </div>
              <button
                className="btn btn-accent pd-add-btn"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                style={{
                  backgroundColor: added ? 'var(--clr-success)' : product.stock === 0 ? undefined : undefined,
                  opacity: product.stock === 0 ? 0.5 : 1,
                }}
              >
                {added ? 'Added!' : 'Add to Cart'}
              </button>
            </div>

            <div className="pd-meta">
              <div className="meta-row"><strong>SKU:</strong> <span>{product.product_id.substring(0, 8).toUpperCase()}</span></div>
<div className="meta-row"><strong>Category:</strong> <span>{product.category} &rsaquo; {product.subcategory}</span></div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}