'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Luca M.',
    location: 'Zürich',
    text: 'Die Tinted Sunscreen funktioniert sofort und meine Haut sieht direk viel gebärunter aus und es schützt auch noch vor der Sonne was noch ein guter bonus ist. Der Preis ist etwas teurer aber ich finde es lohnt sich wenn man ein hochwertiges Produkt will.',
    rating: 5,
    image: '/products/sunscreen-stick.png',
    product: 'Tinted Sunscreen Stick',
  },
  {
    name: 'David K.',
    location: 'St. Gallen',
    text: 'Gute Produkte mit coolem und ästetischem Design für Männer die keine "frauen" Skincare benutzen wollen.',
    rating: 4,
    image: '/products/jawline-mask.png',
    product: 'Jawline Mask',
  },
  {
    name: 'Noah S.',
    location: 'Lausanne',
    text: 'Enfin, il existe d\'excellents soins pour la peau spécialement conçus pour les hommes. Je recommande vivement ma crème solaire teintée.',
    rating: 5,
    image: '/products/mineral-peeling.png',
    product: 'Mineral Peeling',
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
              className="group bg-bg-raised rounded-2xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-white/10 flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-gradient-to-br from-white/[0.04] to-white/[0.01] overflow-hidden">
                <Image
                  src={t.image}
                  alt={t.product}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 text-[10px] tracking-[0.2em] uppercase text-white/70 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10">
                  {t.product}
                </span>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`w-4 h-4 ${j < t.rating ? 'fill-white text-white' : 'text-white/20'}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-white/60 leading-relaxed mb-6 flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-white/30 mt-0.5">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
