import { Target, MessageSquare, FileText, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

const STEPS = [
  {
    k: "P",
    label: "观点",
    en: "Point",
    icon: Target,
    color: "#059669",
    desc: "开门见山，一句话给结论",
    emphasis: true,
  },
  {
    k: "R",
    label: "理由",
    en: "Reason",
    icon: MessageSquare,
    color: "#0EA5E9",
    desc: "为什么？给 1-3 条支撑逻辑",
  },
  {
    k: "E",
    label: "案例",
    en: "Example",
    icon: FileText,
    color: "#C9A961",
    desc: "用数据/故事让理由可信",
  },
  {
    k: "P",
    label: "重申",
    en: "Point",
    icon: RefreshCw,
    color: "#059669",
    desc: "回到观点收尾，带行动呼吁",
    emphasis: true,
  },
]

export function PrepLoop() {
  return (
    <div className="rounded-lg border border-border bg-card p-5 space-y-4">
      <div className="overflow-x-auto">
        <div className="flex items-stretch gap-2 min-w-[560px]">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={i} className="flex-1 relative">
                <div
                  className={cn(
                    "rounded-lg border-2 p-3 h-full flex flex-col items-start",
                    s.emphasis && "ring-2 ring-emerald-400/40"
                  )}
                  style={{ borderColor: s.color, background: `${s.color}10` }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full text-white font-serif font-bold shrink-0"
                      style={{ background: s.color }}
                    >
                      {s.k}
                    </div>
                    <Icon className="h-4 w-4" style={{ color: s.color }} />
                  </div>
                  <div className="font-serif font-bold text-sm">{s.label}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
                    {s.en}
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="h-6 w-6 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground text-xs">
                      →
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="rounded-lg border border-emerald-300/60 bg-emerald-50/50 dark:bg-emerald-950/20 p-3 text-xs">
        <span className="font-bold text-foreground">首尾呼应：</span>{" "}
        <span className="text-muted-foreground">
          观点在开头和结尾各出现一次（高亮的两端）。利用首因与近因效应，让听众牢牢记住你要说的「这一件事」。
        </span>
      </div>
    </div>
  )
}
