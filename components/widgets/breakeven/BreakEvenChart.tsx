"use client"

import { useMemo, useState } from "react"
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
  CartesianGrid,
} from "recharts"
import { Button } from "@/components/ui/button"
import { breakEvenUnits, breakEvenRevenue } from "@/lib/finance"
import { RotateCcw } from "lucide-react"

interface State {
  price: number
  unitVarCost: number
  fixedCost: number
}

const PRESETS: Record<string, State> = {
  精品咖啡店: { price: 30, unitVarCost: 6, fixedCost: 58000 },
  中端餐饮: { price: 80, unitVarCost: 30, fixedCost: 120000 },
  共享办公: { price: 1500, unitVarCost: 200, fixedCost: 280000 },
  "电商 SKU": { price: 200, unitVarCost: 100, fixedCost: 50000 },
}

const DEFAULT: State = PRESETS["精品咖啡店"]

export function BreakEvenChart() {
  const [s, setS] = useState<State>(DEFAULT)
  const [activePreset, setActivePreset] = useState<string | null>("精品咖啡店")

  const apply = (k: string) => {
    setS(PRESETS[k])
    setActivePreset(k)
  }
  const reset = () => {
    setS(DEFAULT)
    setActivePreset("精品咖啡店")
  }

  const bepUnits = breakEvenUnits(s)
  const bepRevenue = breakEvenRevenue(s)
  const cm = s.price - s.unitVarCost

  // build chart data: range from 0 to ~2x BEP
  const data = useMemo(() => {
    const max = isFinite(bepUnits) ? Math.max(bepUnits * 2, 500) : 5000
    const points = 30
    const arr = []
    for (let i = 0; i <= points; i++) {
      const units = Math.round((max / points) * i)
      const revenue = units * s.price
      const totalCost = s.fixedCost + units * s.unitVarCost
      const profit = revenue - totalCost
      arr.push({
        units,
        revenue,
        totalCost,
        fixedCost: s.fixedCost,
        profit,
      })
    }
    return arr
  }, [s, bepUnits])

  const fmt = (n: number) =>
    new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 0 }).format(n)

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        切换预设场景或拖动滑块，看“盈亏平衡点”如何随单价、固定成本、变动成本变化。
      </p>

      <div className="flex flex-wrap gap-2 items-baseline">
        <span className="text-xs text-muted-foreground mr-1">场景预设：</span>
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
          <RotateCcw className="mr-1 h-3 w-3" />
          重置
        </Button>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <ResponsiveContainer width="100%" height={340}>
            <ComposedChart
              data={data}
              margin={{ top: 16, right: 36, left: 8, bottom: 16 }}
            >
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis
                dataKey="units"
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                label={{
                  value: "销量（件）",
                  position: "insideBottom",
                  offset: -8,
                  style: { fontSize: 10, fill: "var(--muted-foreground)" },
                }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                tickFormatter={(v) => fmt(v / 1000) + "k"}
                label={{
                  value: "金额（元）",
                  angle: -90,
                  position: "insideLeft",
                  offset: 10,
                  style: { fontSize: 10, fill: "var(--muted-foreground)" },
                }}
              />
              <Tooltip
                formatter={(v) => `¥${fmt(Number(v))}`}
                labelFormatter={(v) => `销量 ${fmt(v)} 件`}
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  fontSize: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area
                type="monotone"
                dataKey="fixedCost"
                stroke="#94A3B8"
                fill="#94A3B8"
                fillOpacity={0.15}
                name="固定成本"
                strokeDasharray="4 4"
              />
              <Line
                type="monotone"
                dataKey="totalCost"
                stroke="#F97316"
                strokeWidth={2.5}
                dot={false}
                name="总成本"
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#0EA5E9"
                strokeWidth={2.5}
                dot={false}
                name="总收入"
              />
              {isFinite(bepUnits) && (
                <ReferenceLine
                  x={Math.round(bepUnits)}
                  stroke="var(--accent)"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  label={{
                    value: `盈亏平衡 ${Math.round(bepUnits)} 件`,
                    fill: "var(--accent)",
                    fontSize: 11,
                    position: "top",
                    fontWeight: 700,
                  }}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <Slider
            label="单价（元）"
            min={1}
            max={2000}
            step={1}
            value={s.price}
            onChange={(v) => {
              setS({ ...s, price: v })
              setActivePreset(null)
            }}
            prefix="¥"
          />
          <Slider
            label="单位变动成本（元）"
            min={0}
            max={1500}
            step={1}
            value={s.unitVarCost}
            onChange={(v) => {
              setS({ ...s, unitVarCost: v })
              setActivePreset(null)
            }}
            prefix="¥"
          />
          <Slider
            label="固定成本（元/月）"
            min={1000}
            max={500000}
            step={1000}
            value={s.fixedCost}
            onChange={(v) => {
              setS({ ...s, fixedCost: v })
              setActivePreset(null)
            }}
            prefix="¥"
          />

          <div className="rounded border border-accent/40 bg-accent/5 p-3 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">单位贡献边际</span>
              <span
                className={`font-bold tabular-nums ${cm > 0 ? "" : "text-destructive"}`}
              >
                ¥{fmt(cm)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">贡献边际率</span>
              <span className="font-bold tabular-nums">
                {s.price > 0 ? ((cm / s.price) * 100).toFixed(1) : "—"}%
              </span>
            </div>
            <div className="flex justify-between border-t border-accent/30 pt-1.5 mt-1.5">
              <span className="text-foreground font-bold">盈亏平衡销量</span>
              <span
                className={`font-bold tabular-nums text-base ${isFinite(bepUnits) ? "" : "text-destructive"}`}
              >
                {isFinite(bepUnits) ? fmt(bepUnits) + " 件" : "永不盈利"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground font-bold">盈亏平衡收入</span>
              <span className="font-bold tabular-nums">
                {isFinite(bepRevenue) ? "¥" + fmt(bepRevenue) : "—"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  prefix,
}: {
  label: string
  min: number
  max: number
  step: number
  value: number
  onChange: (v: number) => void
  prefix?: string
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs tabular-nums text-muted-foreground">
          {prefix}
          {value.toLocaleString()}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--accent)] cursor-pointer"
      />
    </div>
  )
}
