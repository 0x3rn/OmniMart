import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';

export const metadata: Metadata = {
  title: 'OmniMart - Your One-Stop Shop',
  description: 'Discover amazing products at unbeatable prices. Shop electronics, fashion, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}