"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface PSpec {
  key: string
  label: string
  en: string
  desc: string
  ring: "inner" | "outer"
  color: string
}

const PS: PSpec[] = [
  {
    key: "product",
    label: "Product",
    en: "产品",
    desc: "功能、设计、品牌、保修",
    ring: "inner",
    color: "#0F172A",
  },
  {
    key: "price",
    label: "Price",
    en: "价格",
    desc: "定价、折扣、付款方式",
    ring: "inner",
    color: "#C9A961",
  },
  {
    key: "place",
    label: "Place",
    en: "渠道",
    desc: "分销、零售、电商、物流",
    ring: "inner",
    color: "#0EA5E9",
  },
  {
    key: "promotion",
    label: "Promotion",
    en: "推广",
    desc: "广告、公关、销促、社媒",
    ring: "inner",
    color: "#10B981",
  },
  {
    key: "people",
    label: "People",
    en: "人员",
    desc: "员工素质、培训、态度",
    ring: "outer",
    color: "#8B5CF6",
  },
  {
    key: "process",
    label: "Process",
    en: "流程",
    desc: "服务流程、标准化、效率",
    ring: "outer",
    color: "#F97316",
  },
  {
    key: "physical",
    label: "Physical Evidence",
    en: "有形证据",
    desc: "场所、装修、物料、设备",
    ring: "outer",
    color: "#DC2626",
  },
]

const W = 480
const H = 480
const CX = W / 2
const CY = H / 2
const INNER_R_INNER = 80
const INNER_R_OUTER = 150
const OUTER_R_INNER = 152
const OUTER_R_OUTER = 220

function arcPath(
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  startAngle: number,
  endAngle: number
): string {
  const sx0 = cx + rOuter * Math.cos(startAngle)
  const sy0 = cy + rOuter * Math.sin(startAngle)
  const ex0 = cx + rOuter * Math.cos(endAngle)
  const ey0 = cy + rOuter * Math.sin(endAngle)
  const sx1 = cx + rInner * Math.cos(endAngle)
  const sy1 = cy + rInner * Math.sin(endAngle)
  const ex1 = cx + rInner * Math.cos(startAngle)
  const ey1 = cy + rInner * Math.sin(startAngle)
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0
  return `M ${sx0} ${sy0} A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${ex0} ${ey0} L ${sx1} ${sy1} A ${rInner} ${rInner} 0 ${largeArc} 0 ${ex1} ${ey1} Z`
}

export function SevenPFlower() {
  const [hovered, setHovered] = useState<string | null>(null)

  const innerPs = PS.filter((p) => p.ring === "inner")
  const outerPs = PS.filter((p) => p.ring === "outer")

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        4P 在内圈，3P 扩展（People / Process / Physical Evidence）在外圈。悬停 / 点击查看每个 P 的详情。
      </p>

      <div className="grid lg:grid-cols-[420px_1fr] gap-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
            {/* Inner ring (4P) - 4 quarters */}
            {innerPs.map((p, i) => {
              const sa = (i / 4) * 2 * Math.PI - Math.PI / 2
              const ea = ((i + 1) / 4) * 2 * Math.PI - Math.PI / 2
              const isHov = hovered === p.key
              const ma = (sa + ea) / 2
              const labelR = (INNER_R_INNER + INNER_R_OUTER) / 2
              const lx = CX + labelR * Math.cos(ma)
              const ly = CY + labelR * Math.sin(ma)
              return (
                <g
                  key={p.key}
                  onMouseEnter={() => setHovered(p.key)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setHovered(p.key === hovered ? null : p.key)}
                  style={{ cursor: "pointer" }}
                >
                  <path
                    d={arcPath(CX, CY, INNER_R_INNER, INNER_R_OUTER, sa, ea)}
                    fill={p.color}
                    fillOpacity={isHov ? 0.95 : 0.85}
                    stroke="var(--card)"
                    strokeWidth="2"
                  />
                  <text
                    x={lx}
                    y={ly - 3}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="700"
                    fill="white"
                    style={{ pointerEvents: "none", fontFamily: "var(--font-serif)" }}
                  >
                    {p.label}
                  </text>
                  <text
                    x={lx}
                    y={ly + 12}
                    textAnchor="middle"
                    fontSize="10"
                    fill="white"
                    opacity="0.85"
                    style={{ pointerEvents: "none" }}
                  >
                    {p.en}
                  </text>
                </g>
              )
            })}

            {/* Outer ring (3P) - 3 thirds */}
            {outerPs.map((p, i) => {
              const sa = (i / 3) * 2 * Math.PI - Math.PI / 2
              const ea = ((i + 1) / 3) * 2 * Math.PI - Math.PI / 2
              const isHov = hovered === p.key
              const ma = (sa + ea) / 2
              const labelR = (OUTER_R_INNER + OUTER_R_OUTER) / 2
              const lx = CX + labelR * Math.cos(ma)
              const ly = CY + labelR * Math.sin(ma)
              return (
                <g
                  key={p.key}
                  onMouseEnter={() => setHovered(p.key)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setHovered(p.key === hovered ? null : p.key)}
                  style={{ cursor: "pointer" }}
                >
                  <path
                    d={arcPath(CX, CY, OUTER_R_INNER, OUTER_R_OUTER, sa, ea)}
                    fill={p.color}
                    fillOpacity={isHov ? 0.85 : 0.55}
                    stroke="var(--card)"
                    strokeWidth="2"
                  />
                  <text
                    x={lx}
                    y={ly - 3}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill="white"
                    style={{ pointerEvents: "none", fontFamily: "var(--font-serif)" }}
                  >
                    {p.label}
                  </text>
                  <text
                    x={lx}
                    y={ly + 11}
                    textAnchor="middle"
                    fontSize="10"
                    fill="white"
                    opacity="0.85"
                    style={{ pointerEvents: "none" }}
                  >
                    {p.en}
                  </text>
                </g>
              )
            })}

            {/* Center */}
            <circle cx={CX} cy={CY} r={INNER_R_INNER} fill="var(--background)" stroke="var(--border)" strokeWidth="2" />
            <text x={CX} y={CY - 6} textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--foreground)" style={{ fontFamily: "var(--font-serif)" }}>
              营销
            </text>
            <text x={CX} y={CY + 14} textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
              Marketing Mix
            </text>
            <text x={CX} y={CY + 30} textAnchor="middle" fontSize="9" fill="var(--accent)" letterSpacing="0.18em">
              4P · 7P
            </text>
          </svg>
        </div>

        <div className="space-y-3">
          {PS.map((p) => {
            const isHov = hovered === p.key
            return (
              <div
                key={p.key}
                onMouseEnter={() => setHovered(p.key)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setHovered(p.key === hovered ? null : p.key)}
                className={cn(
                  "rounded border p-3 transition-colors cursor-pointer",
                  isHov
                    ? "border-accent bg-accent/5"
                    : "border-border bg-card hover:border-accent/50"
                )}
              >
                <div className="flex items-baseline gap-2 mb-1">
                  <span
                    className="inline-block h-3 w-3 rounded-sm shrink-0"
                    style={{ background: p.color }}
                  />
                  <span className="font-serif font-bold text-sm">{p.label}</span>
                  <span className="text-xs text-muted-foreground">· {p.en}</span>
                  <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground">
                    {p.ring === "inner" ? "4P" : "7P 扩展"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
