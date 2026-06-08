'use client';

import { useState, useEffect, useCallback } from 'react';

const headlines = [
  'Beherrsche dein Auftreten.',
  'Dominiere jeden Raum.',
  'Entfalte dein Potenzial.',
  'Optimiere dein Aussehen.',
  'Steigere deine Präsenz.',
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const typeSpeed = 60;
  const deleteSpeed = 30;
  const waitTime = 2500;

  const tick = useCallback(() => {
    const fullText = headlines[currentIndex];

    if (isWaiting) return;

    if (!isDeleting) {
      setDisplayText(fullText.substring(0, displayText.length + 1));
      if (displayText.length + 1 === fullText.length) {
        setIsWaiting(true);
        setTimeout(() => {
          setIsWaiting(false);
          setIsDeleting(true);
        }, waitTime);
      }
    } else {
      setDisplayText(fullText.substring(0, displayText.length - 1));
      if (displayText.length - 1 === 0) {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % headlines.length);
      }
    }
  }, [currentIndex, displayText, isDeleting, isWaiting]);

  useEffect(() => {
    const timer = setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background — responsive: portrait centered/visible on mobile, pushed right on desktop */}
      <div className="absolute inset-0 bg-black">
        {/* Mobile portrait */}
        <div
          className="absolute inset-0 opacity-80 md:hidden"
          style={{
            backgroundImage: 'url(/hero.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 18%',
          }}
        />
        {/* Desktop portrait */}
        <div
          className="absolute inset-0 opacity-60 hidden md:block"
          style={{
            backgroundImage: 'url(/hero.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'right top',
          }}
        />
        {/* Mobile gradient — image visible up top, dark at the bottom for text */}
        <div className="absolute inset-0 md:hidden bg-gradient-to-t from-black via-black/60 to-black/10" />
        {/* Desktop gradients — dark on the left, portrait on the right */}
        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black via-black/80 to-black/20" />
        <div className="absolute inset-0 hidden md:block bg-gradient-to-t from-black via-transparent to-black/40" />
        <div className="absolute inset-0 noise-overlay opacity-[0.07] mix-blend-overlay pointer-events-none" />
      </div>

      {/* Editorial grid line */}
      <div className="absolute inset-0 z-[1] pointer-events-none max-w-7xl mx-auto w-full px-6 lg:px-8">
        <div className="relative h-full hidden lg:block">
          <div className="absolute top-0 bottom-0 left-[58.333%] w-px bg-white/[0.06]" />
        </div>
      </div>

      {/* Top meta bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-28 md:pt-32">
        <div className="flex items-center justify-between text-[10px] tracking-[0.35em] uppercase text-white/40 border-b border-white/10 pb-5">
          <span>Gesichtsoptimierung für Männer</span>
          <span className="hidden sm:block">Schweizer Marke</span>
        </div>
      </div>

      <div className="flex-1" />

      {/* Headline anchored bottom-left, meta column right */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-20 md:pb-24">
        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-10 items-end">
          <div className="lg:col-span-7">
            <span className="block font-display text-xs tracking-[0.3em] uppercase text-white/30 mb-5">
              N°01 — Looksmaxxing
            </span>
            <h1 className="font-display font-bold leading-[0.9] tracking-tight text-5xl sm:text-7xl lg:text-[7rem] min-h-[2.7em] sm:min-h-[1.9em] lg:min-h-[1.85em]">
              <span>{displayText}</span>
              <span className="animate-blink font-thin text-white/40">|</span>
            </h1>
          </div>

          <div className="lg:col-span-5 lg:pb-2">
            <p className="text-base sm:text-lg text-white/65 max-w-md mb-8 leading-relaxed">
              Verbessere dein Aussehen mit hochwertigen AESTHETIX Produkten.
              Schweizer Marke für den modernen Mann.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/products"
                className="group bg-white text-black font-bold px-9 py-4 rounded-full text-sm tracking-wider hover:bg-white/90 transition-all duration-300 btn-primary text-center"
              >
                JETZT STARTEN
              </a>
              <a
                href="#mission"
                onClick={(e) => { e.preventDefault(); document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="text-sm text-white/50 hover:text-white tracking-wider transition-colors duration-300 border border-white/15 hover:border-white/40 px-9 py-4 rounded-full text-center"
              >
                DAS KONZEPT
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — bottom right */}
      <div className="absolute bottom-8 right-6 lg:right-8 z-10 hidden sm:flex items-center gap-3">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/25">Scrollen</span>
        <div className="w-12 h-px bg-gradient-to-r from-white/25 to-transparent" />
      </div>
    </section>
  );
}
