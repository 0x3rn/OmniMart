'use client';

import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import { useToast } from '@/app/context/ToastContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category?: string;
  subcategory?: string;
  rating?: number;
  reviewCount?: number;
  badge?: { label: string; className: string } | null;
  badgeAuto?: { stock: number; discount: number };
}

function generateStars(rating: number): string {
  const rounded = Math.round(rating || 0);
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += i <= rounded ? '★' : '☆';
  }
  return stars;
}

export default function ProductCard({ id, name, price, oldPrice, image, category, subcategory, rating, reviewCount, badge, badgeAuto }: ProductCardProps) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addToCart(id, name, price, image);
    showToast(`${name} added to cart!`);
  };

  let badgeElement = null;
  if (badge) {
    badgeElement = <span className={`product-badge ${badge.className}`}>{badge.label}</span>;
  } else if (badgeAuto) {
    if (badgeAuto.stock < 50 && badgeAuto.stock > 0) {
      badgeElement = <span className="product-badge badge-sale">Low Stock</span>;
    } else if (badgeAuto.discount > 50) {
      badgeElement = <span className="product-badge badge-new">{Math.round(badgeAuto.discount)}% OFF</span>;
    }
  }

  return (
    <div className="product-card">
      {badgeElement}
      <div className="product-image">
        <img src={image} alt={name} loading="lazy" />
      </div>
      <div className="product-info">
        {category && subcategory && (
          <span className="product-cat-label">{category} › {subcategory}</span>
        )}
        <h3 className="product-title">
          <Link href={`/product/${encodeURIComponent(id)}`}>{name}</Link>
        </h3>

        {rating !== undefined && (
          <div className="product-rating">
            <span className="stars">{generateStars(rating)}</span>
            <span className="review-count">({reviewCount || 0})</span>
          </div>
        )}

        <div className="product-price">
          <span className="current-price">${price.toFixed(2)}</span>
          {oldPrice && oldPrice > price && (
            <span className="old-price">${oldPrice.toFixed(2)}</span>
          )}
        </div>

        <button className="btn btn-accent btn-full" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}