import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Products | OmniMart',
  alternates: { canonical: 'https://omnimart.corstack.dev/products' },
};

export default function Layout({ children }: { children: ReactNode }) { return children; }
