'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Luca M.',
    location: 'Zürich',
    text: 'Die Tinted Sunscreen funktioniert sofort und meine Haut sieht direk viel gebärunter aus und es schützt auch noch vor der Sonne was noch ein guter bonus ist. Der Preis ist etwas teurer aber ich finde es lohnt sich wenn man ein hochwertiges Produkt will.',
    rating: 5,
  },
  {
    name: 'David K.',
    location: 'St. Gallen',
    text: 'Gute Produkte mit coolem und ästetischem Design für Männer die keine "frauen" Skincare benutzen wollen.',
    rating: 4,
  },
  {
    name: 'Noah S.',
    location: 'Lausanne',
    text: 'Enfin, il existe d\'excellents soins pour la peau spécialement conçus pour les hommes. Je recommande vivement ma crème solaire teintée.',
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
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`w-4 h-4 ${j < t.rating ? 'fill-white text-white' : 'text-white/20'}`}
                  />
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
