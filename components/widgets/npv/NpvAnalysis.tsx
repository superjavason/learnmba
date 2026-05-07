"use client"

import { useMemo, useState } from "react"
import {
  ComposedChart,
  Bar,
  Cell,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
  CartesianGrid,
} from "recharts"
import { Button } from "@/components/ui/button"
import { npv, irr } from "@/lib/finance"
import { RotateCcw, Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface State {
  cashflows: number[] // [year0, year1, ..., yearN]
  rate: number // discount rate (decimal)
}

const PRESETS: Record<string, State> = {
  新工厂: { cashflows: [-500, 200, 200, 200, 200, 200], rate: 0.1 },
  数字化升级: { cashflows: [-500, 50, 100, 200, 350, 400], rate: 0.1 },
  房地产: { cashflows: [-1000, -200, 100, 400, 700, 1200], rate: 0.12 },
  SaaS_获客: { cashflows: [-300, -100, 50, 200, 350, 500], rate: 0.15 },
}

const DEFAULT: State = PRESETS["新工厂"]

const fmt = (n: number) =>
  new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 1 }).format(n)
const pct = (n: number) => `${(n * 100).toFixed(1)}%`

export function NpvAnalysis() {
  const [s, setS] = useState<State>(DEFAULT)
  const [activePreset, setActivePreset] = useState<string | null>("新工厂")

  const apply = (k: string) => {
    setS({ ...PRESETS[k] })
    setActivePreset(k)
  }
  const reset = () => apply("新工厂")

  const updateCf = (i: number, v: number) => {
    const next = [...s.cashflows]
    next[i] = v
    setS({ ...s, cashflows: next })
    setActivePreset(null)
  }
  const addYear = () => {
    if (s.cashflows.length >= 11) return
    setS({ ...s, cashflows: [...s.cashflows, 100] })
    setActivePreset(null)
  }
  const removeYear = () => {
    if (s.cashflows.length <= 2) return
    setS({ ...s, cashflows: s.cashflows.slice(0, -1) })
    setActivePreset(null)
  }

  const npvVal = npv(s.rate, s.cashflows)
  const irrVal = irr(s.cashflows)

  // Waterfall data
  const waterfallData = useMemo(
    () =>
      s.cashflows.map((cf, i) => ({
        year: `Year ${i}`,
        cashflow: cf,
        discounted: cf / Math.pow(1 + s.rate, i),
      })),
    [s]
  )

  // NPV vs rate curve data
  const curveData = useMemo(() => {
    const points = []
    for (let r = -0.05; r <= 0.5; r += 0.01) {
      points.push({
        rate: Math.round(r * 1000) / 1000,
        npv: npv(r, s.cashflows),
      })
    }
    return points
  }, [s.cashflows])

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        切换项目预设，看现金流瀑布与 NPV 随折现率的曲线。曲线穿过 0 处的折现率即为 IRR。
      </p>

      <div className="flex flex-wrap gap-2 items-baseline">
        <span className="text-xs text-muted-foreground mr-1">项目预设：</span>
        {Object.keys(PRESETS).map((k) => (
          <Button
            key={k}
            variant={activePreset === k ? "default" : "outline"}
            size="sm"
            onClick={() => apply(k)}
          >
            {k.replace(/_/g, " ")}
          </Button>
        ))}
        <Button variant="ghost" size="sm" onClick={reset}>
          <RotateCcw className="mr-1 h-3 w-3" />
          重置
        </Button>
      </div>

      {/* Cashflow editor */}
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <div className="flex items-baseline justify-between">
          <h4 className="font-serif font-bold text-sm">现金流（万元）</h4>
          <div className="flex gap-1">
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={removeYear}>
              <Minus className="h-3.5 w-3.5" />
            </Button>
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={addYear}>
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
          {s.cashflows.map((cf, i) => (
            <div key={i} className="flex flex-col gap-1">
              <label className="text-[10px] text-muted-foreground tabular-nums">
                第 {i} 年{i === 0 && "（初始）"}
              </label>
              <input
                type="number"
                step="10"
                value={cf}
                onChange={(e) => updateCf(i, Number(e.target.value))}
                className={cn(
                  "rounded border bg-background px-2 py-1 text-sm tabular-nums focus:border-accent focus:outline-none",
                  cf < 0 ? "border-rose-300 text-rose-700 dark:text-rose-400" : "border-border"
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Discount rate slider + summary */}
      <div className="grid lg:grid-cols-[1fr_300px] gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-baseline justify-between mb-2">
            <h4 className="font-serif font-bold text-sm">折现率（资本成本）</h4>
            <span className="font-serif text-xl font-bold tabular-nums">
              {pct(s.rate)}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={0.5}
            step={0.005}
            value={s.rate}
            onChange={(e) => {
              setS({ ...s, rate: Number(e.target.value) })
              setActivePreset(null)
            }}
            className="w-full accent-[var(--accent)] cursor-pointer"
          />
        </div>

        <div className="rounded-lg border border-accent/40 bg-accent/5 p-4 space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-muted-foreground">NPV</span>
            <span
              className={cn(
                "font-serif text-2xl font-bold tabular-nums",
                npvVal >= 0 ? "text-emerald-600" : "text-rose-600"
              )}
            >
              {npvVal >= 0 ? "+" : ""}¥{fmt(npvVal)}万
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-muted-foreground">IRR</span>
            <span
              className={cn(
                "font-serif text-xl font-bold tabular-nums",
                irrVal !== null && irrVal > s.rate
                  ? "text-emerald-600"
                  : "text-rose-600"
              )}
            >
              {irrVal !== null ? pct(irrVal) : "无解"}
            </span>
          </div>
          <div className="border-t border-accent/30 pt-2 text-xs text-muted-foreground">
            决策建议：
            <span
              className={cn(
                "ml-1 font-bold",
                npvVal > 0 ? "text-emerald-600" : "text-rose-600"
              )}
            >
              {npvVal > 0 ? "✓ 接受项目" : "✕ 拒绝项目"}
            </span>
            {irrVal !== null && (
              <div className="text-[11px] mt-1">
                IRR {pct(irrVal)} {irrVal > s.rate ? "高于" : "低于"} 折现率 {pct(s.rate)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Waterfall chart */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="font-serif font-bold text-sm mb-2">现金流瀑布（含贴现影响）</h4>
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={waterfallData} margin={{ top: 16, right: 24, left: 8, bottom: 16 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="year" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={(v) => fmt(v)}
            />
            <Tooltip
              formatter={(v) => `¥${fmt(Number(v))}万`}
              contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <ReferenceLine y={0} stroke="var(--foreground)" strokeWidth={1} />
            <Bar dataKey="cashflow" name="名义现金流">
              {waterfallData.map((d, i) => (
                <Cell key={i} fill={d.cashflow >= 0 ? "#0EA5E9" : "#DC2626"} />
              ))}
            </Bar>
            <Bar dataKey="discounted" name="贴现后现金流">
              {waterfallData.map((d, i) => (
                <Cell key={i} fill={d.cashflow >= 0 ? "#C9A961" : "#9F1239"} fillOpacity={0.7} />
              ))}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* NPV vs rate curve */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="font-serif font-bold text-sm mb-2">NPV 随折现率变化曲线（IRR = 曲线穿过 0 点）</h4>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={curveData} margin={{ top: 16, right: 24, left: 8, bottom: 16 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="rate"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
              label={{ value: "折现率", position: "insideBottom", offset: -8, style: { fontSize: 10, fill: "var(--muted-foreground)" } }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={(v) => fmt(v)}
              label={{ value: "NPV (万元)", angle: -90, position: "insideLeft", offset: 10, style: { fontSize: 10, fill: "var(--muted-foreground)" } }}
            />
            <Tooltip
              formatter={(v) => `¥${fmt(Number(v))}万`}
              labelFormatter={(v) => `折现率 ${(Number(v) * 100).toFixed(1)}%`}
              contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", fontSize: 12 }}
            />
            <ReferenceLine y={0} stroke="var(--foreground)" strokeWidth={1.5} />
            <ReferenceLine
              x={s.rate}
              stroke="var(--accent)"
              strokeDasharray="4 4"
              label={{ value: "当前折现率", fill: "var(--accent)", fontSize: 10, position: "top" }}
            />
            {irrVal !== null && irrVal >= -0.05 && irrVal <= 0.5 && (
              <ReferenceLine
                x={Math.round(irrVal * 1000) / 1000}
                stroke="#10B981"
                strokeWidth={2}
                label={{ value: `IRR ${pct(irrVal)}`, fill: "#10B981", fontSize: 11, position: "insideTopRight", fontWeight: 700 }}
              />
            )}
            <Line type="monotone" dataKey="npv" stroke="var(--primary)" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
