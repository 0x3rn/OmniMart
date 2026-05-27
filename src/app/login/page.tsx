'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <>
      <Header />
      <main className="auth-layout">
        <div className="auth-card">
          <h2>Welcome Back</h2>
          <p>Sign in to your OmniMart account</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" className="form-input" required placeholder="you@example.com" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" className="form-input" required placeholder="••••••••" />
            </div>
            <button type="submit" className="btn btn-accent btn-full">Sign In</button>
          </form>

          <div className="auth-links">
            <Link href="#">Forgot Password?</Link>
            <p style={{ marginTop: '10px' }}>Don't have an account? <Link href="#">Create one</Link></p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}