'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/app/context/CartContext';

export default function CartPage() {
  const { cart, updateQty, removeItem, cartTotal } = useCart();

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const formatCurrency = (num: number) =>
    '$' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <>
      <Header />
      <main style={{ maxWidth: '1400px', margin: '40px auto', padding: '0 20px' }}>
        <Link href="/" className="back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Home
        </Link>
        <h1 style={{ marginBottom: '30px' }}>Shopping Cart</h1>

        <div className="cart-grid">
          <div className="cart-items-section">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <h2>Your cart is empty</h2>
<p style={{ margin: '15px 0' }}>Looks like you haven't added any items yet.</p>
                <Link href="/products" className="btn btn-outline">Start Shopping</Link>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" loading="lazy" />
                  <div className="cart-item-info">
                    <h3 className="cart-item-title">{item.name}</h3>
                    <div className="cart-item-price">${item.price.toFixed(2)}</div>
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                      <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
                    </div>
                  </div>
                  <div className="cart-item-total">
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  </div>
                </div>
              ))
            )}
          </div>

          <aside className="order-summary-section">
            <div className="order-summary-card">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <hr />
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <Link
                href={cart.length > 0 ? '/checkout' : '#'}
                className="btn btn-accent btn-full"
                style={{
                  pointerEvents: cart.length === 0 ? 'none' : 'auto',
                  opacity: cart.length === 0 ? 0.5 : 1,
                }}
              >
                Proceed to Checkout
              </Link>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}