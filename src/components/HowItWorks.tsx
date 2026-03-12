'use client';

import { useScrollReveal } from '@/lib/hooks';
import { Package, Repeat, Sparkles } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Package,
    title: 'Bestellen',
    description: 'Wähle deine Produkte aus und bestelle bequem online. Lieferung in 2-4 Werktagen in die ganze Schweiz.',
  },
  {
    number: '02',
    icon: Repeat,
    title: 'Routine starten',
    description: 'Integriere die Produkte in deine tägliche Routine. Morgens und abends für maximale Wirkung.',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'Resultate sehen',
    description: 'Spürbare Verbesserungen nach wenigen Wochen. Bessere Haut, schärfere Jawline, mehr Selbstvertrauen.',
  },
];

export default function HowItWorks() {
  const ref = useScrollReveal();

  return (
    <section id="how" ref={ref} className="reveal py-24 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium">
            In 3 Schritten
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">
            So funktioniert es
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="bg-bg-raised rounded-2xl border border-white/5 p-8 md:p-10 hover:border-white/10 transition-all duration-500 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-display text-4xl font-bold text-white/10">
                    {step.number}
                  </span>
                  <step.icon className="w-6 h-6 text-white/40" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{step.description}</p>
              </div>

              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-white/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
