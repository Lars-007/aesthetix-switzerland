interface SectionHeaderProps {
  index: string;
  label: string;
  title: React.ReactNode;
  description?: string;
}

export default function SectionHeader({ index, label, title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 border-t border-white/10 pt-5 mb-6">
        <span className="font-display text-sm font-bold text-white/40">{index}</span>
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-medium">
          {label}
        </span>
      </div>
      <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.0] text-white">
        {title}
      </h2>
      {description && (
        <p className="text-white/65 mt-5 max-w-xl leading-relaxed">{description}</p>
      )}
    </div>
  );
}
