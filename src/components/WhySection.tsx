'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Leaf, Eye } from 'lucide-react';

const reasons = [
  {
    icon: Shield,
    index: '01',
    title: 'Schweizer Qualität',
    description: 'Pures Niacinamid & Mineralien. Keine Füllstoffe, keine Kompromisse.',
  },
  {
    icon: Leaf,
    index: '02',
    title: 'Naturbasierte Inhaltsstoffe',
    description: 'Vulkanische Mineralien, Niacinamid & natürliche Wirkstoffe — keine synthetischen Füllstoffe.',
  },
  {
    icon: Eye,
    index: '03',
    title: 'Sichtbare Resultate',
    description: 'Schärfere Jawline, reinere Haut — messbar mehr Erfolg.',
  },
];

export default function WhySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="why" ref={ref} className="py-28 md:py-36 bg-bg-raised relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg/50 via-transparent to-bg/50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <span className="section-index">— 04 / Vorteile</span>
              <div className="hairline w-24" />
            </div>
            <h2 className="display-heading text-4xl md:text-6xl lg:text-7xl text-bone">
              Warum<br />
              <span className="italic font-medium text-accent">AESTHETIX?</span>
            </h2>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <p className="text-bone/55 text-base md:text-lg leading-relaxed font-light">
              Drei Prinzipien. Keine Kompromisse. Wir entwickeln Skincare-Tools mit der gleichen Präzision wie Schweizer Uhren —
              <span className="text-accent"> kompromisslos auf Wirkung getrimmt.</span>
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-bg-card rounded-2xl border border-white/8 hover:border-accent/30 p-8 md:p-10 transition-all duration-700 ease-editorial overflow-hidden"
            >
              <span className="absolute top-6 right-7 font-mono text-[11px] text-accent/40 tracking-widest">
                {reason.index}
              </span>

              <div className="w-14 h-14 bg-accent-glow border border-accent/20 rounded-xl flex items-center justify-center mb-7 group-hover:border-accent/50 group-hover:scale-110 transition-all duration-700">
                <reason.icon className="w-5 h-5 text-accent" />
              </div>

              <h3 className="display-heading text-2xl md:text-3xl mb-3 text-bone">{reason.title}</h3>
              <p className="text-sm text-bone/55 leading-relaxed font-light">{reason.description}</p>

              <div className="mt-6 pt-6 border-t border-white/5">
                <div className="h-[2px] w-12 bg-accent/40 group-hover:w-full group-hover:bg-accent transition-all duration-700 ease-editorial" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
