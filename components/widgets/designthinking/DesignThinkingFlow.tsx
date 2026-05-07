import { Heart, Search, Lightbulb, Hammer, FlaskConical } from "lucide-react"

const STEPS = [
  {
    n: 1,
    label: "共情",
    en: "Empathize",
    icon: Heart,
    color: "#DC2626",
    desc: "深入理解用户：观察、访谈、体验",
  },
  {
    n: 2,
    label: "定义",
    en: "Define",
    icon: Search,
    color: "#F97316",
    desc: "综合研究，写出 POV 问题陈述",
  },
  {
    n: 3,
    label: "构思",
    en: "Ideate",
    icon: Lightbulb,
    color: "#C9A961",
    desc: "脑暴尽量多想法，先求量再求质",
  },
  {
    n: 4,
    label: "原型",
    en: "Prototype",
    icon: Hammer,
    color: "#0EA5E9",
    desc: "最低成本快速做能体验的版本",
  },
  {
    n: 5,
    label: "测试",
    en: "Test",
    icon: FlaskConical,
    color: "#8B5CF6",
    desc: "真实用户测试，识别要回到哪步迭代",
  },
]

export function DesignThinkingFlow() {
  return (
    <div className="rounded-lg border border-border bg-card p-5 space-y-4">
      <div className="overflow-x-auto">
        <div className="flex items-stretch gap-2 min-w-[640px] relative">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={s.n} className="flex-1 relative">
                <div
                  className="rounded-lg border-2 p-3 h-full flex flex-col items-start"
                  style={{ borderColor: s.color, background: `${s.color}10` }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full text-white font-serif font-bold shrink-0"
                      style={{ background: s.color }}
                    >
                      {s.n}
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
                {/* connector arrow */}
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
        <span className="font-bold text-foreground">迭代提示：</span>{" "}
        <span className="text-muted-foreground">
          5 步过程是非线性的——测试常常导致回到“共情”或“构思”重新评估。失败要早、便宜、频繁。
        </span>
      </div>
    </div>
  )
}
