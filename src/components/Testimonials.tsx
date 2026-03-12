'use client';

import { useScrollReveal } from '@/lib/hooks';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Luca M.',
    location: 'Zürich',
    text: 'Seit ich die AESTHETIX Produkte verwende, bekomme ich regelmässig Komplimente für meine Haut. Die Jawline Mask ist ein absolutes Game-Changer.',
    rating: 5,
  },
  {
    name: 'David K.',
    location: 'Bern',
    text: 'Endlich eine Marke, die Männer-Skincare ernst nimmt. Die Qualität ist spürbar und die Resultate sprechen für sich. Bin seit 3 Monaten dabei.',
    rating: 5,
  },
  {
    name: 'Noah S.',
    location: 'Basel',
    text: 'Das Vulkan-Mineral-Peeling hat mein Hautbild komplett verändert. Zusammen mit dem Niacinamid Gel die perfekte Kombi. Absolute Empfehlung.',
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="reveal py-24 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium">
            Kundenstimmen
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">
            Was unsere Kunden sagen
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="bg-bg-raised rounded-2xl border border-white/5 p-8 md:p-10 transition-all duration-500 hover:border-white/10"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-white text-white" />
                ))}
              </div>
              <p className="text-sm text-white/60 leading-relaxed mb-8">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-white/30 mt-0.5">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
