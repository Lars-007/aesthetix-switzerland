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
    <section id="how" ref={ref} className="py-28 md:py-36 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="hairline w-24" />
            <span className="section-index">— 05 / Workflow</span>
            <div className="hairline w-24" />
          </div>
          <h2 className="display-heading text-4xl md:text-6xl lg:text-7xl text-bone">
            So funktioniert <span className="italic font-medium text-accent">es.</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Horizontal connector line — desktop */}
          <div className="hidden md:block absolute top-[42px] left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="relative group text-center"
              >
                {/* Numbered circle on the line */}
                <div className="relative z-10 w-[84px] h-[84px] mx-auto mb-7 rounded-full bg-bg-card border border-accent/30 flex items-center justify-center group-hover:border-accent group-hover:scale-105 transition-all duration-700">
                  <span className="stat-number text-2xl text-accent">{step.number}</span>
                  <step.icon className="absolute -top-2 -right-2 w-7 h-7 p-1.5 rounded-full bg-bg border border-white/10 text-bone/70 group-hover:text-accent transition-colors duration-500" />
                </div>

                <h3 className="display-heading text-2xl md:text-3xl mb-3 text-bone">{step.title}</h3>
                <p className="text-sm text-bone/55 leading-relaxed max-w-xs mx-auto font-light">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
