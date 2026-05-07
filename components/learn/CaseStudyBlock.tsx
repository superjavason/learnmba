import type { CaseStudy } from "@/content/types"
import { Building2 } from "lucide-react"

export function CaseStudyBlock({ data }: { data: CaseStudy }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
        <Building2 className="h-3.5 w-3.5" />
        经典案例
        {data.company && <span className="not-italic">· {data.company}</span>}
      </div>
      <h3 className="font-serif text-xl font-bold mb-3">{data.title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground mb-4">
        {data.scenario}
      </p>
      <dl className="grid gap-3 sm:grid-cols-2 mb-4">
        {data.analysis.map((a) => (
          <div
            key={a.label}
            className="rounded border border-border/60 p-3 bg-background/40"
          >
            <dt className="text-[11px] uppercase tracking-wider text-accent font-bold mb-1">
              {a.label}
            </dt>
            <dd className="text-sm leading-relaxed">{a.content}</dd>
          </div>
        ))}
      </dl>
      <div className="border-t border-border pt-4 text-sm leading-relaxed">
        <span className="font-bold mr-2">关键启示：</span>
        {data.takeaway}
      </div>
    </div>
  )
}
