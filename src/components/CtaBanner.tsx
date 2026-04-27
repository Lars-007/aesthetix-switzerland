'use client';

import Link from 'next/link';
import { useScrollReveal } from '@/lib/hooks';
import { ArrowRight } from 'lucide-react';

export default function CtaBanner() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="reveal py-32 md:py-44 relative overflow-hidden bg-bg-raised">
      {/* Champagne radial atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent-glow blur-[150px] rounded-full pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #C9A37A 1px, transparent 1px), linear-gradient(to bottom, #C9A37A 1px, transparent 1px)',
          backgroundSize: '120px 120px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-7">
          <div className="hairline w-24" />
          <span className="section-index">— 08 / Take Action</span>
          <div className="hairline w-24" />
        </div>

        <h2 className="display-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-bone leading-[0.95] mb-8">
          Bereit, dein Aussehen<br />
          <span className="italic font-medium text-accent">auf das nächste Level zu bringen?</span>
        </h2>

        <p className="text-base md:text-lg text-bone/55 max-w-xl mx-auto mb-12 font-light leading-relaxed">
          Starte jetzt mit AESTHETIX und erlebe den Unterschied.
          <span className="block text-bone/35 mt-1">Schweizer Qualität. Sichtbare Resultate.</span>
        </p>

        <Link
          href="/products"
          className="inline-flex items-center gap-3 bg-bone text-bg font-bold px-12 py-5 rounded-full text-[13px] tracking-[0.25em] hover:bg-accent transition-all duration-500 group btn-primary"
        >
          JETZT STARTEN
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>

        <p className="mt-10 text-[10px] tracking-[0.4em] text-bone/30 uppercase font-mono">
          Made in Switzerland · Engineered for Men
        </p>
      </div>
    </section>
  );
}
