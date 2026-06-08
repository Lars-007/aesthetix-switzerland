import Link from 'next/link';
import { Mail, MapPin, Instagram, Linkedin } from 'lucide-react';

function TikTok({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.78.12v-3.2a5.78 5.78 0 0 0-.78-.05A5.7 5.7 0 1 0 15.54 18V9.4a7.34 7.34 0 0 0 4.46 1.5V7.8a4.28 4.28 0 0 1-3.4-1.98Z" />
    </svg>
  );
}

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/aesthetix_switzerland', Icon: Instagram },
  { label: 'TikTok', href: 'https://www.tiktok.com/@aesthetix_switzerland', Icon: TikTok },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/aesthetix-switzerland/', Icon: Linkedin },
];

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
            <p className="text-sm text-white/55 leading-relaxed max-w-xs mb-6">
              Premium Männer-Skincare einer Schweizer Marke. Für Männer, die ihr volles Potenzial ausschöpfen wollen.
            </p>
            <div className="flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 hover:scale-105 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-white/45 mb-6 font-semibold">Navigation</h4>
            <div className="flex flex-col gap-3">
              <Link href="/products" className="text-sm text-white/65 hover:text-white transition-colors w-fit">Produkte</Link>
              <Link href="/#why" className="text-sm text-white/65 hover:text-white transition-colors w-fit">Über uns</Link>
              <Link href="/#faq" className="text-sm text-white/65 hover:text-white transition-colors w-fit">FAQ</Link>
              <Link href="/cart" className="text-sm text-white/65 hover:text-white transition-colors w-fit">Warenkorb</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-white/45 mb-6 font-semibold">Kontakt</h4>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:info@aesthetix-switzerland.ch"
                className="flex items-center gap-3 text-sm text-white/65 hover:text-white transition-colors group"
              >
                <span className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-white/30 transition-colors">
                  <Mail className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                </span>
                info@aesthetix-switzerland.ch
              </a>
              <div className="flex items-center gap-3 text-sm text-white/65">
                <span className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-white/50" />
                </span>
                Schweiz
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; 2026 AESTHETIX SWITZERLAND. Alle Rechte vorbehalten.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center sm:justify-end">
            <Link href="/agb" className="text-xs text-white/45 hover:text-white/80 transition-colors">
              AGB
            </Link>
            <Link href="/datenschutz" className="text-xs text-white/45 hover:text-white/80 transition-colors">
              Datenschutz
            </Link>
            <Link href="/widerrufsrecht" className="text-xs text-white/45 hover:text-white/80 transition-colors">
              Widerrufsrecht
            </Link>
            <Link href="/impressum" className="text-xs text-white/45 hover:text-white/80 transition-colors">
              Impressum
            </Link>
            <Link href="/versand" className="text-xs text-white/45 hover:text-white/80 transition-colors">
              Versandbedingungen
            </Link>
            <Link href="/kontakt" className="text-xs text-white/45 hover:text-white/80 transition-colors">
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
