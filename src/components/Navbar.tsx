'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cart';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleCart, totalItems } = useCartStore();
  const count = totalItems();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/90 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <span className="font-display text-lg md:text-xl font-bold tracking-wider text-white">
                AESTHETIX
              </span>
              <span className="hidden sm:inline text-[10px] tracking-[0.3em] text-white/40 uppercase font-light border-l border-white/10 pl-3">
                Switzerland
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              <Link href="/products" className="text-sm text-white/60 hover:text-white transition-colors duration-300 tracking-wide">
                Produkte
              </Link>
              <Link href="/#why" className="text-sm text-white/60 hover:text-white transition-colors duration-300 tracking-wide">
                Über uns
              </Link>
              <Link href="/#faq" className="text-sm text-white/60 hover:text-white transition-colors duration-300 tracking-wide">
                FAQ
              </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleCart}
                className="relative p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Warenkorb"
              >
                <ShoppingBag className="w-5 h-5" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/98 transition-all duration-500 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-10">
          <Link
            href="/products"
            onClick={() => setMobileOpen(false)}
            className="text-2xl font-display font-bold tracking-wider text-white/80 hover:text-white transition-colors"
          >
            Produkte
          </Link>
          <Link
            href="/#why"
            onClick={() => setMobileOpen(false)}
            className="text-2xl font-display font-bold tracking-wider text-white/80 hover:text-white transition-colors"
          >
            Über uns
          </Link>
          <Link
            href="/#faq"
            onClick={() => setMobileOpen(false)}
            className="text-2xl font-display font-bold tracking-wider text-white/80 hover:text-white transition-colors"
          >
            FAQ
          </Link>
        </div>
      </div>
    </>
  );
}
