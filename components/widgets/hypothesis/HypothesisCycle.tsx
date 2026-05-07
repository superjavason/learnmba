import { Lightbulb, Compass, Database, CheckCircle2 } from "lucide-react"

const STEPS = [
  { n: 1, key: "hyp", label: "形成假设", en: "Hypothesis", desc: "基于经验提出最可能的解释。", icon: Lightbulb, color: "#0EA5E9" },
  { n: 2, key: "design", label: "设计分析", en: "Design", desc: "确定验证假设需要的数据与方法。", icon: Compass, color: "#C9A961" },
  { n: 3, key: "collect", label: "收集数据", en: "Collect Data", desc: "聚焦验证用最小数据集。", icon: Database, color: "#10B981" },
  { n: 4, key: "verify", label: "验证修正", en: "Verify & Refine", desc: "数据支持则深化，不支持则修正。", icon: CheckCircle2, color: "#8B5CF6" },
]

export function HypothesisCycle() {
  const W = 500
  const H = 380
  const cx = W / 2
  const cy = H / 2
  const r = 140

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* center label */}
        <circle cx={cx} cy={cy} r="58" fill="var(--primary)" />
        <text x={cx} y={cy - 4} textAnchor="middle" fill="var(--primary-foreground)" fontSize="13" fontWeight="700" style={{ fontFamily: "var(--font-serif)" }}>
          假设驱动法
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill="var(--primary-foreground)" fontSize="10" opacity="0.85">
          Hypothesis-Driven
        </text>

        {/* circular cycle arrows */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="6 6" opacity="0.5" />

        {STEPS.map((s, i) => {
          const angle = (i / 4) * 2 * Math.PI - Math.PI / 2
          const x = cx + r * Math.cos(angle)
          const y = cy + r * Math.sin(angle)
          // arrow to next step
          const nextAngle = ((i + 1) / 4) * 2 * Math.PI - Math.PI / 2
          const nx = cx + r * Math.cos(nextAngle)
          const ny = cy + r * Math.sin(nextAngle)
          // arc midpoint approximation for label placement
          return (
            <g key={s.key}>
              {/* curved arrow */}
              <path
                d={`M ${x} ${y} A ${r} ${r} 0 0 1 ${nx} ${ny}`}
                stroke={s.color}
                strokeWidth="2"
                fill="none"
                opacity="0.55"
                markerEnd="url(#hyp-arr)"
              />
              <circle cx={x} cy={y} r="34" fill="var(--card)" stroke={s.color} strokeWidth="2.5" />
              <text x={x} y={y - 6} textAnchor="middle" fill={s.color} fontSize="14" fontWeight="700">
                {s.n}
              </text>
              <text x={x} y={y + 9} textAnchor="middle" fill="var(--foreground)" fontSize="11" fontWeight="700" style={{ fontFamily: "var(--font-serif)" }}>
                {s.label}
              </text>
            </g>
          )
        })}
        <defs>
          <marker id="hyp-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
          </marker>
        </defs>
      </svg>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
        {STEPS.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.key} className="rounded border border-border bg-card p-3">
              <div className="flex items-center gap-2 mb-1">
                <Icon className="h-4 w-4" style={{ color: s.color }} />
                <span className="font-serif font-bold text-sm">
                  {s.n}. {s.label}
                </span>
              </div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                {s.en}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
