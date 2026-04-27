'use client';

import { useEffect, useState, useRef } from 'react';

interface CounterProps {
  end: number;
  suffix: string;
  prefix?: string;
  duration?: number;
}

function AnimatedCounter({ end, suffix, prefix = '', duration = 2200 }: CounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const increment = end / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return (
    <div ref={ref}>
      <div className="stat-number text-5xl md:text-7xl text-bone">
        {prefix}{count.toLocaleString('de-CH')}
        <span className="text-accent">{suffix}</span>
      </div>
    </div>
  );
}

function DecimalCounter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2200;
    const increment = end / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.round(current * 10) / 10);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, end]);

  return (
    <div ref={ref}>
      <div className="stat-number text-5xl md:text-7xl text-bone">
        {count.toFixed(1)}
        <span className="text-accent">{suffix}</span>
      </div>
    </div>
  );
}

const stats = [
  { end: 1200, suffix: '+', label: 'Zufriedene Kunden' },
  { end: 4.8, suffix: '★', label: 'Bewertung', isDecimal: true },
  { end: 48, suffix: 'h', label: 'Lieferung Schweiz' },
  { end: 100, suffix: '%', label: 'Naturbasiert' },
];

export default function StatsBanner() {
  return (
    <section className="relative bg-bg border-y border-white/5 py-20 md:py-24 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #C9A37A 1px, transparent 1px), linear-gradient(to bottom, #C9A37A 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <span className="eyebrow-accent">Numbers Don&apos;t Lie</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-y-0 md:divide-x md:divide-white/5">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`text-center px-4 ${i === 0 ? 'md:pl-0' : ''}`}>
              {stat.isDecimal ? (
                <DecimalCounter end={stat.end} suffix={stat.suffix} />
              ) : (
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              )}
              <p className="text-[10px] text-bone/40 tracking-[0.3em] uppercase mt-4 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
