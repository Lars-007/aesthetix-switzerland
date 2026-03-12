'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShopifyProduct, formatPrice } from '@/lib/shopify';
import { useCartStore } from '@/store/cart';
import { ShoppingBag, ArrowLeft, Check, Truck, Shield, Leaf } from 'lucide-react';

export default function ProductDetail({ product }: { product: ShopifyProduct }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();

  const images = product.images.edges.map(e => e.node);
  const variants = product.variants.edges.map(e => e.node);
  const variant = variants[selectedVariant];
  const hasMultipleVariants = variants.length > 1 && variants[0].title !== 'Default Title';

  const handleAdd = () => {
    addItem({
      variantId: variant.id,
      productId: product.id,
      title: product.title,
      variantTitle: variant.title,
      handle: product.handle,
      price: variant.price.amount,
      compareAtPrice: variant.compareAtPrice?.amount || null,
      image: images[0]?.url || '',
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const hasDiscount = variant.compareAtPrice && parseFloat(variant.compareAtPrice.amount) > parseFloat(variant.price.amount);

  return (
    <section className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Back link */}
        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Alle Produkte
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div>
            <div className="relative aspect-square bg-bg-card rounded-2xl overflow-hidden border border-white/5 mb-4">
              {images[selectedImage] && (
                <Image
                  src={images[selectedImage].url}
                  alt={images[selectedImage].altText || product.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
              {!product.availableForSale && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-lg font-bold tracking-wider text-white/60">AUSVERKAUFT</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i ? 'border-white/40' : 'border-white/5 hover:border-white/15'
                    }`}
                  >
                    <Image src={img.url} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:py-4">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl font-bold">{formatPrice(variant.price.amount)}</span>
              {hasDiscount && (
                <span className="text-base text-white/30 line-through">
                  {formatPrice(variant.compareAtPrice!.amount)}
                </span>
              )}
            </div>

            {/* Variants */}
            {hasMultipleVariants && (
              <div className="mb-8">
                <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-3">Variante</p>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v, i) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(i)}
                      className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                        selectedVariant === i
                          ? 'border-white bg-white text-black font-semibold'
                          : 'border-white/10 text-white/60 hover:border-white/30'
                      } ${!v.availableForSale ? 'opacity-30 cursor-not-allowed' : ''}`}
                      disabled={!v.availableForSale}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <button
              onClick={handleAdd}
              disabled={!product.availableForSale}
              className={`w-full flex items-center justify-center gap-3 font-bold py-4 rounded-xl text-sm tracking-wider transition-all duration-300 mb-6 btn-primary ${
                added
                  ? 'bg-green-500 text-white'
                  : product.availableForSale
                    ? 'bg-white text-black hover:bg-white/90'
                    : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  Hinzugefügt
                </>
              ) : product.availableForSale ? (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  In den Warenkorb
                </>
              ) : (
                'Ausverkauft'
              )}
            </button>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { icon: Truck, text: '2-4 Werktage' },
                { icon: Shield, text: 'Schweizer Qualität' },
                { icon: Leaf, text: 'Naturbasiert' },
              ].map((badge) => (
                <div key={badge.text} className="flex flex-col items-center gap-2 text-center bg-bg-raised rounded-xl py-4 px-2 border border-white/5">
                  <badge.icon className="w-4 h-4 text-white/30" />
                  <span className="text-[10px] text-white/30">{badge.text}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="border-t border-white/5 pt-8">
              <h3 className="text-sm font-semibold mb-4">Beschreibung</h3>
              <div
                className="text-sm text-white/40 leading-relaxed prose prose-invert prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
