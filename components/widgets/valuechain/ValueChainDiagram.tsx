"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface Activity {
  key: string
  label: string
  short: string
  description: string
  type: "support" | "primary"
  presetCost: { apple: number; walmart: number }
  presetValue: { apple: number; walmart: number }
}

const PRIMARY: Activity[] = [
  {
    key: "inbound",
    label: "入库物流",
    short: "Inbound",
    description: "原材料接收、存储、仓储、库存管理",
    type: "primary",
    presetCost: { apple: 8, walmart: 18 },
    presetValue: { apple: 5, walmart: 25 },
  },
  {
    key: "ops",
    label: "生产",
    short: "Operations",
    description: "把投入转化为成品的核心制造活动",
    type: "primary",
    presetCost: { apple: 35, walmart: 5 },
    presetValue: { apple: 20, walmart: 5 },
  },
  {
    key: "outbound",
    label: "出库物流",
    short: "Outbound",
    description: "成品仓储、订单处理、配送给客户",
    type: "primary",
    presetCost: { apple: 5, walmart: 22 },
    presetValue: { apple: 5, walmart: 25 },
  },
  {
    key: "marketing",
    label: "营销与销售",
    short: "Marketing",
    description: "品牌、广告、定价、渠道、销售队伍",
    type: "primary",
    presetCost: { apple: 18, walmart: 6 },
    presetValue: { apple: 35, walmart: 10 },
  },
  {
    key: "service",
    label: "服务",
    short: "Service",
    description: "安装、维修、培训、退换、客户支持",
    type: "primary",
    presetCost: { apple: 8, walmart: 4 },
    presetValue: { apple: 20, walmart: 8 },
  },
]

const SUPPORT: Activity[] = [
  {
    key: "infra",
    label: "企业基础设施",
    short: "Infrastructure",
    description: "管理、财务、法务、规划",
    type: "support",
    presetCost: { apple: 6, walmart: 8 },
    presetValue: { apple: 3, walmart: 5 },
  },
  {
    key: "hr",
    label: "人力资源",
    short: "Human Resources",
    description: "招聘、培训、薪酬、文化",
    type: "support",
    presetCost: { apple: 8, walmart: 12 },
    presetValue: { apple: 5, walmart: 8 },
  },
  {
    key: "tech",
    label: "技术开发",
    short: "Technology Development",
    description: "研发、流程创新、信息系统",
    type: "support",
    presetCost: { apple: 12, walmart: 5 },
    presetValue: { apple: 7, walmart: 4 },
  },
  {
    key: "procure",
    label: "采购",
    short: "Procurement",
    description: "供应商管理、采购战略",
    type: "support",
    presetCost: { apple: 0, walmart: 20 },
    presetValue: { apple: 0, walmart: 10 },
  },
]

type Preset = "apple" | "walmart"

const ACTIVITIES = [...PRIMARY, ...SUPPORT]

