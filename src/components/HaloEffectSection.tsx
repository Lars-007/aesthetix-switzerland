'use client';

import { useScrollReveal } from '@/lib/hooks';
import { Sparkles, Briefcase, Heart, UserCheck } from 'lucide-react';

const blocks = [
  {
    icon: Sparkles,
    title: '1. Der Halo-Effekt (Der "Heiligenschein")',
    description: 'Dies ist der mächtigste psychologische Hebel. Wenn Menschen jemanden als attraktiv wahrnehmen, projizieren sie automatisch positive Charaktereigenschaften auf diese Person.',
    bullets: [
      { label: 'Wahrnehmung', text: 'Gut aussehende Menschen werden instinktiv als kompetenter, vertrauenswürdiger, intelligenter und gesünder eingeschätzt.' },
      { label: 'Vorteil', text: 'Man bekommt oft einen "Vertrauensvorschuss", noch bevor man das erste Wort gesagt hat.' },
    ]
  },
  {
    icon: Briefcase,
    title: '2. Das "Beauty Premium" im Beruf',
    description: 'Statistiken zeigen immer wieder, dass attraktive Menschen im Berufsleben messbare Vorteile haben:',
    bullets: [
      { label: 'Karriere', text: 'Sie werden eher zu Vorstellungsgesprächen eingeladen und schneller befördert.' },
      { label: 'Gehalt', text: 'Es gibt einen korrelierenden Effekt zwischen Aussehen und Einkommen (durchschnittlich 10-15 % mehr).' },
      { label: 'Überzeugungskraft', text: 'Attraktive Führungskräfte wirken überzeugender und strahlen mehr Autorität aus.' },
    ]
  },
  {
    icon: Heart,
    title: '3. Dating & Der Frauenmarkt',
    description: 'Ein gepflegtes, "ästhetisches" Äußeres signalisiert Disziplin, Genetik und Selbstachtung.',
    bullets: [
      { label: 'Erster Eindruck', text: 'Du wirst in sozialen Situationen und beim Dating bevorzugt und höflicher behandelt.' },
      { label: 'Erfolgsquote', text: 'Attraktivere Männer fallen sofort positiv auf, finden auf dem Markt schneller einen Partner und haben eine weitaus höhere Anziehungskraft.' },
      { label: 'Status', text: 'Eine markante Jawline und reine Haut suggerieren hohen Testosteronwert, Status und Maskulinität.' },
    ]
  },
  {
    icon: UserCheck,
    title: '4. Psychologisches Selbstvertrauen',
    description: 'Der wohl wichtigste interne Vorteil ist der psychologische Feedback-Loop:',
    bullets: [
      { label: 'Look Good, Feel Good', text: 'Wenn du weisst, dass du gut aussiehst, verändert sich deine Körperhaltung, dein Blickkontakt und deine Stimme ins Positive.' },
      { label: 'Ausstrahlung', text: 'Dieses gesteigerte Selbstbewusstsein wirkt wiederum extrem attraktiv auf andere – ein positiver Teufelskreis voller Erfolg.' },
    ]
  }
];

export default function HaloEffectSection() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="reveal py-24 md:py-32 bg-black/50 border-y border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-medium">
            Die Psychologie des Erfolgs
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 mb-6 text-white">
            Was bringen dir AESTHETIX Produkte?
          </h2>
          <p className="text-white/80 text-lg leading-relaxed">
            Statistisch gesehen haben gut aussehende Menschen eine weitaus bessere berufliche Karriere, verdienen mehr, sind insgesamt erfolgreicher und haben signifikant bessere Chancen auf dem Dating- und Frauenmarkt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {blocks.map((block, i) => (
            <div
              key={block.title}
              className="bg-bg-card/50 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-10 hover:border-white/20 transition-all duration-500 hover:bg-bg-raised/80 group"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:bg-white/20">
                <block.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-white/90">{block.title}</h3>
              <p className="text-white/80 leading-relaxed mb-8">{block.description}</p>
              
              <div className="space-y-4">
                {block.bullets.map(b => (
                  <div key={b.label} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0 group-hover:bg-white/60 transition-colors" />
                    <p className="text-sm leading-relaxed text-white/70">
                      <strong className="text-white font-semibold">{b.label}:</strong> {b.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
