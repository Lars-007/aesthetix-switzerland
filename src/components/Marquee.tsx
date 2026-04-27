'use client';

const items = [
  'Swiss Engineered',
  'Pure Niacinamid',
  'Volcanic Minerals',
  'Dermatologisch Getestet',
  'Naturbasiert',
  'Halo Effect',
  'Made in Switzerland',
  'Premium Skincare for Men',
];

export default function Marquee() {
  // Duplicate the list so the seamless loop translates by -50%
  const track = [...items, ...items];

  return (
    <section
      aria-hidden
      className="border-y border-white/5 bg-bg-raised py-5 overflow-hidden"
    >
      <div className="flex marquee-track whitespace-nowrap">
        {track.map((item, i) => (
          <div key={`${item}-${i}`} className="flex items-center mx-8 shrink-0">
            <span className="font-display text-lg md:text-xl font-bold tracking-wide uppercase text-bone/70">
              {item}
            </span>
            <span className="ml-16 text-accent text-xs font-mono tracking-[0.4em]">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}
