import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SuccessPage() {
  return (
    <>
      <Header />
      <main className="success-layout">
        <div className="success-card">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--clr-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="success-icon">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <h1>Payment Successful!</h1>
          <p>Thank you for shopping with OmniMart. Your order <strong>#OMNI-83749</strong> has been placed successfully.</p>
          <p>We have sent an order confirmation to your email.</p>
          <Link href="/" className="btn btn-accent" style={{ marginTop: '20px' }}>Continue Shopping</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}