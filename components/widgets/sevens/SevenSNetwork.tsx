"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

type SKey = "strategy" | "structure" | "systems" | "values" | "skills" | "staff" | "style"

interface SNode {
  key: SKey
  label: string
  short: string
  type: "hard" | "soft"
  position: { x: number; y: number }
  description: string
}

const W = 540
const H = 440
const CX = W / 2
const CY = H / 2
const R_OUTER = 160

// 6 outer nodes around center (values), positioned in hexagon
function hexPos(i: number) {
  const angle = (i / 6) * 2 * Math.PI - Math.PI / 2
  return {
    x: CX + R_OUTER * Math.cos(angle),
    y: CY + R_OUTER * Math.sin(angle),
  }
}

const NODES: SNode[] = [
  { key: "strategy", label: "Strategy", short: "战略", type: "hard", position: hexPos(0), description: "如何获取竞争优势的计划" },
  { key: "structure", label: "Structure", short: "结构", type: "hard", position: hexPos(1), description: "组织架构与汇报关系" },
  { key: "systems", label: "Systems", short: "系统", type: "hard", position: hexPos(2), description: "流程、IT、决策机制" },
  { key: "style", label: "Style", short: "风格", type: "soft", position: hexPos(3), description: "管理风格与领导力" },
  { key: "staff", label: "Staff", short: "员工", type: "soft", position: hexPos(4), description: "员工配置、招聘、培训" },
  { key: "skills", label: "Skills", short: "技能", type: "soft", position: hexPos(5), description: "组织与员工核心能力" },
  { key: "values", label: "Shared Values", short: "共同价值观", type: "soft", position: { x: CX, y: CY }, description: "文化核心，连接其他 6S" },
]

const HARD_COLOR = "#0EA5E9"
const SOFT_COLOR = "#C9A961"
const VALUE_COLOR = "var(--primary)"

interface Strengths {
  strategy: number
  structure: number
  systems: number
  values: number
  skills: number
  staff: number
  style: number
}

const DEFAULT: Strengths = {
  strategy: 5,
  structure: 5,
  systems: 5,
  values: 5,
  skills: 5,
  staff: 5,
  style: 5,
}

const PRESETS: Record<string, Strengths> = {
  健康一致: { strategy: 7, structure: 7, systems: 7, values: 7, skills: 7, staff: 7, style: 7 },
  诺基亚式失衡: {
    strategy: 8, // 战略变激进
    structure: 4, // 结构未跟上
    systems: 3, // 系统僵化
    values: 3, // 工程师文化未变
    skills: 5, // 硬件强软件弱
    staff: 4,
    style: 3,
  },
  并购整合期: {
    strategy: 8,
    structure: 7,
    systems: 5,
    values: 3,
    skills: 4,
    staff: 4,
    style: 4,
  },
}

// detect inconsistencies: any pair where |a-b| >= 3
function getWarnings(s: Strengths): string[] {
  const warnings: string[] = []
  const pairs: { a: SKey; b: SKey; msg: string }[] = [
    { a: "strategy", b: "structure", msg: "战略已变但结构未跟上 → 执行困难" },
    { a: "strategy", b: "systems", msg: "战略激进但系统流程僵化 → 拖累迭代速度" },
    { a: "values", b: "strategy", msg: "战略与价值观脱节 → 员工不认同新方向" },
    { a: "values", b: "staff", msg: "价值观与员工类型不匹配 → 文化冲突" },
    { a: "skills", b: "strategy", msg: "战略需要的能力组织没有 → 短期补不上来" },
    { a: "structure", b: "style", msg: "结构与管理风格不一致 → 决策低效" },
    { a: "staff", b: "style", msg: "员工类型与管理风格不匹配 → 留人难" },
  ]
  for (const p of pairs) {
    if (Math.abs(s[p.a] - s[p.b]) >= 3) warnings.push(p.msg)
  }
  return warnings
}

