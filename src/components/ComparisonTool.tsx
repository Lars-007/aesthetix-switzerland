'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ComparisonTool() {
  const [sliderPos, setSliderPos] = useState(50);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
          className="text-center mb-14 md:mb-18"
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-medium">
            Echte Resultate
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 mb-4 text-white">
            Siehe den Unterschied
          </h2>
          <p className="text-sm md:text-base text-white/65 max-w-xl mx-auto leading-relaxed">
            Schiebe den Regler, um die Veränderung zu vergleichen. Konsequente Pflege sorgt für ein
            deutlich klareres Hautbild, reduzierte Unreinheiten und eine markantere Gesichtskontur.
          </p>
        </motion.div>

        {/* Interactive Comparison Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative aspect-[3/4] sm:aspect-[4/3] max-w-2xl mx-auto rounded-3xl overflow-hidden border border-white/10 select-none shadow-2xl"
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
            <span className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-full border border-white/10 tracking-widest z-10">
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
            <span className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-full border border-white/10 tracking-widest z-10">
              VORHER
            </span>
          </div>

          {/* Interactive Native Range Slider (Stretched invisible over container) */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 touch-none"
            aria-label="Bildvergleich Schieberegler"
          />

          {/* Slider Line Overlay */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-white/40 pointer-events-none z-20"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Grab Handle */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black/90 text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)] border border-white/20 transition-transform duration-300">
              <div className="flex items-center justify-center gap-0.5">
                <ChevronLeft className="w-3.5 h-3.5 text-white/70" />
                <ChevronRight className="w-3.5 h-3.5 text-white/70" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.3 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-[10px] tracking-wider text-white uppercase mt-8"
        >
          *Die Resultate spiegeln die konsequente, langfristige Anwendung über 6-12 Wochen wider.
        </motion.p>
      </div>
    </section>
  );
}
