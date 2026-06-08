'use client';

import { Leaf, User, ShieldCheck, Droplet } from 'lucide-react';

const values = [
  { icon: Leaf, label: 'Naturbasierte Wirkstoffe' },
  { icon: User, label: 'Speziell für Männer' },
  { icon: ShieldCheck, label: 'EU-geprüfte Qualität' },
  { icon: Droplet, label: 'Ohne unnötige Füllstoffe' },
];

export default function BrandValues() {
  return (
    <section className="bg-black border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y divide-white/5 sm:divide-y-0">
          {values.map((value) => (
            <div
              key={value.label}
              className="flex items-center justify-center gap-3 py-5 sm:py-9"
            >
              <value.icon
                className="w-5 h-5 text-white/40 shrink-0"
                strokeWidth={1.5}
              />
              <span className="text-[11px] sm:text-xs md:text-sm tracking-wider uppercase text-white/60 whitespace-nowrap">
                {value.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
