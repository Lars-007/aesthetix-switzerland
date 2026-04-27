'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Briefcase, Heart, UserCheck, TrendingUp, Crown, Zap, Target } from 'lucide-react';

const blocks = [
  {
    icon: Sparkles,
    accentIcon: Crown,
    index: '01',
    title: 'Der Halo-Effekt',
    stat: '+73%',
    statLabel: 'mehr Vertrauen',
    description: 'Attraktive Menschen werden automatisch als kompetenter und vertrauenswürdiger wahrgenommen.',
    bullets: [
      'Sofortiger Vertrauensvorschuss',
      'Höhere wahrgenommene Kompetenz',
      'Positiver erster Eindruck',
    ],
  },
  {
    icon: Briefcase,
    accentIcon: TrendingUp,
    index: '02',
    title: 'Erfolgreicher im Arbeitsleben',
    stat: '+15%',
    statLabel: 'mehr Gehalt',
    description: 'Studien zeigen: Attraktivere Menschen verdienen messbar mehr und werden schneller befördert.',
    bullets: [
      'Schnellere Beförderungen',
      'Mehr Überzeugungskraft',
      'Stärkere Autorität',
    ],
  },
  {
    icon: Heart,
    accentIcon: Target,
    index: '03',
    title: 'Dating-Vorteil',
    stat: '3x',
    statLabel: 'mehr Matches',
    description: 'Gepflegtes Äusseres signalisiert Disziplin und Status — der entscheidende erste Eindruck.',
    bullets: [
      'Höhere Anziehungskraft',
      'Mehr Selbstbewusstsein',
      'Stärkere Ausstrahlung',
    ],
  },
  {
    icon: UserCheck,
    accentIcon: Zap,
    index: '04',
    title: 'Mehr Selbstvertrauen',
    stat: '100%',
    statLabel: 'Confidence-Boost',
    description: 'Look good, feel good — ein positiver Feedback-Loop, der dein gesamtes Auftreten verändert.',
    bullets: [
      'Bessere Körperhaltung',
      'Stärkerer Blickkontakt',
      'Positiver Teufelskreis',
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const barVariants = {
  hidden: { width: '0%' },
  visible: (i: number) => ({
    width: '100%',
    transition: {
      duration: 1.4,
      delay: 0.4 + i * 0.15,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function HaloEffectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="py-28 md:py-40 bg-bg-raised border-y border-white/5 relative overflow-hidden"
    >
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-accent-glow blur-[150px] rounded-full pointer-events-none"
        animate={isInView ? { scale: [0.8, 1.2, 1], opacity: [0, 0.5, 0.3] } : {}}
        transition={{ duration: 3, ease: 'easeOut' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          className="max-w-3xl mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="section-index">— 02 / Konzept</span>
            <div className="hairline w-24" />
          </div>
          <h2 className="display-heading text-4xl md:text-6xl lg:text-7xl text-bone mb-6">
            Was bringen dir<br />
            <span className="italic font-medium text-accent">AESTHETIX Produkte?</span>
          </h2>
          <p className="text-bone/55 text-base md:text-lg leading-relaxed max-w-xl font-light">
            Besseres Aussehen = messbar mehr Erfolg. Im Job, beim Dating und im Alltag.
            <span className="block text-bone/35 mt-2">Wissenschaftlich belegt.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {blocks.map((block, i) => (
            <motion.div
              key={block.title}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : undefined}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-bg-card backdrop-blur-sm rounded-2xl border border-white/8 p-8 md:p-10 hover:border-accent/30 transition-all duration-700 ease-editorial overflow-hidden"
            >
              {/* Index marker */}
              <span className="absolute top-6 right-7 font-mono text-[11px] text-accent/40 tracking-widest">
                {block.index}
              </span>

              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-accent-glow border border-accent/20 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:border-accent/40 transition-all duration-700">
                  <block.icon className="w-5 h-5 text-accent" />
                </div>

                <div className="text-right">
                  <span className="block stat-number text-3xl md:text-4xl text-bone leading-none">
                    {block.stat}
                  </span>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-bone/35 mt-1 inline-block">
                    {block.statLabel}
                  </span>
                </div>
              </div>

              <h3 className="display-heading text-2xl md:text-3xl mb-3 text-bone">{block.title}</h3>
              <p className="text-sm text-bone/55 leading-relaxed mb-6 font-light">{block.description}</p>

              <div className="space-y-4 pt-4 border-t border-white/5">
                {block.bullets.map((bullet, j) => (
                  <div key={bullet} className="flex items-center gap-3">
                    <div className="relative w-full">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[13px] font-medium text-bone/80">{bullet}</span>
                        <block.accentIcon className="w-3 h-3 text-accent/50" />
                      </div>
                      <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-accent to-accent/30 rounded-full"
                          variants={barVariants}
                          custom={j}
                          initial="hidden"
                          animate={isInView ? 'visible' : undefined}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
