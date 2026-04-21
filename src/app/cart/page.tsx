'use client';

import { useCartStore } from '@/store/cart';
import { createCheckout, formatPrice } from '@/lib/shopify';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const lineItems = items.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity,
      }));
      const checkoutUrl = await createCheckout(lineItems);
      window.location.href = checkoutUrl;
    } catch {
      alert('Fehler beim Erstellen des Checkouts.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Weiter einkaufen
        </Link>

        <h1 className="font-display text-3xl md:text-5xl font-bold mb-12">Warenkorb</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-white/10 mx-auto mb-6" />
            <p className="text-white/40 mb-8">Dein Warenkorb ist leer</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-white text-black font-bold px-8 py-3 rounded-full text-sm tracking-wider hover:bg-white/90 transition-all btn-primary"
            >
              Produkte entdecken
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 mb-10">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-5 bg-bg-raised rounded-2xl border border-white/5 p-5">
                  <div className="relative w-24 h-24 md:w-28 md:h-28 bg-black rounded-xl overflow-hidden flex-shrink-0">
                    {item.image && (
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link href={`/products/${item.handle}`} className="text-sm font-semibold hover:text-white/70 transition-colors">
                          {item.title}
                        </Link>
                        {item.variantTitle !== 'Default Title' && (
                          <p className="text-xs text-white/30 mt-0.5">{item.variantTitle}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="p-2 text-white/20 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-bold">
                        {formatPrice((parseFloat(item.price) * item.quantity).toFixed(2))}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-bg-raised rounded-2xl border border-white/5 p-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/40">Zwischensumme</span>
                <span className="text-sm">{formatPrice(totalPrice().toFixed(2))}</span>
              </div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-white/40">Versand</span>
                <span className="text-sm text-white/40">Wird beim Checkout berechnet</span>
              </div>
              <div className="border-t border-white/5 pt-6 flex items-center justify-between mb-8">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">{formatPrice(totalPrice().toFixed(2))}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-white text-black font-bold py-4 rounded-xl text-sm tracking-wider hover:bg-white/90 transition-all disabled:opacity-50 btn-primary"
              >
                {loading ? 'Wird geladen...' : 'Zur Kasse'}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
