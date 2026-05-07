import { TrendingUp, TrendingDown, Sparkles, AlertTriangle } from "lucide-react"

const quadrants = [
  {
    key: "S",
    title: "优势 Strengths",
    subtitle: "内部 · 正面",
    icon: TrendingUp,
    bg: "bg-emerald-50/70 dark:bg-emerald-950/25",
    border: "border-emerald-300/70 dark:border-emerald-800",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    items: ["品牌资产", "核心技术", "成本优势", "渠道网络"],
  },
  {
    key: "W",
    title: "劣势 Weaknesses",
    subtitle: "内部 · 负面",
    icon: TrendingDown,
    bg: "bg-amber-50/70 dark:bg-amber-950/25",
    border: "border-amber-300/70 dark:border-amber-800",
    iconColor: "text-amber-600 dark:text-amber-400",
    items: ["人才缺口", "现金流紧", "技术债务", "品牌力弱"],
  },
  {
    key: "O",
    title: "机会 Opportunities",
    subtitle: "外部 · 正面",
    icon: Sparkles,
    bg: "bg-sky-50/70 dark:bg-sky-950/25",
    border: "border-sky-300/70 dark:border-sky-800",
    iconColor: "text-sky-600 dark:text-sky-400",
    items: ["新兴市场", "政策红利", "技术突破", "消费升级"],
  },
  {
    key: "T",
    title: "威胁 Threats",
    subtitle: "外部 · 负面",
    icon: AlertTriangle,
    bg: "bg-rose-50/70 dark:bg-rose-950/25",
    border: "border-rose-300/70 dark:border-rose-800",
    iconColor: "text-rose-600 dark:text-rose-400",
    items: ["新进入者", "替代品", "监管收紧", "客户流失"],
  },
] as const

export function SwotMatrix() {
  return (
    <div className="rounded-lg border border-border bg-card p-3 sm:p-5">
      <div className="grid grid-cols-[28px_1fr_1fr] grid-rows-[28px_1fr_1fr] gap-2">
        <div />
        <div className="text-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground py-1">
          正面 / Helpful
        </div>
        <div className="text-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground py-1">
          负面 / Harmful
        </div>

        <div
          className="flex items-center justify-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          内部 / Internal
        </div>
        <Quadrant q={quadrants[0]} />
        <Quadrant q={quadrants[1]} />

        <div
          className="flex items-center justify-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          外部 / External
        </div>
        <Quadrant q={quadrants[2]} />
        <Quadrant q={quadrants[3]} />
      </div>
    </div>
  )
}

function Quadrant({ q }: { q: (typeof quadrants)[number] }) {
  const Icon = q.icon
  return (
    <div className={`rounded-md border ${q.border} ${q.bg} p-4 min-h-[160px]`}>
      <div className="flex items-center gap-2 mb-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full bg-background border ${q.iconColor} font-serif font-bold`}
        >
          {q.key}
        </div>
        <div className="flex-1">
          <div className="font-serif font-bold text-sm">{q.title}</div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {q.subtitle}
          </div>
        </div>
        <Icon className={`h-4 w-4 ${q.iconColor}`} />
      </div>
      <ul className="space-y-1.5 text-xs leading-relaxed">
        {q.items.map((it) => (
          <li key={it} className="flex gap-2">
            <span className={q.iconColor}>·</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
