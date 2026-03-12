'use client';

import Link from 'next/link';
import { useScrollReveal } from '@/lib/hooks';
import { ArrowRight } from 'lucide-react';

export default function CtaBanner() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="reveal py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Bereit, dein Aussehen<br className="hidden sm:block" /> auf das nächste Level zu bringen?
        </h2>
        <p className="text-base text-white/40 max-w-xl mx-auto mb-10">
          Starte jetzt mit AESTHETIX und erlebe den Unterschied. Schweizer Qualität, sichtbare Resultate.
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
