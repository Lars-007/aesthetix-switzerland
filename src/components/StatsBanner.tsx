'use client';

import { useEffect, useState, useRef } from 'react';

interface CounterProps {
  end: number;
  suffix: string;
  prefix?: string;
  duration?: number;
}

function AnimatedCounter({ end, suffix, prefix = '', duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const start = 0;
    const increment = end / (duration / 16);
    let current = start;
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
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl md:text-4xl font-bold mb-1">
        {prefix}{count.toLocaleString('de-CH')}{suffix}
      </div>
    </div>
  );
}

const stats = [
  { end: 2400, suffix: '+', label: 'Zufriedene Kunden' },
  { end: 4.9, suffix: '★', label: 'Bewertung', isDecimal: true },
  { end: 48, suffix: 'h', label: 'Lieferung Schweiz' },
  { end: 100, suffix: '%', label: 'Naturbasiert' },
];

export default function StatsBanner() {
  return (
    <section className="bg-black border-y border-white/5 py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              {stat.isDecimal ? (
                <DecimalCounter end={stat.end} suffix={stat.suffix} />
              ) : (
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              )}
              <p className="text-xs text-white/30 tracking-wider uppercase mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
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
    const duration = 2000;
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
      <div className="font-display text-3xl md:text-4xl font-bold mb-1">
        {count.toFixed(1)}{suffix}
      </div>
    </div>
  );
}
