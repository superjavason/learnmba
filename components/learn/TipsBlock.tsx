import { Lightbulb, AlertTriangle } from "lucide-react"

export function TipsBlock({
  tips,
  pitfalls,
}: {
  tips: string[]
  pitfalls: string[]
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="h-4 w-4 text-accent" />
          <h4 className="font-serif font-bold">应用建议</h4>
        </div>
        <ul className="space-y-2 text-sm leading-relaxed">
          {tips.map((t, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-accent mt-0.5">·</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <h4 className="font-serif font-bold">常见陷阱</h4>
        </div>
        <ul className="space-y-2 text-sm leading-relaxed">
          {pitfalls.map((p, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-destructive mt-0.5">·</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
