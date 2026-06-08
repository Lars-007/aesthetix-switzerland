interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export default function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <div className="mb-12 md:mb-14">
      <div className="flex items-center gap-4 border-t border-white/10 pt-5 mb-6">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-medium">
          {label}
        </span>
      </div>
      <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.0] text-white">
        {title}
      </h1>
      {description && (
        <p className="text-white/65 mt-5 max-w-xl leading-relaxed">{description}</p>
      )}
    </div>
  );
}
