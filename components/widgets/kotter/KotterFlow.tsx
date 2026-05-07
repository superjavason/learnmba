import { Flame, Users, Compass, MessageSquare, Unlock, Trophy, Layers, Heart } from "lucide-react"

const STEPS = [
  { n: 1, label: "建立紧迫感", en: "Create Urgency", icon: Flame, color: "#DC2626", phase: "建立氛围" },
  { n: 2, label: "建立联盟", en: "Build Coalition", icon: Users, color: "#F97316", phase: "建立氛围" },
  { n: 3, label: "制定愿景", en: "Form Vision", icon: Compass, color: "#C9A961", phase: "建立氛围" },
  { n: 4, label: "沟通愿景", en: "Communicate Vision", icon: MessageSquare, color: "#10B981", phase: "全员参与" },
  { n: 5, label: "赋权行动", en: "Empower Action", icon: Unlock, color: "#0EA5E9", phase: "全员参与" },
  { n: 6, label: "短期成就", en: "Short-term Wins", icon: Trophy, color: "#8B5CF6", phase: "全员参与" },
  { n: 7, label: "巩固成果", en: "Consolidate Gains", icon: Layers, color: "#475569", phase: "固化变革" },
  { n: 8, label: "融入文化", en: "Anchor in Culture", icon: Heart, color: "#0F172A", phase: "固化变革" },
]

export function KotterFlow() {
  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-4">
      <div className="overflow-x-auto">
        <div className="flex items-stretch gap-1 min-w-[860px]">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={s.n} className="flex-1 relative">
                {i > 0 && (
                  <div className="absolute -left-1 top-12 bottom-0 w-px bg-border" />
                )}
                <div
                  className={`rounded-lg border-2 p-3 h-full flex flex-col`}
                  style={{ borderColor: s.color, background: `${s.color}10` }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-white font-serif font-bold text-sm shrink-0"
                      style={{ background: s.color }}
                    >
                      {s.n}
                    </div>
                    <Icon className="h-4 w-4 ml-auto" style={{ color: s.color }} />
                  </div>
                  <div className="font-serif font-bold text-xs leading-tight">{s.label}</div>
                  <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5">
                    {s.en}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {/* Phase grouping bar */}
        <div className="flex items-stretch gap-1 mt-2 min-w-[860px]">
          <div className="flex-[3] border-t-2 border-rose-300/70 pt-1 text-center">
            <span className="text-[10px] uppercase tracking-[0.18em] text-rose-600 font-bold">
              建立变革氛围
            </span>
          </div>
          <div className="flex-[3] border-t-2 border-emerald-300/70 pt-1 text-center">
            <span className="text-[10px] uppercase tracking-[0.18em] text-emerald-600 font-bold">
              全员参与变革
            </span>
          </div>
          <div className="flex-[2] border-t-2 border-slate-400/70 pt-1 text-center">
            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-600 font-bold">
              固化变革成果
            </span>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
        <div>
          <span className="font-bold text-foreground">关键洞察 1：</span>
          前 3 步建立氛围比直接行动更重要——跳过它们的变革成功率不到 10%。
        </div>
        <div>
          <span className="font-bold text-foreground">关键洞察 2：</span>
          短期成就（第 6 步）+ 文化融合（第 8 步）是最容易被忽视、代价最高的两步。
        </div>
      </div>
    </div>
  )
}
