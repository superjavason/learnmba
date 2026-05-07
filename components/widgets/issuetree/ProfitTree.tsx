"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface State {
  units: number // 销量（万件）
  price: number // 单价（元）
  unitVarCost: number // 单位变动成本（元）
  fixedCost: number // 固定成本（万元）
}

const DEFAULT: State = {
  units: 100,
  price: 200,
  unitVarCost: 120,
  fixedCost: 3000,
}

function format(n: number): string {
  return new Intl.NumberFormat("zh-CN", {
    maximumFractionDigits: 0,
  }).format(n)
}

export function ProfitTree() {
  const [s, setS] = useState<State>(DEFAULT)
  const [baseline] = useState<State>(DEFAULT)

  const revenue = s.units * s.price // 万元
  const variableCost = s.units * s.unitVarCost
  const totalCost = variableCost + s.fixedCost
  const profit = revenue - totalCost

  const baselineProfit =
    baseline.units * baseline.price - (baseline.units * baseline.unitVarCost + baseline.fixedCost)
  const profitDelta = profit - baselineProfit
  const profitPct =
    baselineProfit !== 0 ? (profitDelta / baselineProfit) * 100 : 0

  const reset = () => setS(DEFAULT)

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        下方是一棵典型“利润树”——拖动右侧滑块改变叶子节点的值，看每一层节点和最终利润如何实时变化。
      </p>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        <div className="rounded-lg border border-border bg-card p-4 overflow-x-auto">
          <svg viewBox="0 0 720 460" className="w-full h-auto min-w-[600px]">
            {/* L0: profit */}
            <Node
              x={310}
              y={20}
              w={100}
              h={64}
              label="利润"
              value={`¥${format(profit)} 万`}
              color={profit >= 0 ? "var(--primary)" : "#dc2626"}
              text="white"
              big
            />
            {/* lines L0 → L1 */}
            <line x1={360} y1={84} x2={180} y2={130} stroke="var(--accent)" strokeWidth="1.5" />
            <line x1={360} y1={84} x2={540} y2={130} stroke="var(--accent)" strokeWidth="1.5" />
            <text x={250} y={108} fontSize="10" fill="var(--accent)" fontWeight="700">+</text>
            <text x={460} y={108} fontSize="10" fill="var(--accent)" fontWeight="700">−</text>

            {/* L1: revenue & cost */}
            <Node x={130} y={130} w={100} h={56} label="收入" value={`¥${format(revenue)} 万`} color="#0EA5E9" text="white" />
            <Node x={490} y={130} w={100} h={56} label="总成本" value={`¥${format(totalCost)} 万`} color="#F97316" text="white" />

            {/* lines L1 → L2 */}
            <line x1={180} y1={186} x2={70} y2={240} stroke="var(--accent)" strokeWidth="1.2" />
            <line x1={180} y1={186} x2={290} y2={240} stroke="var(--accent)" strokeWidth="1.2" />
            <text x={120} y={216} fontSize="10" fill="var(--accent)">×</text>
            <text x={245} y={216} fontSize="10" fill="var(--accent)">×</text>

            <line x1={540} y1={186} x2={430} y2={240} stroke="var(--accent)" strokeWidth="1.2" />
            <line x1={540} y1={186} x2={650} y2={240} stroke="var(--accent)" strokeWidth="1.2" />
            <text x={478} y={216} fontSize="10" fill="var(--accent)">+</text>
            <text x={598} y={216} fontSize="10" fill="var(--accent)">+</text>

            {/* L2: revenue side */}
            <Node x={20} y={240} w={100} h={56} label="销量（万件）" value={`${format(s.units)}`} color="#0284C7" text="white" />
            <Node x={240} y={240} w={100} h={56} label="单价（元）" value={`¥${format(s.price)}`} color="#0284C7" text="white" />

            {/* L2: cost side */}
            <Node x={380} y={240} w={100} h={56} label="变动成本" value={`¥${format(variableCost)} 万`} color="#EA580C" text="white" />
            <Node x={600} y={240} w={100} h={56} label="固定成本" value={`¥${format(s.fixedCost)} 万`} color="#EA580C" text="white" />

            {/* lines variable cost → leaves */}
            <line x1={430} y1={296} x2={350} y2={350} stroke="var(--accent)" strokeWidth="1" />
            <line x1={430} y1={296} x2={510} y2={350} stroke="var(--accent)" strokeWidth="1" />
            <text x={385} y={325} fontSize="9" fill="var(--accent)">×</text>
            <text x={465} y={325} fontSize="9" fill="var(--accent)">×</text>

            {/* L3: under variable cost */}
            <Node x={300} y={350} w={100} h={48} label="销量" value={`${format(s.units)}`} color="var(--secondary)" text="var(--foreground)" small />
            <Node x={460} y={350} w={120} h={48} label="单位变动成本" value={`¥${format(s.unitVarCost)}`} color="var(--secondary)" text="var(--foreground)" small />

            {/* labels for tree levels */}
            <text x={5} y={50} fontSize="10" fill="var(--muted-foreground)" letterSpacing="0.18em">L0</text>
            <text x={5} y={158} fontSize="10" fill="var(--muted-foreground)" letterSpacing="0.18em">L1</text>
            <text x={5} y={268} fontSize="10" fill="var(--muted-foreground)" letterSpacing="0.18em">L2</text>
            <text x={5} y={376} fontSize="10" fill="var(--muted-foreground)" letterSpacing="0.18em">L3</text>
          </svg>

          <div className="mt-3 grid grid-cols-3 gap-3 border-t border-border pt-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">利润</div>
              <div className="font-serif text-2xl font-bold tabular-nums">¥{format(profit)} 万</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">vs 基准</div>
              <div
                className={`font-serif text-xl font-bold tabular-nums ${profitDelta >= 0 ? "text-emerald-600" : "text-rose-600"}`}
              >
                {profitDelta >= 0 ? "+" : ""}¥{format(profitDelta)} 万
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">变化</div>
              <div
                className={`font-serif text-xl font-bold tabular-nums ${profitDelta >= 0 ? "text-emerald-600" : "text-rose-600"}`}
              >
                {profitDelta >= 0 ? "+" : ""}{profitPct.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Slider
            label="销量（万件）"
            min={50}
            max={150}
            step={1}
            value={s.units}
            onChange={(v) => setS({ ...s, units: v })}
            suffix="万件"
          />
          <Slider
            label="单价（元）"
            min={150}
            max={250}
            step={5}
            value={s.price}
            onChange={(v) => setS({ ...s, price: v })}
            suffix="元"
          />
          <Slider
            label="单位变动成本（元）"
            min={80}
            max={160}
            step={5}
            value={s.unitVarCost}
            onChange={(v) => setS({ ...s, unitVarCost: v })}
            suffix="元"
          />
          <Slider
            label="固定成本（万元）"
            min={2000}
            max={4000}
            step={100}
            value={s.fixedCost}
            onChange={(v) => setS({ ...s, fixedCost: v })}
            suffix="万"
          />
          <Button variant="outline" size="sm" onClick={reset} className="w-full">
            <RotateCcw className="mr-2 h-3 w-3" />
            重置基准
          </Button>
        </div>
      </div>
    </div>
  )
}

function Node({
  x,
  y,
  w,
  h,
  label,
  value,
  color,
  text,
  big,
  small,
}: {
  x: number
  y: number
  w: number
  h: number
  label: string
  value: string
  color: string
  text: string
  big?: boolean
  small?: boolean
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill={color} stroke="var(--border)" />
      <text
        x={x + w / 2}
        y={y + (small ? 18 : big ? 28 : 22)}
        textAnchor="middle"
        fill={text}
        fontSize={small ? "10" : "11"}
        fontWeight="700"
        opacity="0.85"
      >
        {label}
      </text>
      <text
        x={x + w / 2}
        y={y + (small ? 38 : big ? 52 : 44)}
        textAnchor="middle"
        fill={text}
        fontSize={small ? "12" : big ? "16" : "13"}
        fontWeight="700"
        className="tabular-nums"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {value}
      </text>
    </g>
  )
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  suffix,
}: {
  label: string
  min: number
  max: number
  step: number
  value: number
  onChange: (v: number) => void
  suffix?: string
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs tabular-nums text-muted-foreground">
          {value.toLocaleString()} {suffix}
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
