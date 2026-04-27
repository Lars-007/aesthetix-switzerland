'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const headlines = [
  'Master Your Appearance.',
  'Dominate Every Room.',
  'Engineer Your Edge.',
  'Refine The Reflection.',
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg">
      {/* Background image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: 'url(/hero.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
        {/* Gradient atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/50 via-bg/30 to-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-transparent to-bg/70" />

        {/* Champagne glow */}
        <div className="hero-glow w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-glow-pulse" />
      </div>

      {/* Side editorial markers — desktop only */}
      <div className="hidden lg:flex absolute top-1/2 left-8 -translate-y-1/2 flex-col items-start gap-3 z-10">
        <span className="font-mono text-[10px] tracking-[0.3em] text-accent/70 [writing-mode:vertical-rl] rotate-180">
          EST · 2025 · CH
        </span>
        <div className="w-px h-24 bg-gradient-to-b from-accent/40 to-transparent" />
      </div>
      <div className="hidden lg:flex absolute top-1/2 right-8 -translate-y-1/2 flex-col items-end gap-3 z-10">
        <div className="w-px h-24 bg-gradient-to-t from-accent/40 to-transparent" />
        <span className="font-mono text-[10px] tracking-[0.3em] text-accent/70 [writing-mode:vertical-rl]">
          VOL · 01 · LOOKMAX
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-bone/60 font-medium border border-white/10 rounded-full px-5 py-2 backdrop-blur-md bg-white/[0.02]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Facial Optimization · Engineered in Switzerland
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="display-heading text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-8xl xl:text-9xl font-bold leading-[0.9] mb-10 min-h-[1em] text-bone"
        >
          <span>{displayText}</span>
          <span className="font-thin text-accent animate-blink">|</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-base sm:text-lg text-bone/55 max-w-xl mx-auto mb-14 leading-relaxed font-light"
        >
          Hochwertige Männer-Skincare aus der Schweiz.
          <span className="block text-bone/40 mt-2">
            Jedes Produkt ein Werkzeug. Jeder Schritt ein Upgrade.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/products"
            className="group inline-flex items-center gap-3 bg-bone text-bg font-bold px-10 py-4 rounded-full text-[13px] tracking-[0.2em] hover:bg-accent transition-all duration-500 btn-primary"
          >
            UPGRADE YOUR LOOK
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <a
            href="#mission"
            onClick={(e) => { e.preventDefault(); document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="text-[13px] text-bone/55 hover:text-accent tracking-[0.2em] transition-all duration-300 border border-white/10 hover:border-accent/40 px-10 py-4 rounded-full"
          >
            DAS KONZEPT
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-bone/30">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-accent/40 to-transparent" />
      </motion.div>
    </section>
  );
}