export function SevenSNetwork() {
  const [strengths, setStrengths] = useState<Strengths>(DEFAULT)
  const [activePreset, setActivePreset] = useState<string | null>(null)

  const apply = (k: string) => {
    setStrengths(PRESETS[k])
    setActivePreset(k)
  }
  const reset = () => {
    setStrengths(DEFAULT)
    setActivePreset(null)
  }
  const warnings = getWarnings(strengths)

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        每个要素的强度（1-10）。当任意两个相互关联的要素差距过大（≥3），下方会显示一致性预警——这就是 7S 模型最有用的诊断维度。
      </p>

      <div className="flex flex-wrap gap-2 items-baseline">
        <span className="text-xs text-muted-foreground mr-1">预设：</span>
        {Object.keys(PRESETS).map((k) => (
          <Button
            key={k}
            variant={activePreset === k ? "default" : "outline"}
            size="sm"
            onClick={() => apply(k)}
          >
            {k}
          </Button>
        ))}
        <Button variant="ghost" size="sm" onClick={reset}>
          重置
        </Button>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
            {/* connection lines from center to all outer nodes */}
            {NODES.filter((n) => n.key !== "values").map((n) => (
              <line
                key={`l-${n.key}`}
                x1={CX}
                y1={CY}
                x2={n.position.x}
                y2={n.position.y}
                stroke="var(--accent)"
                strokeWidth="1.5"
                opacity="0.45"
              />
            ))}

            {/* connections between adjacent outer nodes */}
            {[
              [0, 1],
              [1, 2],
              [2, 3],
              [3, 4],
              [4, 5],
              [5, 0],
            ].map(([i, j]) => (
              <line
                key={`oe-${i}-${j}`}
                x1={hexPos(i).x}
                y1={hexPos(i).y}
                x2={hexPos(j).x}
                y2={hexPos(j).y}
                stroke="var(--muted-foreground)"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.35"
              />
            ))}

            {/* nodes */}
            {NODES.map((n) => {
              const isCenter = n.key === "values"
              const v = strengths[n.key]
              const r = isCenter ? 56 : 48
              const fill = isCenter
                ? VALUE_COLOR
                : n.type === "hard"
                  ? HARD_COLOR
                  : SOFT_COLOR
              const opacity = 0.4 + (v / 10) * 0.6
              return (
                <g key={n.key}>
                  <circle
                    cx={n.position.x}
                    cy={n.position.y}
                    r={r}
                    fill={fill}
                    fillOpacity={opacity}
                    stroke={fill}
                    strokeWidth="2"
                  />
                  <text
                    x={n.position.x}
                    y={n.position.y - (isCenter ? 8 : 6)}
                    textAnchor="middle"
                    fill="white"
                    fontSize={isCenter ? "12" : "12"}
                    fontWeight="700"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {n.short}
                  </text>
                  <text
                    x={n.position.x}
                    y={n.position.y + (isCenter ? 8 : 8)}
                    textAnchor="middle"
                    fill="white"
                    fontSize="9"
                    opacity="0.85"
                  >
                    {n.label}
                  </text>
                  <text
                    x={n.position.x}
                    y={n.position.y + (isCenter ? 24 : 24)}
                    textAnchor="middle"
                    fill="white"
                    fontSize="13"
                    fontWeight="700"
                    className="tabular-nums"
                  >
                    {v}/10
                  </text>
                </g>
              )
            })}

            {/* legend */}
            <g transform="translate(20, 410)">
              <rect width="10" height="10" fill={HARD_COLOR} />
              <text x="14" y="9" fontSize="10" fill="var(--muted-foreground)">
                硬件 Hard
              </text>
              <rect x="80" width="10" height="10" fill={SOFT_COLOR} />
              <text x="94" y="9" fontSize="10" fill="var(--muted-foreground)">
                软件 Soft
              </text>
              <rect x="160" width="10" height="10" fill={VALUE_COLOR} />
              <text x="174" y="9" fontSize="10" fill="var(--muted-foreground)">
                共同价值观（中心）
              </text>
            </g>
          </svg>
        </div>

        <div className="space-y-3">
          {NODES.map((n) => (
            <div key={n.key}>
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-sm font-medium">
                  {n.short}{" "}
                  <span className="text-[10px] text-muted-foreground italic">
                    {n.label}
                  </span>
                </span>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {strengths[n.key]} / 10
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={strengths[n.key]}
                onChange={(e) =>
                  setStrengths((p) => ({
                    ...p,
                    [n.key]: Number(e.target.value),
                  }))
                }
                className="w-full accent-[var(--accent)] cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      {warnings.length > 0 && (
        <div className="rounded-lg border-2 border-amber-300/70 bg-amber-50/50 dark:bg-amber-950/25 p-4">
          <div className="text-[11px] uppercase tracking-[0.18em] text-amber-700 dark:text-amber-400 font-bold mb-2">
            ⚠ 一致性预警 · {warnings.length} 处
          </div>
          <ul className="space-y-1.5">
            {warnings.map((w, i) => (
              <li
                key={i}
                className="text-sm text-amber-900 dark:text-amber-200 flex gap-2"
              >
                <span className="text-amber-600 mt-0.5">·</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {warnings.length === 0 && (
        <div className="rounded-lg border-2 border-emerald-300/70 bg-emerald-50/50 dark:bg-emerald-950/25 p-4">
          <div className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
            ✓ 七要素相对一致，组织内部协同性良好。
          </div>
        </div>
      )}
    </div>
  )
}
