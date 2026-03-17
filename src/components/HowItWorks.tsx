'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Package, Repeat, Sparkles } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Package,
    title: 'Bestellen',
    description: 'Produkte auswählen & bequem online bestellen. Lieferung in 2-4 Werktagen.',
  },
  {
    number: '02',
    icon: Repeat,
    title: 'Routine starten',
    description: 'Morgens & abends anwenden. In deine tägliche Routine integrieren.',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'Resultate sehen',
    description: 'Sichtbare Verbesserungen nach wenigen Wochen. Mehr Selbstvertrauen.',
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="how" ref={ref} className="py-20 md:py-28 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-medium">
            In 3 Schritten
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-white">
            So funktioniert es
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative group"
            >
              <div className="bg-bg-raised rounded-2xl border border-white/5 p-8 hover:border-white/10 transition-all duration-500 h-full text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="font-display text-3xl font-bold text-white/15">
                    {step.number}
                  </span>
                  <step.icon className="w-5 h-5 text-white/50" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{step.description}</p>
              </div>

              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-white/10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