export function ValueChainDiagram() {
  const [preset, setPreset] = useState<Preset>("apple")
  const [hovered, setHovered] = useState<string | null>(null)

  const get = (a: Activity) => ({
    cost: a.presetCost[preset],
    value: a.presetValue[preset],
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm flex-wrap">
        <span className="text-muted-foreground mr-1">公司预设：</span>
        {(["apple", "walmart"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPreset(p)}
            className={cn(
              "rounded border px-3 py-1 text-xs transition-colors",
              preset === p
                ? "border-accent bg-accent/10 text-accent-foreground"
                : "border-border hover:border-accent/50"
            )}
          >
            {p === "apple" ? "苹果（重营销/技术）" : "沃尔玛（重物流/采购）"}
          </button>
        ))}
        <span className="text-xs text-muted-foreground ml-2">
          点击或悬停活动查看详情
        </span>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 overflow-x-auto">
        <svg
          viewBox="0 0 880 360"
          className="w-full h-auto min-w-[720px]"
          role="img"
          aria-label="波特价值链图"
        >
          {/* Section labels */}
          <text x="20" y="15" fontSize="10" fill="var(--muted-foreground)" style={{ letterSpacing: "0.18em" }}>
            支持活动 / SUPPORT ACTIVITIES
          </text>
          <text x="20" y="195" fontSize="10" fill="var(--muted-foreground)" style={{ letterSpacing: "0.18em" }}>
            主活动 / PRIMARY ACTIVITIES
          </text>

          {/* Support bars (4 stacked) */}
          {SUPPORT.map((a, i) => {
            const y = 24 + i * 38
            const v = get(a)
            const isHov = hovered === a.key
            return (
              <g
                key={a.key}
                onMouseEnter={() => setHovered(a.key)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setHovered(a.key)}
                style={{ cursor: "pointer" }}
              >
                <rect
                  x="20"
                  y={y}
                  width="840"
                  height="32"
                  fill={isHov ? "var(--accent)" : "var(--secondary)"}
                  fillOpacity={isHov ? 0.25 : 0.85}
                  stroke="var(--border)"
                  rx="3"
                />
                <text
                  x="32"
                  y={y + 21}
                  fill="var(--foreground)"
                  fontSize="13"
                  fontWeight="700"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {a.label}
                </text>
                <text
                  x="180"
                  y={y + 21}
                  fill="var(--muted-foreground)"
                  fontSize="11"
                >
                  {a.description}
                </text>
                <text
                  x="850"
                  y={y + 16}
                  textAnchor="end"
                  fill="var(--muted-foreground)"
                  fontSize="10"
                >
                  成本占比
                </text>
                <text
                  x="850"
                  y={y + 28}
                  textAnchor="end"
                  fill="var(--accent)"
                  fontSize="13"
                  fontWeight="700"
                  className="tabular-nums"
                >
                  {v.cost}%
                </text>
              </g>
            )
          })}

          {/* Primary activities — 5 arrow shapes */}
          {PRIMARY.map((a, i) => {
            const w = 156
            const x = 20 + i * w
            const y = 210
            const tip = 22
            const v = get(a)
            const isHov = hovered === a.key
            const fill = isHov ? "var(--accent)" : "var(--primary)"
            const fillOpacity = isHov ? 0.92 : 1
            const path = `M ${x} ${y} L ${x + w - tip} ${y} L ${x + w} ${y + 50} L ${x + w - tip} ${y + 100} L ${x} ${y + 100} L ${x + tip} ${y + 50} Z`
            return (
              <g
                key={a.key}
                onMouseEnter={() => setHovered(a.key)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setHovered(a.key)}
                style={{ cursor: "pointer" }}
              >
                <path
                  d={path}
                  fill={fill}
                  fillOpacity={fillOpacity}
                  stroke="var(--border)"
                />
                <text
                  x={x + w / 2}
                  y={y + 38}
                  textAnchor="middle"
                  fill={
                    isHov
                      ? "var(--accent-foreground)"
                      : "var(--primary-foreground)"
                  }
                  fontSize="14"
                  fontWeight="700"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {a.label}
                </text>
                <text
                  x={x + w / 2}
                  y={y + 56}
                  textAnchor="middle"
                  fill={
                    isHov
                      ? "var(--accent-foreground)"
                      : "var(--primary-foreground)"
                  }
                  fontSize="10"
                  opacity="0.78"
                >
                  {a.short}
                </text>
                <text
                  x={x + w / 2}
                  y={y + 80}
                  textAnchor="middle"
                  fill={
                    isHov
                      ? "var(--accent-foreground)"
                      : "var(--primary-foreground)"
                  }
                  fontSize="11"
                  fontWeight="700"
                  className="tabular-nums"
                >
                  价值 {v.value}%
                </text>
              </g>
            )
          })}

          {/* Margin/profit annotation */}
          <g>
            <rect
              x="20"
              y="324"
              width="840"
              height="26"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              rx="2"
            />
            <text
              x="440"
              y="342"
              textAnchor="middle"
              fill="var(--accent)"
              fontSize="13"
              fontWeight="700"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              总价值 = Σ 各活动价值 − Σ 成本 → 利润 Margin
            </text>
          </g>
        </svg>
      </div>

      {hovered && (
        <div className="rounded-lg border border-accent/40 bg-accent/5 p-4">
          {(() => {
            const a = ACTIVITIES.find((x) => x.key === hovered)
            if (!a) return null
            const v = get(a)
            return (
              <div>
                <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {a.type === "primary" ? "主活动" : "支持活动"}
                  </span>
                  <h4 className="font-serif font-bold">{a.label}</h4>
                  <span className="text-xs text-muted-foreground italic">
                    {a.short}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {a.description}
                </p>
                <div className="flex gap-6 text-sm tabular-nums">
                  <div>
                    成本占比{" "}
                    <span className="font-bold text-foreground">{v.cost}%</span>
                  </div>
                  <div>
                    价值贡献{" "}
                    <span className="font-bold text-foreground">{v.value}%</span>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}
