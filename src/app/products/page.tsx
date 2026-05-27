import { Suspense } from 'react';
import ProductsPageContent from './ProductsPageContent';

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h3 style={{ color: 'var(--clr-text-muted)' }}>Loading products...</h3>
      </div>
    }>
      <ProductsPageContent />
    </Suspense>
  );
}