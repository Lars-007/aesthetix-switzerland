'use client';

import { ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { href: '/products', label: 'Shop', desc: 'Alle Produkte', isPage: true },
    { href: '#mission', label: 'Konzept', desc: 'Warum AESTHETIX wirkt', isPage: false },
    { href: '#faq', label: 'FAQ', desc: 'Häufige Fragen', isPage: false },
    { href: '/kontakt', label: 'Kontakt', desc: 'Schreib uns', isPage: true },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    setMobileOpen(false);
    if (link.isPage) return; // let browser navigate normally
    e.preventDefault();
    const id = link.href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-3 group relative z-50 cursor-pointer"
            >
              <span className="font-display text-lg md:text-xl font-bold tracking-wider text-white">
                AESTHETIX
              </span>
              <span className="hidden sm:inline text-[10px] tracking-[0.3em] text-white/40 uppercase font-light border-l border-white/10 pl-3">
                Switzerland
              </span>
            </a>

            {/* Desktop Nav — pushed right with ml-auto + gap to cart */}
            <div className="hidden md:flex items-center gap-8 ml-auto mr-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-300 tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4 relative z-50">
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
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Full screen solid overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-all duration-300 ease-out md:hidden ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: '#000000' }}
      >
        <div className="flex flex-col justify-between h-full pt-28 pb-12 px-8">
          {/* Navigation Links */}
          <div className="flex flex-col gap-2">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`group flex items-center justify-between py-5 border-b border-white/10 transition-all duration-300 ${
                  mobileOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: mobileOpen ? `${(i + 1) * 80}ms` : '0ms' }}
              >
                <div>
                  <span className="block text-2xl font-display font-bold tracking-wide text-white group-hover:text-white/80 transition-colors">
                    {link.label}
                  </span>
                  <span className="block text-xs text-white/40 mt-1 tracking-wide">
                    {link.desc}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </a>
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            className={`transition-all duration-300 ${
              mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: mobileOpen ? '350ms' : '0ms' }}
          >
            <a
              href="/products"
              onClick={() => setMobileOpen(false)}
              className="block w-full py-4 bg-white text-black text-center font-bold text-sm tracking-wider rounded-full hover:bg-white/90 transition-colors"
            >
              UPGRADE YOUR LOOK
            </a>
            <p className="text-center text-white/30 text-xs mt-4 tracking-wide">
              Facial Optimization for Men
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
