import products from '@/data/products.json';

export interface Product {
  user_id: string;
  product_id: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
  discount: number;
  final_price: number;
  rating: number;
  review_count: number;
  stock: number;
  seller_id: string;
  seller_rating: number;
  purchase_date: string | number;
  shipping_time_days: number;
  location: string;
  device: string;
  payment_method: string;
  is_returned: string;
  delivery_status: string;
  product_name?: string;
  image_url?: string;
}

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.product_id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(
    p => p.category.toLowerCase() === category.toLowerCase()
  );
}

export function getProductsByCategoryAndSubcategory(category: string, subcategory: string): Product[] {
  return products.filter(
    p =>
      p.category.toLowerCase() === category.toLowerCase() &&
      p.subcategory.toLowerCase() === subcategory.toLowerCase()
  );
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(p => {
    const brand = (p.brand || '').toLowerCase();
    const cat = (p.category || '').toLowerCase();
    const subcat = (p.subcategory || '').toLowerCase();
    const name = `${brand} ${subcat}`.toLowerCase();
    return name.includes(q) || brand.includes(q) || cat.includes(q) || subcat.includes(q);
  });
}

export function getCategories(): { name: string; subcategories: string[] }[] {
  const catMap = new Map<string, Set<string>>();
  products.forEach(p => {
    if (!catMap.has(p.category)) {
      catMap.set(p.category, new Set());
    }
    catMap.get(p.category)!.add(p.subcategory);
  });
  return Array.from(catMap.entries()).map(([name, subs]) => ({
    name,
    subcategories: Array.from(subs),
  }));
}