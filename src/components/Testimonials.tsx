'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Luca M.',
    location: 'Zürich',
    text: 'Die Tinted Sunscreen funktioniert sofort und meine Haut sieht direkt viel gebräunter aus und es schützt auch noch vor der Sonne was noch ein guter Bonus ist. Der Preis ist etwas teurer aber ich finde es lohnt sich wenn man ein hochwertiges Produkt will.',
    rating: 5,
    image: '/products/sunscreen-stick.png',
    product: 'Tinted Sunscreen Stick',
  },
  {
    name: 'David K.',
    location: 'St. Gallen',
    text: 'Gute Produkte mit coolem und ästhetischem Design für Männer die keine "Frauen"-Skincare benutzen wollen.',
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
    <section ref={ref} className="py-28 md:py-36 bg-bg-raised relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-5">
              <span className="section-index">— 06 / Stimmen</span>
              <div className="hairline w-24" />
            </div>
            <h2 className="display-heading text-4xl md:text-6xl lg:text-7xl text-bone">
              Was unsere<br />
              <span className="italic font-medium text-accent">Kunden sagen.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex items-end">
            <div className="border-l-2 border-accent/40 pl-6">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-bone/60 font-light">
                <span className="text-bone font-semibold">4.8/5</span> aus über 1&apos;200 Bewertungen
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-bg-card rounded-2xl border border-white/8 overflow-hidden transition-all duration-700 ease-editorial hover:border-accent/30 flex flex-col relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-accent/15 z-10" />

              <div className="relative aspect-[4/3] bg-gradient-to-br from-bg-raised to-bg-card overflow-hidden">
                <Image
                  src={t.image}
                  alt={t.product}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-contain p-8 transition-all duration-1000 ease-editorial group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-60" />
                <span className="absolute bottom-4 left-4 text-[10px] tracking-[0.25em] uppercase text-accent bg-bg/80 backdrop-blur-md rounded-full px-3 py-1.5 border border-accent/30 font-medium">
                  {t.product}
                </span>
              </div>

              <div className="p-7 md:p-8 flex flex-col flex-1">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`w-4 h-4 ${j < t.rating ? 'fill-accent text-accent' : 'text-white/15'}`}
                    />
                  ))}
                </div>
                <p className="text-[15px] text-bone/75 leading-relaxed mb-7 flex-1 font-light">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="pt-5 border-t border-white/5">
                  <p className="text-sm font-semibold text-bone">{t.name}</p>
                  <p className="text-xs text-bone/35 mt-1 tracking-wider uppercase">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
