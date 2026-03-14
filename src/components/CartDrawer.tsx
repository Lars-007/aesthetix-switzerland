'use client';

import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { createCheckout, formatPrice } from '@/lib/shopify';
import { useState } from 'react';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCartStore();
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
    } catch (error) {
      console.error(error); 
      alert('Fehler beim Erstellen des Checkouts. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-bg-raised border-l border-white/5 z-50 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-white/60" />
              <h2 className="font-display text-lg font-bold tracking-wide">Warenkorb</h2>
            </div>
            <button onClick={closeCart} className="p-2 text-white/40 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-12 h-12 text-white/10 mb-4" />
                <p className="text-white/40 text-sm mb-6">Dein Warenkorb ist leer</p>
                <Link
                  href="/products"
                  onClick={closeCart}
                  className="text-sm text-white underline underline-offset-4 hover:text-white/70 transition-colors"
                >
                  Produkte entdecken
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div key={item.variantId} className="flex gap-4 bg-bg-card rounded-xl p-4">
                    <div className="relative w-20 h-20 bg-black rounded-lg overflow-hidden flex-shrink-0">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold truncate">{item.title}</h3>
                      {item.variantTitle !== 'Default Title' && (
                        <p className="text-xs text-white/40 mt-0.5">{item.variantTitle}</p>
                      )}
                      <p className="text-sm font-bold mt-1">{formatPrice(item.price)}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="ml-auto p-1.5 text-white/30 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-white/5 px-6 py-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-white/50">Zwischensumme</span>
                <span className="text-lg font-bold">{formatPrice(totalPrice().toFixed(2))}</span>
              </div>
              <p className="text-xs text-white/30 mb-4">Versandkosten werden beim Checkout berechnet</p>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-white text-black font-bold py-4 rounded-xl text-sm tracking-wide hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed btn-primary"
              >
                {loading ? 'Wird geladen...' : 'Zur Kasse'}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
