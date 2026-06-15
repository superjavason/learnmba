import { MapPin, Zap, HelpCircle, CheckCircle2 } from "lucide-react"

const STEPS = [
  {
    k: "S",
    label: "情境",
    en: "Situation",
    icon: MapPin,
    color: "#0EA5E9",
    desc: "对方认同的背景，建立共识",
  },
  {
    k: "C",
    label: "冲突",
    en: "Complication",
    icon: Zap,
    color: "#DC2626",
    desc: "打破平衡的变化，制造张力（钩子）",
  },
  {
    k: "Q",
    label: "疑问",
    en: "Question",
    icon: HelpCircle,
    color: "#C9A961",
    desc: "冲突在对方脑中触发的问题（常隐含）",
  },
  {
    k: "A",
    label: "解答",
    en: "Answer",
    icon: CheckCircle2,
    color: "#059669",
    desc: "你的核心结论，正好回答疑问",
  },
]

const VARIANTS = [
  { name: "标准式", order: "S → C → Q → A", use: "通用、对方有耐心听背景" },
  { name: "开门见山式", order: "A → S → C", use: "高层 / 时间紧 / 已知背景" },
  { name: "突出忧虑式", order: "C → S → A", use: "强调危机、需要紧迫感" },
  { name: "突出信心式", order: "Q → S → C → A", use: "先点题，再给信心十足的答案" },
]

export function ScqaFlow() {
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

      <div className="rounded-lg border border-border bg-secondary/30 p-3 text-xs">
        <span className="font-bold text-foreground">和金字塔的关系：</span>{" "}
        <span className="text-muted-foreground">
          SCQA 是金字塔原理的「序言」——把读者一路引到塔尖（A 就是中心结论），之后金字塔主体再展开论证。
        </span>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
          四种变体（按场景调换顺序）
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {VARIANTS.map((v) => (
            <div
              key={v.name}
              className="rounded-md border border-border bg-background p-2.5"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-serif font-bold text-sm">{v.name}</span>
                <span className="text-[11px] font-mono text-accent">{v.order}</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5">{v.use}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
