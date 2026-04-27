'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
      className="py-28 md:py-36 bg-bg relative overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="hairline w-24" />
            <span className="section-index">— 03 / Resultate</span>
            <div className="hairline w-24" />
          </div>
          <h2 className="display-heading text-4xl md:text-6xl lg:text-7xl text-bone mb-5">
            Sieh den<br />
            <span className="italic font-medium text-accent">Unterschied.</span>
          </h2>
          <p className="text-bone/55 text-base md:text-lg leading-relaxed max-w-xl mx-auto font-light">
            Konsequente Anwendung unterstützt deine Gesichtsstruktur über die Zeit.
            <span className="block text-bone/35 mt-1">Ziehe den Regler zum Vergleichen.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Frame */}
          <div className="absolute -inset-4 md:-inset-6 border border-accent/15 rounded-3xl pointer-events-none" />
          <div className="absolute -inset-1 md:-inset-2 border border-white/5 rounded-3xl pointer-events-none" />

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

            {/* Divider line — accent gradient */}
            <div
              className="absolute top-0 bottom-0 w-px pointer-events-none"
              style={{
                left: `${position}%`,
                background: 'linear-gradient(to bottom, transparent 0%, #C9A37A 50%, transparent 100%)',
                boxShadow: '0 0 20px rgba(201, 163, 122, 0.5)',
              }}
            />

            <button
              type="button"
              aria-label="Vergleichs-Regler ziehen"
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-bg/80 backdrop-blur-sm border border-accent/40 flex items-center justify-center text-accent shadow-2xl hover:bg-accent hover:text-bg transition-all duration-300 cursor-ew-resize group"
              style={{ left: `${position}%`, boxShadow: '0 0 40px rgba(201, 163, 122, 0.4)' }}
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

            <span className="absolute bottom-5 left-5 text-[10px] tracking-[0.3em] uppercase font-medium text-bone bg-bg/80 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 pointer-events-none">
              Vorher
            </span>
            <span className="absolute bottom-5 right-5 text-[10px] tracking-[0.3em] uppercase font-medium text-accent bg-bg/80 backdrop-blur-md rounded-full px-4 py-2 border border-accent/30 pointer-events-none">
              Nachher
            </span>
          </div>

          <p className="text-center text-xs text-bone/35 leading-relaxed mt-10 max-w-xl mx-auto font-light tracking-wide">
            Dargestellte Resultate spiegeln konsequente Langzeitanwendung wider.
            <span className="block">Entwickelt, um Gesichtsstruktur und Konturen zu unterstützen.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
