'use client';

import { ShopifyProduct } from '@/lib/shopify';
import ProductCard from '@/components/ProductCard';

export default function ProductsGrid({ products }: { products: ShopifyProduct[] }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-white/40">Keine Produkte gefunden.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
