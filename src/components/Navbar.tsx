'use client';

import { ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
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
    { href: '#results', label: 'Resultate', desc: 'Sieh den Unterschied', isPage: false },
    { href: '#faq', label: 'FAQ', desc: 'Häufige Fragen', isPage: false },
    { href: '/kontakt', label: 'Kontakt', desc: 'Schreib uns', isPage: true },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    setMobileOpen(false);
    if (link.isPage) return;
    e.preventDefault();
    const id = link.href.replace('#', '');
    if (window.location.pathname !== '/') {
      // eslint-disable-next-line react-hooks/immutability
      window.location.href = '/' + link.href;
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-editorial ${
          scrolled
            ? 'bg-bg/85 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`}>
            {/* Logo lockup */}
            <Link
              href="/"
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-3 group relative z-50 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-glow-pulse" />
                <span className="font-display text-lg md:text-xl font-bold tracking-[0.15em] text-bone">
                  AESTHETIX
                </span>
              </span>
              <span className="hidden sm:inline text-[9px] tracking-[0.4em] text-bone/40 uppercase font-light border-l border-white/10 pl-3">
                Switzerland
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-9 ml-auto mr-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="link-underline text-[13px] text-bone/65 hover:text-bone transition-colors duration-300 tracking-wide uppercase font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 relative z-50">
              <button
                onClick={toggleCart}
                className="relative p-2.5 text-bone/70 hover:text-bone transition-colors group"
                aria-label="Warenkorb"
              >
                <ShoppingBag className="w-[18px] h-[18px] group-hover:scale-110 transition-transform" />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-accent text-bg text-[10px] font-bold rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-bone/70 hover:text-bone transition-colors"
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
        className={`fixed inset-0 z-40 bg-bg transition-all duration-500 ease-editorial md:hidden ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col justify-between h-full pt-28 pb-12 px-8">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`group flex items-center justify-between py-5 border-b border-white/10 transition-all duration-500 ${
                  mobileOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: mobileOpen ? `${(i + 1) * 80}ms` : '0ms' }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono text-accent/60 tracking-wider">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <span className="block text-2xl font-display font-bold tracking-wide text-bone group-hover:text-accent transition-colors duration-300">
                      {link.label}
                    </span>
                    <span className="block text-xs text-bone/40 mt-1 tracking-wide">
                      {link.desc}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-bone/30 group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </a>
            ))}
          </div>

          <div
            className={`transition-all duration-500 ${
              mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: mobileOpen ? '450ms' : '0ms' }}
          >
            <Link
              href="/products"
              onClick={() => setMobileOpen(false)}
              className="block w-full py-4 bg-bone text-bg text-center font-bold text-sm tracking-[0.2em] rounded-full hover:bg-accent transition-colors btn-primary"
            >
              UPGRADE YOUR LOOK
            </Link>
            <p className="text-center text-bone/30 text-[10px] mt-4 tracking-[0.3em] uppercase">
              Facial Optimization for Men
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
