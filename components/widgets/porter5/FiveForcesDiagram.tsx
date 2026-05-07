"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  fiveForcesScore,
  fiveForcesAttractiveness,
  type FiveForces,
} from "@/lib/score"
import { cn } from "@/lib/utils"

interface ForceConfig {
  key: keyof FiveForces
  label: string
  short: string
  position: { x: number; y: number }
}

// Diamond layout: 4 outer nodes around a center "rivalry" node
const FORCES: ForceConfig[] = [
  { key: "entrants", label: "新进入者威胁", short: "新进入者", position: { x: 300, y: 70 } },
  { key: "supplier", label: "供应商议价能力", short: "供应商", position: { x: 90, y: 230 } },
  { key: "buyer", label: "买方议价能力", short: "买方", position: { x: 510, y: 230 } },
  { key: "substitutes", label: "替代品威胁", short: "替代品", position: { x: 300, y: 390 } },
]

const PRESETS: Record<string, FiveForces> = {
  航空业: { supplier: 5, buyer: 5, entrants: 3, substitutes: 4, rivalry: 5 },
  "云 SaaS": { supplier: 2, buyer: 3, entrants: 4, substitutes: 2, rivalry: 4 },
  奶茶店: { supplier: 2, buyer: 4, entrants: 5, substitutes: 4, rivalry: 5 },
  晶圆代工: { supplier: 4, buyer: 2, entrants: 1, substitutes: 1, rivalry: 2 },
}

const STRENGTH_LABEL = ["", "极弱", "弱", "中等", "强", "极强"]
const STRENGTH_FILL = [
  "",
  "#10b981", // emerald
  "#22c55e", // green
  "#eab308", // yellow
  "#f97316", // orange
  "#dc2626", // red
]

export function FiveForcesDiagram() {
  const [forces, setForces] = useState<FiveForces>({
    supplier: 3,
    buyer: 3,
    entrants: 3,
    substitutes: 3,
    rivalry: 3,
  })
  const score = fiveForcesScore(forces)
  const attr = fiveForcesAttractiveness(score)
  const attrLabel = { high: "高", medium: "中", low: "低" }[attr]
  const attrColor = {
    high: "text-emerald-600 dark:text-emerald-400",
    medium: "text-amber-600 dark:text-amber-400",
    low: "text-rose-600 dark:text-rose-400",
  }[attr]

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        给五个力打分（1=极弱，5=极强）。五力得分越低 → 行业利润空间越大 → 吸引力越高。
      </p>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <svg
            viewBox="0 0 600 460"
            className="w-full h-auto"
            role="img"
            aria-label="波特五力辐射图"
          >
            {/* Background subtle rings */}
            <circle cx="300" cy="230" r="180" fill="none" stroke="var(--border)" strokeDasharray="2 6" opacity="0.5" />

            {/* Arrows from outer nodes to center */}
            {FORCES.map((f) => {
              const v = forces[f.key]
              const color = STRENGTH_FILL[v]
              const r = 60
              const cx = 300, cy = 230
              const dx = cx - f.position.x
              const dy = cy - f.position.y
              const len = Math.sqrt(dx * dx + dy * dy)
              const ux = dx / len, uy = dy / len
              const startX = f.position.x + ux * r
              const startY = f.position.y + uy * r
              const endX = cx - ux * 64
              const endY = cy - uy * 64
              const strokeWidth = 1.5 + v * 1.4

              return (
                <g key={`arrow-${f.key}`}>
                  <defs>
                    <marker
                      id={`arrow-${f.key}`}
                      viewBox="0 0 10 10"
                      refX="9"
                      refY="5"
                      markerWidth="7"
                      markerHeight="7"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
                    </marker>
                  </defs>
                  <line
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    markerEnd={`url(#arrow-${f.key})`}
                    opacity="0.85"
                  />
                </g>
              )
            })}

            {/* Center circle: industry rivalry */}
            <circle
              cx="300"
              cy="230"
              r={64 + forces.rivalry * 3}
              fill="none"
              stroke={STRENGTH_FILL[forces.rivalry]}
              strokeWidth="1.5"
              strokeDasharray="4 5"
              opacity="0.55"
            />
            <circle cx="300" cy="230" r="60" fill="var(--primary)" />
            <text
              x="300"
              y="222"
              textAnchor="middle"
              fill="var(--primary-foreground)"
              fontSize="13"
              fontWeight="700"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              行业内
            </text>
            <text
              x="300"
              y="238"
              textAnchor="middle"
              fill="var(--primary-foreground)"
              fontSize="13"
              fontWeight="700"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              竞争
            </text>
            <text
              x="300"
              y="256"
              textAnchor="middle"
              fill="var(--primary-foreground)"
              fontSize="9"
              opacity="0.75"
            >
              {forces.rivalry}/5 · {STRENGTH_LABEL[forces.rivalry]}
            </text>

            {/* Outer nodes */}
            {FORCES.map((f) => {
              const v = forces[f.key]
              const color = STRENGTH_FILL[v]
              return (
                <g key={f.key}>
                  <circle
                    cx={f.position.x}
                    cy={f.position.y}
                    r="58"
                    fill="var(--card)"
                    stroke={color}
                    strokeWidth="2.5"
                  />
                  <text
                    x={f.position.x}
                    y={f.position.y - 5}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="700"
                    fill="var(--foreground)"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {f.short}
                  </text>
                  <text
                    x={f.position.x}
                    y={f.position.y + 11}
                    textAnchor="middle"
                    fontSize="10"
                    fill="var(--muted-foreground)"
                  >
                    {STRENGTH_LABEL[v]}
                  </text>
                  <text
                    x={f.position.x}
                    y={f.position.y + 27}
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="700"
                    fill={color}
                  >
                    {v}/5
                  </text>
                </g>
              )
            })}
          </svg>

          <div className="grid grid-cols-3 gap-4 border-t border-border pt-4 mt-1">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                五力得分
              </div>
              <div className="font-serif text-2xl font-bold tabular-nums">
                {score.toFixed(1)}
              </div>
              <div className="text-[11px] text-muted-foreground">/5</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                行业吸引力
              </div>
              <div className={cn("font-serif text-2xl font-bold", attrColor)}>
                {attrLabel}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                建议
              </div>
              <div className="text-sm leading-snug pt-1">
                {attr === "high" && "可重点投入"}
                {attr === "medium" && "需差异化策略"}
                {attr === "low" && "谨慎进入或寻找蓝海"}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
              预设行业
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(PRESETS).map(([name, p]) => (
                <Button
                  key={name}
                  variant="outline"
                  size="sm"
                  onClick={() => setForces(p)}
                >
                  {name}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {[
              ...FORCES.map((f) => ({ key: f.key, label: f.label })),
              { key: "rivalry" as const, label: "行业内竞争" },
            ].map((entry) => {
              const k = entry.key as keyof FiveForces
              return (
                <div key={k}>
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-sm font-medium">{entry.label}</span>
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {forces[k]} / 5 · {STRENGTH_LABEL[forces[k]]}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={forces[k]}
                    onChange={(e) =>
                      setForces((v) => ({
                        ...v,
                        [k]: Number(e.target.value),
                      }))
                    }
                    className="w-full accent-[var(--accent)] cursor-pointer"
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
