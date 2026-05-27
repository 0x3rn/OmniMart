'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/app/context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const formatCurrency = (num: number) =>
    '$' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const [ccNumber, setCcNumber] = useState('');
  const [ccExp, setCcExp] = useState('');
  const [ccCvv, setCcCvv] = useState('');
  const [expError, setExpError] = useState(false);

  const handleCcNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(.{4})/g, '$1 ').trim();
    setCcNumber(value.substring(0, 23));
  };

  const handleCcExp = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setCcExp(value);
    setExpError(false);
  };

  const validateExpiry = () => {
    if (ccExp.length === 5) {
      const parts = ccExp.split('/');
      const month = parseInt(parts[0], 10);
      const year = parseInt('20' + parts[1], 10);

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();

      if (month < 1 || month > 12 || year < currentYear || (year === currentYear && month < currentMonth)) {
        return true;
      }
    } else if (ccExp.length > 0) {
      return true;
    }
    return false;
  };

  const handleExpBlur = () => {
    setExpError(validateExpiry());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateExpiry()) {
      setExpError(true);
      return;
    }
    clearCart();
    router.push('/success');
  };

  return (
    <>
      <Header />
      <main style={{ maxWidth: '1400px', margin: '40px auto', padding: '0 20px' }}>
        <Link href="/cart" className="back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Cart
        </Link>
        <h1>Secure Checkout</h1>

        <div className="checkout-grid">
          <div className="checkout-forms">
            <form id="checkout-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <h3>1. Shipping Address</h3>
                <div className="form-row">
                  <div className="form-group"><label>First Name</label><input type="text" className="form-input" required /></div>
                  <div className="form-group"><label>Last Name</label><input type="text" className="form-input" required /></div>
                </div>
                <div className="form-group"><label>Street Address</label><input type="text" className="form-input" required /></div>
                <div className="form-row">
                  <div className="form-group"><label>City</label><input type="text" className="form-input" required /></div>
                  <div className="form-group"><label>Zip Code</label><input type="text" className="form-input" required /></div>
                </div>
              </div>

              <div className="form-section">
                <h3>2. Payment Method</h3>
                <div className="form-group"><label>Name on Card</label><input type="text" className="form-input" required /></div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    required
                    placeholder="0000 0000 0000 0000"
                    maxLength={23}
                    value={ccNumber}
                    onChange={handleCcNumber}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry (MM/YY)</label>
                    <input
                      type="text"
                      className={`form-input ${expError ? 'input-error' : ''}`}
                      required
                      placeholder="MM/YY"
                      maxLength={5}
                      value={ccExp}
                      onChange={handleCcExp}
                      onBlur={handleExpBlur}
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="password"
                      className="form-input"
                      required
                      placeholder="123"
                      maxLength={3}
                      value={ccCvv}
                      onChange={(e) => setCcCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-accent btn-full" style={{ fontSize: '1.2rem', padding: '15px' }}>
                Place Order
              </button>
            </form>
          </div>

          <aside className="checkout-summary">
            <div className="order-summary-card">
              <h3>Your Order</h3>
              <p style={{ marginBottom: '20px' }}>Review your items before placing your order.</p>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr />
              <div className="summary-row summary-total" style={{ marginTop: '15px' }}>
                <span>Total to pay:</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}