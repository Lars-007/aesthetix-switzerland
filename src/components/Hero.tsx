'use client';

import { useState, useEffect, useCallback } from 'react';

const headlines = [
  'Master Your Appearance.',
  'Dominate Every Room.',
  'Unlock Your Potential.',
  'Optimize Your Looks.',
  'Elevate Your Presence.',
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-black">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'url(/hero.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="mb-8">
          <span className="inline-block text-[10px] tracking-[0.4em] uppercase text-white/30 font-medium border border-white/10 rounded-full px-5 py-2">
            FACIAL OPTIMIZATION FOR MEN
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8 min-h-[1.2em]">
          <span>{displayText}</span>
          <span className="animate-blink font-thin text-white/50">|</span>
        </h1>

        <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto mb-12 leading-relaxed">
          Verbessere dein Aussehen mit hochwertigen AESTHETIX Produkten.
          Entwickelt in der Schweiz für den modernen Mann.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/products"
            className="group bg-white text-black font-bold px-10 py-4 rounded-full text-sm tracking-wider hover:bg-white/90 transition-all duration-300 btn-primary"
          >
            UPGRADE YOUR LOOK
          </a>
          <a
            href="#mission"
            onClick={(e) => { e.preventDefault(); document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="text-sm text-white/40 hover:text-white tracking-wider transition-colors duration-300 border border-white/10 hover:border-white/30 px-10 py-4 rounded-full"
          >
            DAS KONZEPT
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/20">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  );
}
