'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Swap these paths once the AI-generated before/after images are added
// to /public/compare/. Falls back to /hero.png so the slider always renders.
const BEFORE_SRC = '/compare/before.jpg';
const AFTER_SRC = '/compare/after.jpg';
const FALLBACK_SRC = '/hero.png';

export default function BeforeAfterCompare() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const [beforeSrc, setBeforeSrc] = useState(BEFORE_SRC);
  const [afterSrc, setAfterSrc] = useState(AFTER_SRC);

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      updateFromClientX(clientX);
    };
    const onUp = () => setIsDragging(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [isDragging, updateFromClientX]);

  return (
    <section
      id="results"
      ref={sectionRef}
      className="py-20 md:py-28 bg-black relative overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-medium">
            Echte Resultate
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-white">
            Sieh den Unterschied
          </h2>
          <p className="text-white/60 text-base leading-relaxed mt-4 max-w-xl mx-auto">
            Konsequente Anwendung unterstützt deine Gesichtsstruktur über die Zeit. Ziehe den Regler zum Vergleichen.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div
            ref={containerRef}
            className="relative w-full aspect-[3/4] md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-bg-raised select-none touch-none"
            onMouseDown={(e) => {
              setIsDragging(true);
              updateFromClientX(e.clientX);
            }}
            onTouchStart={(e) => {
              setIsDragging(true);
              updateFromClientX(e.touches[0].clientX);
            }}
          >
            <Image
              src={beforeSrc}
              alt="Vorher"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-cover pointer-events-none"
              onError={() => setBeforeSrc(FALLBACK_SRC)}
            />

            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ clipPath: `inset(0 0 0 ${position}%)` }}
            >
              <Image
                src={afterSrc}
                alt="Nachher"
                fill
                sizes="(max-width: 768px) 100vw, 1024px"
                className="object-cover"
                onError={() => setAfterSrc(FALLBACK_SRC)}
              />
            </div>

            <div
              className="absolute top-0 bottom-0 w-px bg-white/90 pointer-events-none"
              style={{ left: `${position}%` }}
            />

            <button
              type="button"
              aria-label="Vergleichs-Regler ziehen"
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-black/70 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white shadow-lg hover:bg-black/80 transition-colors cursor-ew-resize"
              style={{ left: `${position}%` }}
              onMouseDown={(e) => {
                e.stopPropagation();
                setIsDragging(true);
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                setIsDragging(true);
              }}
            >
              <ChevronLeft className="w-4 h-4 -mr-1" />
              <ChevronRight className="w-4 h-4 -ml-1" />
            </button>

            <span className="absolute bottom-4 left-4 text-[11px] tracking-[0.2em] uppercase font-medium text-white bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 pointer-events-none">
              Vorher
            </span>
            <span className="absolute bottom-4 right-4 text-[11px] tracking-[0.2em] uppercase font-medium text-white bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 pointer-events-none">
              Nachher
            </span>
          </div>

          <p className="text-center text-xs text-white/40 leading-relaxed mt-6 max-w-xl mx-auto">
            Dargestellte Resultate spiegeln konsequente Langzeitanwendung wider. Entwickelt, um Gesichtsstruktur und Konturen zu unterstützen.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
