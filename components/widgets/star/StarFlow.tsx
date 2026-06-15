import { Layers, Flag, Cog, Trophy } from "lucide-react"

const STEPS = [
  {
    k: "S",
    label: "情境",
    en: "Situation",
    icon: Layers,
    color: "#0EA5E9",
    desc: "背景与挑战，1-2 句交代",
    weight: "简短",
  },
  {
    k: "T",
    label: "任务",
    en: "Task",
    icon: Flag,
    color: "#C9A961",
    desc: "你负责达成的目标/难题",
    weight: "简短",
  },
  {
    k: "A",
    label: "行动",
    en: "Action",
    icon: Cog,
    color: "#DC2626",
    desc: "你（不是「我们」）做的关键步骤",
    weight: "最详细",
  },
  {
    k: "R",
    label: "结果",
    en: "Result",
    icon: Trophy,
    color: "#059669",
    desc: "可量化的成果 + 影响 + 收获",
    weight: "用数据",
  },
]

export function StarFlow() {
  return (
    <div className="rounded-lg border border-border bg-card p-5 space-y-4">
      <div className="overflow-x-auto">
        <div className="flex items-stretch gap-2 min-w-[600px]">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={s.k} className="flex-1 relative">
                <div
                  className="rounded-lg border-2 p-3 h-full flex flex-col items-start"
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
                  <p className="text-[11px] text-muted-foreground leading-relaxed mb-2">
                    {s.desc}
                  </p>
                  <span
                    className="mt-auto text-[10px] font-bold rounded px-1.5 py-0.5"
                    style={{ color: s.color, background: `${s.color}1a` }}
                  >
                    {s.weight}
                  </span>
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

      <div className="rounded-lg border border-border bg-secondary/30 p-3 text-xs">
        <span className="font-bold text-foreground">黄金配比：</span>{" "}
        <span className="text-muted-foreground">
          情境 + 任务要简短（别让背景占满时间），行动是主体（多用「我」凸显个人贡献），结果一定要量化——这才是面试官最想听的。
        </span>
      </div>
    </div>
  )
}
