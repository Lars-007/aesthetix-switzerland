'use client';

import { ShopifyProduct } from '@/lib/shopify';
import ProductCard from './ProductCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/lib/hooks';

export default function FeaturedProductsClient({ products }: { products: ShopifyProduct[] }) {
  const ref = useScrollReveal();

  if (products.length === 0) {
    return null;
  }

  return (
    <section ref={ref} className="reveal py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-14">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium">
              Bestseller
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">
              Beliebteste Produkte
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors group"
          >
            Alle anzeigen
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="sm:hidden mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
          >
            Alle Produkte anzeigen
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
