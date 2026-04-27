import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="kontakt" className="bg-bg border-t border-white/5 relative overflow-hidden">
      {/* Massive wordmark behind */}
      <div className="absolute -bottom-12 md:-bottom-20 left-0 right-0 pointer-events-none select-none">
        <h2 className="display-heading text-[20vw] leading-none text-bone/[0.04] text-center font-black tracking-tight">
          AESTHETIX
        </h2>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-display text-xl font-bold tracking-[0.15em] text-bone">
                AESTHETIX
              </span>
              <span className="text-[9px] tracking-[0.4em] text-bone/40 uppercase font-light border-l border-white/10 pl-3">
                Switzerland
              </span>
            </div>
            <p className="text-sm text-bone/55 leading-relaxed max-w-sm font-light">
              Premium Männer-Skincare aus der Schweiz. Entwickelt für Männer, die ihr volles Potenzial ausschöpfen wollen.
            </p>
            <a
              href="mailto:info@aesthetix-switzerland.ch"
              className="inline-flex items-center gap-2 mt-6 text-sm text-accent hover:text-bone transition-colors group"
            >
              <span className="link-underline">info@aesthetix-switzerland.ch</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-accent/70 mb-6 font-medium">— Navigation</h4>
            <div className="flex flex-col gap-3">
              <Link href="/products" className="text-sm text-bone/65 hover:text-accent transition-colors w-fit">Produkte</Link>
              <Link href="/#mission" className="text-sm text-bone/65 hover:text-accent transition-colors w-fit">Konzept</Link>
              <Link href="/#results" className="text-sm text-bone/65 hover:text-accent transition-colors w-fit">Resultate</Link>
              <Link href="/#why" className="text-sm text-bone/65 hover:text-accent transition-colors w-fit">Über uns</Link>
              <Link href="/#faq" className="text-sm text-bone/65 hover:text-accent transition-colors w-fit">FAQ</Link>
            </div>
          </div>

          {/* Contact / Legal nav */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-accent/70 mb-6 font-medium">— Service</h4>
            <div className="flex flex-col gap-3">
              <Link href="/kontakt" className="text-sm text-bone/65 hover:text-accent transition-colors w-fit">Kontakt</Link>
              <Link href="/versand" className="text-sm text-bone/65 hover:text-accent transition-colors w-fit">Versand</Link>
              <Link href="/widerrufsrecht" className="text-sm text-bone/65 hover:text-accent transition-colors w-fit">Widerrufsrecht</Link>
              <Link href="/agb" className="text-sm text-bone/65 hover:text-accent transition-colors w-fit">AGB</Link>
              <Link href="/datenschutz" className="text-sm text-bone/65 hover:text-accent transition-colors w-fit">Datenschutz</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-bone/30 tracking-wider">
            &copy; 2026 AESTHETIX SWITZERLAND · Alle Rechte vorbehalten
          </p>
          <p className="text-[10px] text-bone/30 tracking-[0.3em] uppercase font-mono">
            Made with precision · CH
          </p>
        </div>
      </div>
    </footer>
  );
}
