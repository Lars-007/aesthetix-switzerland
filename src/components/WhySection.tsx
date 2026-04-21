'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Leaf, Eye } from 'lucide-react';

const reasons = [
  {
    icon: Shield,
    title: 'Schweizer Qualität',
    description: 'Pures Niacinamid & Mineralien. Keine Füllstoffe, keine Kompromisse.',
  },
  {
    icon: Leaf,
    title: 'Naturbasierte Inhaltsstoffe',
    description: 'Vulkanische Mineralien, Niacinamid & natürliche Wirkstoffe — keine synthetischen Füllstoffe.',
  },
  {
    icon: Eye,
    title: 'Sichtbare Resultate',
    description: 'Schärfere Jawline, reinere Haut — messbar mehr Erfolg.',
  },
];

export default function WhySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="why" ref={ref} className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-medium">
            Dein Vorteil
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-white">
            Warum AESTHETIX?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group bg-bg-raised rounded-2xl border border-white/5 hover:border-white/10 p-8 transition-all duration-500 text-center"
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-5 mx-auto group-hover:bg-white/20 group-hover:scale-110 transition-all duration-500">
                <reason.icon className="w-5 h-5 text-white/80" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">{reason.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
