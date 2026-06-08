'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Briefcase, Heart, UserCheck, TrendingUp, Crown, Zap, Target } from 'lucide-react';
import SectionHeader from './SectionHeader';

const blocks = [
  {
    icon: Sparkles,
    accentIcon: Crown,
    title: 'Der Halo-Effekt',
    stat: '+73%',
    statLabel: 'mehr Vertrauen',
    description: 'Attraktive Menschen werden automatisch als kompetenter und vertrauenswürdiger wahrgenommen.',
    bullets: [
      'Sofortiger Vertrauensvorschuss',
      'Höhere wahrgenommene Kompetenz',
      'Positiver erster Eindruck',
    ],
    direction: 'left' as const,
  },
  {
    icon: Briefcase,
    accentIcon: TrendingUp,
    title: 'Erfolgreicher im Arbeitsleben',
    stat: '+15%',
    statLabel: 'mehr Gehalt',
    description: 'Studien zeigen: Attraktivere Menschen verdienen messbar mehr und werden schneller befördert.',
    bullets: [
      'Schnellere Beförderungen',
      'Mehr Überzeugungskraft',
      'Stärkere Autorität',
    ],
    direction: 'right' as const,
  },
  {
    icon: Heart,
    accentIcon: Target,
    title: 'Dating-Vorteil',
    stat: '3x',
    statLabel: 'mehr Matches',
    description: 'Gepflegtes Äusseres signalisiert Disziplin und Status — der entscheidende erste Eindruck.',
    bullets: [
      'Höhere Anziehungskraft',
      'Mehr Selbstbewusstsein',
      'Stärkere Ausstrahlung',
    ],
    direction: 'left' as const,
  },
  {
    icon: UserCheck,
    accentIcon: Zap,
    title: 'Mehr Selbstvertrauen',
    stat: '100%',
    statLabel: 'mehr Selbstvertrauen',
    description: 'Gut aussehen, gut fühlen — ein positiver Kreislauf, der dein gesamtes Auftreten verändert.',
    bullets: [
      'Bessere Körperhaltung',
      'Stärkerer Blickkontakt',
      'Positiver Teufelskreis',
    ],
    direction: 'right' as const,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0, 0, 0.58, 1] as [number, number, number, number],
    },
  },
};

const statVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.2,
    },
  },
};

const barVariants = {
  hidden: { width: '0%' },
  visible: (i: number) => ({
    width: '100%',
    transition: {
      duration: 1.2,
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
      className="py-24 md:py-32 bg-bg-raised border-y border-white/5 relative overflow-hidden"
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] blur-[150px] rounded-full pointer-events-none"
        animate={isInView ? { scale: [0.8, 1.2, 1], opacity: [0, 0.5, 0.3] } : {}}
        transition={{ duration: 3, ease: 'easeOut' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-14 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeader
            index="N°02"
            label="Wissenschaftlich belegt"
            title="Was bringen dir AESTHETIX Produkte?"
            description="Besseres Aussehen = messbar mehr Erfolg. Im Job, beim Dating und im Alltag."
          />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {blocks.map((block, i) => (
            <motion.div
              key={block.title}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : undefined}
              transition={{ delay: i * 0.08 }}
              className="group relative bg-white/[0.03] rounded-2xl border border-white/10 p-7 md:p-9 hover:border-white/25 hover:bg-white/[0.05] hover:-translate-y-1 transition-all duration-500 overflow-hidden"
            >
              {/* Card index */}
              <span className="absolute top-6 right-7 font-display text-sm font-bold text-white/20 group-hover:text-white/40 transition-colors duration-500">
                0{i + 1}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-105 group-hover:bg-white/15 transition-all duration-500">
                <block.icon className="w-5 h-5 text-white" />
              </div>

              {/* Big stat */}
              <motion.div
                variants={statVariants}
                initial="hidden"
                animate={isInView ? 'visible' : undefined}
                transition={{ delay: i * 0.15 }}
              >
                <span className="block font-display text-5xl md:text-6xl font-bold text-white leading-[0.85] tracking-tight">
                  {block.stat}
                </span>
                <span className="block text-[10px] tracking-[0.25em] uppercase text-white/40 mt-2.5">
                  {block.statLabel}
                </span>
              </motion.div>

              {/* Hairline */}
              <div className="h-px bg-white/10 my-7" />

              {/* Title + description */}
              <h3 className="font-display text-xl font-bold mb-2.5 text-white">{block.title}</h3>
              <p className="text-sm text-white/65 leading-relaxed mb-6">{block.description}</p>

              {/* Animated bullet bars */}
              <div className="space-y-3.5">
                {block.bullets.map((bullet, j) => (
                  <div key={bullet} className="flex items-center gap-3">
                    <div className="relative w-full">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium text-white/80">{bullet}</span>
                        <block.accentIcon className="w-3 h-3 text-white/30" />
                      </div>
                      <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-white/50 to-white/10 rounded-full"
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
