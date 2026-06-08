interface SectionLabelProps {
  children: React.ReactNode;
  align?: 'center' | 'left';
}

export default function SectionLabel({ children, align = 'center' }: SectionLabelProps) {
  return (
    <div
      className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}
    >
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-white/30" />
      <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-medium whitespace-nowrap">
        {children}
      </span>
      {align === 'center' && (
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-white/30" />
      )}
    </div>
  );
}
