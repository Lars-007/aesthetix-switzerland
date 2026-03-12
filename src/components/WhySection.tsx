'use client';

import { useScrollReveal } from '@/lib/hooks';
import { Shield, Flame, Eye } from 'lucide-react';

const reasons = [
  {
    icon: Shield,
    title: 'Schweizer Präzision',
    subtitle: 'Höchste Standards',
    description: 'Höchste Qualitätsstandards für maximale Wirksamkeit. Pures Niacinamid & Mineralien ohne Füllstoffe. Alle unsere Produkte sind naturbasiert.',
  },
  {
    icon: Flame,
    title: 'Der Halo-Effekt',
    subtitle: 'Psychologischer Hebel',
    description: 'Besseres Aussehen öffnet Türen und schafft sofortigen Respekt. Wer besser aussieht, wird als kompetenter und vertrauenswürdiger wahrgenommen.',
  },
  {
    icon: Eye,
    title: 'Sichtbare Resultate',
    subtitle: 'Nachweisbar effektiv',
    description: 'Scharfe Jawline und reine Haut führen zu mehr Status & Respekt. Gutaussehende Menschen sind statistisch erfolgreicher — beruflich und privat.',
  },
];

export default function WhySection() {
  const ref = useScrollReveal();

  return (
    <section id="why" ref={ref} className="reveal py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium">
            Dein Vorteil
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">
            Warum AESTHETIX?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              className="group bg-bg-raised rounded-2xl border border-white/5 hover:border-white/10 p-8 md:p-10 transition-all duration-500"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                <reason.icon className="w-5 h-5 text-white/60" />
              </div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-2">{reason.subtitle}</p>
              <h3 className="text-xl font-bold mb-4">{reason.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
