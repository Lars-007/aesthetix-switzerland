'use client';

import Link from 'next/link';
import { useScrollReveal } from '@/lib/hooks';
import { ArrowRight } from 'lucide-react';

export default function CtaBanner() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="reveal relative py-28 md:py-40 bg-black border-t border-white/5 overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/[0.04] blur-[140px] rounded-full pointer-events-none" />
      {/* Film grain */}
      <div className="absolute inset-0 noise-overlay opacity-[0.05] pointer-events-none" />
      {/* Oversized faint wordmark */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-bold text-white/[0.025] text-[22vw] leading-none tracking-tighter whitespace-nowrap"
      >
        AESTHETIX
      </span>
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Bereit, dein Aussehen<br className="hidden sm:block" /> auf das nächste Level zu bringen?
        </h2>
        <p className="text-base text-white/60 max-w-xl mx-auto mb-10">
          Starte jetzt mit AESTHETIX und erlebe den Unterschied. EU-geprüfte Qualität, sichtbare Resultate.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-3 bg-white text-black font-bold px-10 py-4 rounded-full text-sm tracking-wider hover:bg-white/90 transition-all duration-300 group btn-primary"
        >
          JETZT STARTEN
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
