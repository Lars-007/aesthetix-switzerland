import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="kontakt" className="bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-xl font-bold tracking-wider mb-4">
              AESTHETIX
            </h3>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Premium Männer-Skincare aus der Schweiz. Entwickelt für Männer, die ihr volles Potenzial ausschöpfen wollen.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-white/30 mb-6 font-semibold">Navigation</h4>
            <div className="flex flex-col gap-3">
              <Link href="/products" className="text-sm text-white/50 hover:text-white transition-colors">Produkte</Link>
              <Link href="/#why" className="text-sm text-white/50 hover:text-white transition-colors">Über uns</Link>
              <Link href="/#faq" className="text-sm text-white/50 hover:text-white transition-colors">FAQ</Link>
              <Link href="/cart" className="text-sm text-white/50 hover:text-white transition-colors">Warenkorb</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-white/30 mb-6 font-semibold">Kontakt</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:info@aesthetix-switzerland.ch" className="text-sm text-white/50 hover:text-white transition-colors">info@aesthetix-switzerland.ch</a>
              <p className="text-sm text-white/50">Schweiz</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            &copy; 2026 AESTHETIX SWITZERLAND. Alle Rechte vorbehalten.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center sm:justify-end">
            <Link href="/agb" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              AGB
            </Link>
            <Link href="/datenschutz" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              Datenschutz
            </Link>
            <Link href="/widerrufsrecht" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              Widerrufsrecht
            </Link>
            <Link href="/versand" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              Versandbedingungen
            </Link>
            <Link href="/kontakt" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
