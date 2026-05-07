import { Layers, Target, Compass } from "lucide-react"

const STEPS = [
  {
    n: "S",
    icon: Layers,
    label: "市场细分",
    en: "Segmentation",
    desc: "按地理 / 人口 / 心理 / 行为变量把市场切成同质子群。",
    color: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-50 dark:bg-sky-950/30",
    border: "border-sky-300/70",
  },
  {
    n: "T",
    icon: Target,
    label: "目标选择",
    en: "Targeting",
    desc: "评估吸引力 × 自身能力，选 1-N 个细分作为目标。",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-300/70",
  },
  {
    n: "P",
    icon: Compass,
    label: "市场定位",
    en: "Positioning",
    desc: "在目标客户心智中占据独特、差异、可信的位置。",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-300/70",
  },
]

export function StpFlow() {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="grid md:grid-cols-3 gap-3 relative">
        {STEPS.map((s, i) => {
          const Icon = s.icon
          return (
            <div
              key={s.n}
              className={`rounded-lg border ${s.border} ${s.bg} p-4 relative`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-background border-2 ${s.border} font-serif font-bold text-lg ${s.color}`}
                >
                  {s.n}
                </div>
                <div>
                  <div className="font-serif font-bold text-sm">{s.label}</div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {s.en}
                  </div>
                </div>
                <Icon className={`h-5 w-5 ml-auto ${s.color}`} />
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <div className="h-6 w-6 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground">
                    →
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
