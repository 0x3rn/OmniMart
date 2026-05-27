import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mega-footer">
      <div className="footer-top">
        <div className="footer-col">
          <Link href="/" className="logo footer-logo">Omni<span>Mart</span></Link>
          <p>Your one-stop destination for everything you need. Quality products, fast shipping, and exceptional customer service.</p>
        </div>
        <div className="footer-col">
          <h3>Customer Service</h3>
          <ul>
            <li><Link href="#">Help Center</Link></li>
            <li><Link href="#">Track Your Order</Link></li>
            <li><Link href="#">Returns & Refunds</Link></li>
            <li><Link href="#">Shipping Info</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="#">My Account</Link></li>
            <li><Link href="#">Wishlist</Link></li>
            <li><Link href="#">Weekly Deals</Link></li>
            <li><Link href="#">Gift Cards</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Contact Us</h3>
          <ul>
            <li>Email: support@omnimart.com</li>
            <li>Phone: 1-800-123-4567</li>
            <li>Address: 123 Commerce St, NY</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} OmniMart. All rights reserved.</p>
        <div className="legal-links">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}