'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Package, Repeat, Sparkles } from 'lucide-react';
import SectionHeader from './SectionHeader';

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
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader index="N°05" label="In 3 Schritten" title="So funktioniert es" />
        </motion.div>

        <div className="relative mt-16">
          {/* Connecting timeline line (desktop) — aligned to the node centers */}
          <div className="hidden md:block absolute top-10 left-[16.666%] right-[16.666%] h-px bg-gradient-to-r from-white/5 via-white/25 to-white/5" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Node on the line — black ring masks the line so it reads as connected */}
                <div className="relative z-10 mb-7">
                  <div className="w-20 h-20 rounded-full bg-bg-raised border border-white/15 flex items-center justify-center shadow-[0_0_0_10px_#000] transition-all duration-500 hover:border-white/40 hover:scale-105">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-white text-black text-xs font-display font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-sm text-white/65 leading-relaxed max-w-xs">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
