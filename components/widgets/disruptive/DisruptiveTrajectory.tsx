"use client"

import { useMemo, useState } from "react"
import {
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
  Area,
  ComposedChart,
} from "recharts"
import { Button } from "@/components/ui/button"

interface CasePreset {
  label: string
  context: string
  // performance functions: linear, with start, growth/year
  incumbentStart: number
  incumbentGrowth: number
  disruptorStart: number
  disruptorGrowth: number
  customerNeedStart: number
  customerNeedGrowth: number
  performanceUnit: string
  yearsTotal: number
  insight: string
}

const PRESETS: Record<string, CasePreset> = {
  硬盘: {
    label: "硬盘容量演进 (1985-2000)",
    context: "5.25\" → 3.5\" → 2.5\" 的多次颠覆",
    incumbentStart: 100,
    incumbentGrowth: 60,
    disruptorStart: 20,
    disruptorGrowth: 90,
    customerNeedStart: 50,
    customerNeedGrowth: 30,
    performanceUnit: "MB",
    yearsTotal: 12,
    insight:
      "Christensen 经典案例：每次颠覆者从更小、更便宜的尺寸切入，性能改进速度持续超过客户需求增长。",
  },
  手机: {
    label: "智能手机 vs 功能机 (2007-2014)",
    context: "iPhone vs Nokia 的反超",
    incumbentStart: 60,
    incumbentGrowth: 8,
    disruptorStart: 35,
    disruptorGrowth: 18,
    customerNeedStart: 50,
    customerNeedGrowth: 12,
    performanceUnit: "综合体验",
    yearsTotal: 8,
    insight:
      "iPhone 起步在“按键便利”等传统维度不如 Nokia，但综合体验改进速度（每年 OTA + 大版本）远超功能机。",
  },
  电动车: {
    label: "电动车 vs 燃油车 (2012-2025)",
    context: "Tesla vs 传统车企",
    incumbentStart: 75,
    incumbentGrowth: 4,
    disruptorStart: 40,
    disruptorGrowth: 12,
    customerNeedStart: 60,
    customerNeedGrowth: 6,
    performanceUnit: "综合性能（续航/智能/补能）",
    yearsTotal: 13,
    insight:
      "Tesla 起步续航/补能不如燃油车，但每年 OTA + 自动驾驶迭代速度让传统车企 5 年改款的节奏望尘莫及。",
  },
}

export function DisruptiveTrajectory() {
  const [presetKey, setPresetKey] = useState<keyof typeof PRESETS>("硬盘")
  const [year, setYear] = useState(0)
  const p = PRESETS[presetKey]
  const [activeKey, setActiveKey] = useState<keyof typeof PRESETS>(presetKey)

  if (activeKey !== presetKey) {
    setActiveKey(presetKey)
    setYear(0)
  }

  const data = useMemo(() => {
    const arr = []
    for (let y = 0; y <= p.yearsTotal; y++) {
      arr.push({
        year: y,
        现有领导者: Math.round(p.incumbentStart + p.incumbentGrowth * y),
        颠覆者: Math.round(p.disruptorStart + p.disruptorGrowth * y),
        客户需求上限: Math.round(p.customerNeedStart + p.customerNeedGrowth * y),
      })
    }
    return arr
  }, [p])

  // crossover year (where disruptor meets customer need)
  const meetingNeedYear = useMemo(() => {
    const data2 = data
    for (let i = 0; i < data2.length; i++) {
      if (data2[i]["颠覆者"] >= data2[i]["客户需求上限"]) return i
    }
    return null
  }, [data])

  // crossover year (where disruptor surpasses incumbent)
  const surpassIncumbentYear = useMemo(() => {
    for (let i = 0; i < data.length; i++) {
      if (data[i]["颠覆者"] >= data[i]["现有领导者"]) return i
    }
    return null
  }, [data])

  const currentDataIdx = Math.min(year, p.yearsTotal)
  const cur = data[currentDataIdx]

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        切换案例查看颠覆轨迹。颠覆发生于颠覆者性能曲线穿过客户需求线 → 主流客户开始可以选用颠覆者的产品。
      </p>

      <div className="flex flex-wrap gap-2 items-baseline">
        <span className="text-xs text-muted-foreground mr-1">案例：</span>
        {(Object.keys(PRESETS) as Array<keyof typeof PRESETS>).map((k) => (
          <Button
            key={k}
            variant={presetKey === k ? "default" : "outline"}
            size="sm"
            onClick={() => setPresetKey(k)}
          >
            {k}
          </Button>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="text-sm font-medium mb-1">{p.label}</div>
        <div className="text-xs text-muted-foreground italic mb-2">{p.context}</div>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={data} margin={{ top: 16, right: 24, left: 8, bottom: 16 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              label={{ value: "年", position: "insideBottom", offset: -8, style: { fontSize: 10, fill: "var(--muted-foreground)" } }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              label={{
                value: p.performanceUnit,
                angle: -90,
                position: "insideLeft",
                offset: 10,
                style: { fontSize: 10, fill: "var(--muted-foreground)" },
              }}
            />
            <Tooltip
              contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area
              type="monotone"
              dataKey="客户需求上限"
              stroke="#94A3B8"
              fill="#94A3B8"
              fillOpacity={0.1}
              strokeDasharray="4 4"
            />
            <Line
              type="monotone"
              dataKey="现有领导者"
              stroke="#0F172A"
              strokeWidth={2.5}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="颠覆者"
              stroke="#DC2626"
              strokeWidth={2.5}
              dot={{ r: 3 }}
            />
            <ReferenceLine
              x={year}
              stroke="var(--accent)"
              strokeWidth={2}
              strokeDasharray="4 4"
              label={{ value: `当前 t=${year}`, fill: "var(--accent)", fontSize: 10, position: "top" }}
            />
            {meetingNeedYear !== null && (
              <ReferenceLine
                x={meetingNeedYear}
                stroke="#10B981"
                strokeWidth={1.5}
                strokeDasharray="2 4"
                label={{ value: `颠覆触发 t=${meetingNeedYear}`, fill: "#10B981", fontSize: 10, position: "insideTopRight", fontWeight: 700 }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-medium">时间轴：第 {year} 年</span>
          <span className="text-xs text-muted-foreground">
            点击 ◀ ▶ 或滑块查看任意时点
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={p.yearsTotal}
          step={1}
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="w-full accent-[var(--accent)] cursor-pointer"
        />

        <div className="grid sm:grid-cols-3 gap-3 pt-2 border-t border-border">
          <div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">现有领导者性能</div>
            <div className="font-serif text-lg font-bold tabular-nums">{cur["现有领导者"]}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">颠覆者性能</div>
            <div className="font-serif text-lg font-bold tabular-nums text-rose-600">{cur["颠覆者"]}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">客户需求上限</div>
            <div className="font-serif text-lg font-bold tabular-nums text-muted-foreground">
              {cur["客户需求上限"]}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-accent/40 bg-accent/5 p-4 space-y-2 text-sm">
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          <div>
            <span className="text-muted-foreground">颠覆触发年（颠覆者满足主流需求）：</span>
            <span className="font-bold tabular-nums">
              {meetingNeedYear !== null ? `第 ${meetingNeedYear} 年` : "未发生"}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">超越现有领导者：</span>
            <span className="font-bold tabular-nums">
              {surpassIncumbentYear !== null
                ? `第 ${surpassIncumbentYear} 年`
                : "未发生"}
            </span>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed border-t border-accent/20 pt-2">
          💡 {p.insight}
        </p>
      </div>
    </div>
  )
}
