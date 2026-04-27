'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
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
    <section id="faq" ref={ref} className="reveal py-28 md:py-36 bg-bg">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="hairline w-24" />
            <span className="section-index">— 07 / FAQ</span>
            <div className="hairline w-24" />
          </div>
          <h2 className="display-heading text-4xl md:text-6xl lg:text-7xl text-bone">
            Fragen & <span className="italic font-medium text-accent">Antworten.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`bg-bg-raised rounded-xl border overflow-hidden transition-all duration-500 ease-editorial ${
                  isOpen ? 'border-accent/30' : 'border-white/8 hover:border-white/15'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 px-6 md:px-8 py-6 text-left"
                >
                  <span className="font-mono text-[11px] text-accent/50 tracking-wider flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[15px] font-medium pr-4 flex-1 text-bone">{faq.q}</span>
                  <span
                    className={`flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-500 ${
                      isOpen
                        ? 'bg-accent border-accent rotate-45'
                        : 'border-white/15'
                    }`}
                  >
                    <Plus className={`w-4 h-4 transition-colors duration-300 ${isOpen ? 'text-bg' : 'text-bone/60'}`} />
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-editorial ${
                    isOpen ? 'max-h-[500px] pb-7' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 md:px-8 pl-14 md:pl-16 text-[14px] text-bone/55 leading-relaxed font-light max-w-3xl">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
