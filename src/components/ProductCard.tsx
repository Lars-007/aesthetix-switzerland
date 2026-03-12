'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
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
      <div className="product-card bg-bg-card rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all">
        {/* Image */}
        <div className="relative aspect-square bg-black/50 overflow-hidden">
          {image && (
            <Image
              src={image.url}
              alt={image.altText || product.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {soldOut && (
              <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider">
                AUSVERKAUFT
              </span>
            )}
            {hasDiscount && !soldOut && (
              <span className="bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider">
                SALE
              </span>
            )}
          </div>

          {/* Quick Add */}
          {!soldOut && (
            <button
              onClick={handleAddToCart}
              className="absolute bottom-3 right-3 bg-white text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-xl"
              aria-label="In den Warenkorb"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="text-sm font-semibold mb-2 group-hover:text-white/80 transition-colors line-clamp-1">
            {product.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${soldOut ? 'text-white/30' : ''}`}>
              {formatPrice(price.amount)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-white/30 line-through">
                {formatPrice(compareAt.amount)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
