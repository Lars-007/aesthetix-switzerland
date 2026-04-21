'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useScrollReveal } from '@/lib/hooks';

const faqs = [
  {
    q: 'Was bringen mir die Produkte von AESTHETIX?',
    a: 'Unsere Produkte verbessern dein Aussehen gezielt: Schärfe deine Jawline mit der Face Mask, verfeinere deine Hautstruktur mit dem Niacinamid Gel und schütze deinen Teint mit unserem Invisible SPF-Stick — dein strategisches System für einen unschlagbaren Halo-Effekt.',
  },
  {
    q: 'Wann sehe ich erste Resultate?',
    a: 'Sofortige Effekte durch das Vulkan-Mineral-Peeling und den getönten SPF-Stick. Langfristige Verbesserungen der Hautstruktur und Wimpern-Dichte sind bei täglicher Anwendung nach ca. 4-8 Wochen sichtbar.',
  },
  {
    q: 'Bringen die AESTHETIX Face Mask oder der Gua Sha wirklich was?',
    a: 'Ja, sie sind mechanische Tools für maximale Symmetrie. Die Maske unterstützt durch gezielte Kompression eine scharfe Jawline, während das Gua Sha Schwellungen reduziert und deinen Halo-Effekt vervollständigt.',
  },
  {
    q: 'Wie lange dauert der Versand innerhalb der Schweiz?',
    a: 'Da wir ein Schweizer Unternehmen sind, legen wir Wert auf Schnelligkeit. Deine Bestellung wird in der Regel innerhalb von 24 Stunden bearbeitet. Die Zustellung erfolgt meist innerhalb von 2 bis 4 Werktagen direkt zu dir nach Hause.',
  },
  {
    q: 'Sind die Produkte für jeden Hauttyp geeignet?',
    a: 'Ja, unsere Produkte sind dermatologisch getestet und für alle Hauttypen geeignet. Wir setzen auf natürliche Inhaltsstoffe ohne aggressive Chemikalien — perfekt für empfindliche und normale Haut gleichermassen.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useScrollReveal();

  return (
    <section id="faq" ref={ref} className="reveal py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium">
            Fragen & Antworten
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">
            FAQ
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-bg-raised rounded-xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-sm font-semibold pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-white/30 flex-shrink-0 transition-transform duration-300 ${
                    open === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
              >
                <p className="px-6 text-sm text-white/40 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
