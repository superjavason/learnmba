export function SectionHeading({
  number,
  title,
  subtitle,
}: {
  number: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="flex items-baseline gap-3 border-b border-border pb-3">
      <span className="font-serif text-3xl font-bold text-accent tabular-nums leading-none">
        {number}
      </span>
      <h2 className="font-serif text-2xl font-bold leading-none">{title}</h2>
      {subtitle && (
        <span className="text-sm text-muted-foreground italic ml-1">
          {subtitle}
        </span>
      )}
    </div>
  )
}
