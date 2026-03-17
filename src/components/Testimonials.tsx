'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Luca M.',
    location: 'Zürich',
    text: 'Regelmässig Komplimente für meine Haut. Die Jawline Mask ist ein absoluter Game-Changer.',
    rating: 5,
  },
  {
    name: 'David K.',
    location: 'Bern',
    text: 'Endlich Männer-Skincare, die wirkt. Spürbare Qualität, sichtbare Resultate nach 3 Monaten.',
    rating: 5,
  },
  {
    name: 'Noah S.',
    location: 'Basel',
    text: 'Vulkan-Peeling + Niacinamid Gel = perfekte Kombi. Mein Hautbild hat sich komplett verändert.',
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium">
            Kundenstimmen
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">
            Was unsere Kunden sagen
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-bg-raised rounded-2xl border border-white/5 p-8 transition-all duration-500 hover:border-white/10"
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-white text-white" />
                ))}
              </div>
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-white/30 mt-0.5">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
