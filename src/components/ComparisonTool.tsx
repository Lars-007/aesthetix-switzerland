'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function ComparisonTool() {
  const [sliderPos, setSliderPos] = useState(50);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const interact = (val: number) => {
    setSliderPos(val);
    if (!hasInteracted) setHasInteracted(true);
  };

  // One-time "drag me" hint sweep when the section scrolls into view
  useEffect(() => {
    if (!isInView || hasInteracted) return;
    if (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const keyframes = [50, 78, 24, 50];
    const segDur = 650;
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    let cancelled = false;
    let raf = 0;
    let seg = 0;
    let start: number | null = null;

    const step = (now: number) => {
      if (cancelled) return;
      if (start === null) start = now;
      const t = Math.min((now - start) / segDur, 1);
      const from = keyframes[seg];
      const to = keyframes[seg + 1];
      setSliderPos(from + (to - from) * ease(t));
      if (t >= 1) {
        seg += 1;
        start = now;
        if (seg >= keyframes.length - 1) return;
      }
      raf = requestAnimationFrame(step);
    };

    const delay = setTimeout(() => { raf = requestAnimationFrame(step); }, 550);
    return () => { cancelled = true; clearTimeout(delay); if (raf) cancelAnimationFrame(raf); };
  }, [isInView, hasInteracted]);

  return (
    <section
      ref={ref}
      id="results"
      className="py-24 md:py-32 bg-black border-y border-white/5 relative overflow-hidden"
    >
      {/* Dynamic background glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] blur-[130px] rounded-full pointer-events-none"
        animate={isInView ? { scale: [0.9, 1.1, 1], opacity: [0, 0.4, 0.2] } : {}}
        transition={{ duration: 2.5, ease: 'easeOut' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeader
            index="N°03"
            label="Echte Resultate"
            title="Siehe den Unterschied"
            description="Schiebe den Regler, um die Veränderung zu vergleichen. Konsequente Pflege sorgt für ein deutlich klareres Hautbild, reduzierte Unreinheiten und eine markantere Gesichtskontur."
          />
        </motion.div>

        {/* Interactive Comparison Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="group relative aspect-[3/4] sm:aspect-[4/3] max-w-2xl mx-auto rounded-3xl overflow-hidden border border-white/10 select-none shadow-2xl"
        >
          {/* AFTER IMAGE (Background / Always visible on right side) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/after.jpg"
              alt="Nachher - Reine Haut und scharfe Jawline"
              fill
              className="object-cover pointer-events-none"
              priority
            />
            <span className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-full border border-white/15 tracking-widest z-10">
              NACHHER
            </span>
          </div>

          {/* BEFORE IMAGE (Foreground / Clipped based on sliderPos) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden z-10"
            style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
          >
            <Image
              src="/before.jpg"
              alt="Vorher - Unreinheiten und weiche Jawline"
              fill
              className="object-cover pointer-events-none"
              priority
            />
            <span className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md text-white/80 text-[10px] font-bold px-4 py-2 rounded-full border border-white/15 tracking-widest z-10">
              VORHER
            </span>
          </div>

          {/* Interactive Native Range Slider (Stretched invisible over container) */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => interact(Number(e.target.value))}
            onPointerDown={() => { setDragging(true); setHasInteracted(true); }}
            onPointerUp={() => setDragging(false)}
            onPointerLeave={() => setDragging(false)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 touch-none"
            aria-label="Bildvergleich Schieberegler"
          />

          {/* Slider Line Overlay */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-white pointer-events-none z-20 shadow-[0_0_18px_2px_rgba(255,255,255,0.45)]"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Grab Handle */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl text-white flex items-center justify-center border border-white/50 shadow-2xl transition-transform duration-200 ${
                dragging ? 'scale-110' : 'group-hover:scale-105'
              }`}
            >
              {/* invite-to-drag pulse, fades once interacted */}
              {!hasInteracted && (
                <span className="absolute inset-0 rounded-full border border-white/40 animate-ping" />
              )}
              <div className="flex items-center -space-x-1">
                <ChevronLeft className="w-4 h-4" />
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.35 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-[10px] tracking-wider text-white uppercase mt-8"
        >
          *Die Resultate spiegeln die konsequente, langfristige Anwendung über 6-12 Wochen wider.
        </motion.p>
      </div>
    </section>
  );
}
