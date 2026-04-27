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
    <section id="shop" ref={ref} className="reveal py-28 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-index">— 01 / Shop</span>
              <div className="hairline w-24" />
            </div>
            <h2 className="display-heading text-4xl md:text-6xl lg:text-7xl text-bone">
              Beliebteste<br />
              <span className="italic font-medium text-accent">Produkte.</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-3 text-sm text-bone/50 hover:text-accent transition-colors group self-start md:self-end"
          >
            <span className="link-underline tracking-[0.15em] uppercase text-xs">Alle anzeigen</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="sm:hidden mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-bone/60 hover:text-accent transition-colors tracking-[0.15em] uppercase"
          >
            Alle Produkte anzeigen
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
