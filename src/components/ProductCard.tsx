'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { ShopifyProduct, formatPrice } from '@/lib/shopify';
import { useCartStore } from '@/store/cart';

export default function ProductCard({ product }: { product: ShopifyProduct }) {
  const { addItem } = useCartStore();
  const image = product.images.edges[0]?.node;
  const variant = product.variants.edges[0]?.node;
  const price = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const hasDiscount = compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount);
  const soldOut = !product.availableForSale;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant || soldOut) return;
    addItem({
      variantId: variant.id,
      productId: product.id,
      title: product.title,
      variantTitle: variant.title,
      handle: product.handle,
      price: variant.price.amount,
      compareAtPrice: variant.compareAtPrice?.amount || null,
      image: image?.url || '',
    });
  };

  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <div className="product-card bg-bg-card rounded-2xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all relative">
        <div className="relative aspect-[4/5] bg-gradient-to-br from-bg-raised to-bg overflow-hidden">
          {image && (
            <Image
              src={image.url}
              alt={image.altText || product.title}
              fill
              className="object-cover transition-all duration-1000 ease-editorial group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {soldOut && (
              <span className="bg-bg/80 backdrop-blur-md text-bone/80 text-[9px] font-bold px-3 py-1.5 rounded-full tracking-[0.25em] border border-white/10">
                AUSVERKAUFT
              </span>
            )}
            {hasDiscount && !soldOut && (
              <span className="bg-accent text-bg text-[9px] font-bold px-3 py-1.5 rounded-full tracking-[0.25em]">
                SALE
              </span>
            )}
          </div>

          <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-bg/40 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
            <ArrowUpRight className="w-4 h-4 text-bone" />
          </div>

          {!soldOut && (
            <button
              onClick={handleAddToCart}
              className="absolute bottom-4 left-4 right-4 bg-bone text-bg p-3 rounded-full hidden md:flex opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-accent items-center justify-center gap-2 text-[11px] font-bold tracking-[0.2em] z-10 btn-primary"
              aria-label="In den Warenkorb"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              IN DEN WARENKORB
            </button>
          )}
        </div>

        <div className="p-5 md:p-6">
          <h3 className="text-[15px] font-semibold leading-snug group-hover:text-accent transition-colors duration-500 text-bone">
            {product.title}
          </h3>
          <div className="flex items-center gap-2 mt-3">
            <span className={`text-sm font-bold tracking-wide ${soldOut ? 'text-bone/40' : 'text-bone'}`}>
              {formatPrice(price.amount)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-bone/40 line-through">
                {formatPrice(compareAt.amount)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
