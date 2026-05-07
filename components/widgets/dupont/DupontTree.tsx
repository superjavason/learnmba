"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { dupontROE } from "@/lib/finance"
import { cn } from "@/lib/utils"

interface State {
  netIncome: number // 净利润
  revenue: number // 营收
  totalAssets: number // 总资产
  equity: number // 净资产
}

const PRESETS: Record<string, { state: State; profile: string }> = {
  苹果: {
    state: { netIncome: 90, revenue: 380, totalAssets: 350, equity: 60 },
    profile: "高利润率主导（>20%）+ 中度杠杆",
  },
  沃尔玛: {
    state: { netIncome: 13, revenue: 600, totalAssets: 250, equity: 80 },
    profile: "极致周转（>2x）+ 低利润率（~3%）",
  },
  商业银行: {
    state: { netIncome: 30, revenue: 120, totalAssets: 2400, equity: 200 },
    profile: "极高杠杆（>10x）+ 极低周转",
  },
  SaaS_公司: {
    state: { netIncome: 8, revenue: 60, totalAssets: 50, equity: 35 },
    profile: "高利润率 + 中等周转 + 低杠杆（轻资产）",
  },
  重工业: {
    state: { netIncome: 5, revenue: 200, totalAssets: 500, equity: 200 },
    profile: "低利润率 + 低周转 + 低杠杆（资产沉重）",
  },
}

const DEFAULT: State = PRESETS["苹果"].state

function fmt(n: number, digits = 2) {
  return n.toFixed(digits)
}
function pct(n: number, digits = 1) {
  return `${(n * 100).toFixed(digits)}%`
}

export function DupontTree() {
  const [s, setS] = useState<State>(DEFAULT)
  const [activePreset, setActivePreset] = useState<string | null>("苹果")
  const r = dupontROE(s)

  const apply = (key: string) => {
    setS(PRESETS[key].state)
    setActivePreset(key)
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        切换公司预设观察三个杠杆如何驱动同一个 ROE 指标。或自己拖动滑块体会三杠杆乘积关系。
      </p>

      <div className="flex flex-wrap gap-2 items-baseline">
        <span className="text-xs text-muted-foreground mr-1">公司预设：</span>
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
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="rounded-lg border border-border bg-card p-4 overflow-x-auto">
          <svg viewBox="0 0 760 420" className="w-full h-auto min-w-[640px]">
            {/* L0: ROE */}
            <Node
              x={310}
              y={20}
              w={140}
              h={68}
              label="ROE 净资产收益率"
              value={pct(r.roe)}
              color="var(--primary)"
              text="white"
              big
            />

            {/* L1 connectors */}
            <line x1={140} y1={150} x2={380} y2={88} stroke="var(--accent)" strokeWidth="1.5" />
            <line x1={380} y1={150} x2={380} y2={88} stroke="var(--accent)" strokeWidth="1.5" />
            <line x1={620} y1={150} x2={380} y2={88} stroke="var(--accent)" strokeWidth="1.5" />
            <text x={250} y={130} fontSize="11" fontWeight="700" fill="var(--accent)">×</text>
            <text x={500} y={130} fontSize="11" fontWeight="700" fill="var(--accent)">×</text>

            {/* L1: 3 levers */}
            <Node
              x={70}
              y={150}
              w={140}
              h={64}
              label="净利率"
              labelEn="Profit Margin"
              value={pct(r.profitMargin)}
              color="#0EA5E9"
              text="white"
            />
            <Node
              x={310}
              y={150}
              w={140}
              h={64}
              label="资产周转率"
              labelEn="Asset Turnover"
              value={fmt(r.assetTurnover) + "x"}
              color="#10B981"
              text="white"
            />
            <Node
              x={550}
              y={150}
              w={140}
              h={64}
              label="权益乘数"
              labelEn="Equity Multiplier"
              value={fmt(r.equityMultiplier) + "x"}
              color="#C9A961"
              text="white"
            />

            {/* L2 connectors */}
            <line x1={100} y1={278} x2={140} y2={214} stroke="var(--accent)" strokeWidth="1" />
            <line x1={180} y1={278} x2={140} y2={214} stroke="var(--accent)" strokeWidth="1" />
            <text x={100} y={252} fontSize="9" fill="var(--muted-foreground)">÷</text>

            <line x1={340} y1={278} x2={380} y2={214} stroke="var(--accent)" strokeWidth="1" />
            <line x1={420} y1={278} x2={380} y2={214} stroke="var(--accent)" strokeWidth="1" />
            <text x={342} y={252} fontSize="9" fill="var(--muted-foreground)">÷</text>

            <line x1={580} y1={278} x2={620} y2={214} stroke="var(--accent)" strokeWidth="1" />
            <line x1={660} y1={278} x2={620} y2={214} stroke="var(--accent)" strokeWidth="1" />
            <text x={580} y={252} fontSize="9" fill="var(--muted-foreground)">÷</text>

            {/* L2: leaves */}
            <Node x={50} y={278} w={100} h={50} label="净利润" value={"¥" + fmt(s.netIncome) + " 亿"} color="var(--secondary)" text="var(--foreground)" small />
            <Node x={160} y={278} w={100} h={50} label="收入" value={"¥" + fmt(s.revenue) + " 亿"} color="var(--secondary)" text="var(--foreground)" small />

            <Node x={290} y={278} w={100} h={50} label="收入" value={"¥" + fmt(s.revenue) + " 亿"} color="var(--secondary)" text="var(--foreground)" small />
            <Node x={400} y={278} w={100} h={50} label="总资产" value={"¥" + fmt(s.totalAssets) + " 亿"} color="var(--secondary)" text="var(--foreground)" small />

            <Node x={530} y={278} w={100} h={50} label="总资产" value={"¥" + fmt(s.totalAssets) + " 亿"} color="var(--secondary)" text="var(--foreground)" small />
            <Node x={640} y={278} w={100} h={50} label="净资产" value={"¥" + fmt(s.equity) + " 亿"} color="var(--secondary)" text="var(--foreground)" small />

            {/* level labels */}
            <text x={5} y={56} fontSize="10" fill="var(--muted-foreground)" letterSpacing="0.18em">L0</text>
            <text x={5} y={184} fontSize="10" fill="var(--muted-foreground)" letterSpacing="0.18em">L1</text>
            <text x={5} y={306} fontSize="10" fill="var(--muted-foreground)" letterSpacing="0.18em">L2</text>

            {/* footer summary */}
            <text x={380} y={388} textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
              ROE = {pct(r.profitMargin)} × {fmt(r.assetTurnover)}x × {fmt(r.equityMultiplier)}x = <tspan fill="var(--accent)" fontWeight="700">{pct(r.roe)}</tspan>
            </text>
            {activePreset && (
              <text x={380} y={406} textAnchor="middle" fontSize="11" fill="var(--accent)" fontWeight="600">
                {PRESETS[activePreset].profile}
              </text>
            )}
          </svg>
        </div>

        <div className="space-y-4">
          <Slider
            label="净利润 (亿元)"
            min={1}
            max={150}
            step={1}
            value={s.netIncome}
            onChange={(v) => {
              setS({ ...s, netIncome: v })
              setActivePreset(null)
            }}
            suffix="亿"
          />
          <Slider
            label="营收 (亿元)"
            min={20}
            max={1500}
            step={10}
            value={s.revenue}
            onChange={(v) => {
              setS({ ...s, revenue: v })
              setActivePreset(null)
            }}
            suffix="亿"
          />
          <Slider
            label="总资产 (亿元)"
            min={20}
            max={3000}
            step={10}
            value={s.totalAssets}
            onChange={(v) => {
              setS({ ...s, totalAssets: v })
              setActivePreset(null)
            }}
            suffix="亿"
          />
          <Slider
            label="净资产 (亿元)"
            min={10}
            max={500}
            step={5}
            value={s.equity}
            onChange={(v) => {
              setS({ ...s, equity: v })
              setActivePreset(null)
            }}
            suffix="亿"
          />

          <div className="rounded border border-accent/40 bg-accent/5 p-3 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">净利率</span>
              <span className="font-bold tabular-nums">{pct(r.profitMargin)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">资产周转率</span>
              <span className="font-bold tabular-nums">{fmt(r.assetTurnover)}x</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">权益乘数</span>
              <span className="font-bold tabular-nums">{fmt(r.equityMultiplier)}x</span>
            </div>
            <div className="flex justify-between border-t border-accent/30 pt-1.5 mt-1.5">
              <span className="text-foreground font-bold">ROE</span>
              <span className={cn("font-bold tabular-nums text-lg", r.roe >= 0.15 ? "text-emerald-600" : "text-amber-600")}>
                {pct(r.roe)}
              </span>
            </div>
          </div>
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
  labelEn,
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
  labelEn?: string
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
        y={y + (small ? 18 : big ? 24 : 22)}
        textAnchor="middle"
        fill={text}
        fontSize={small ? "10" : "11"}
        fontWeight="700"
        opacity="0.85"
      >
        {label}
      </text>
      {labelEn && (
        <text
          x={x + w / 2}
          y={y + 36}
          textAnchor="middle"
          fill={text}
          fontSize="9"
          opacity="0.7"
        >
          {labelEn}
        </text>
      )}
      <text
        x={x + w / 2}
        y={y + (small ? 38 : big ? 54 : labelEn ? 54 : 46)}
        textAnchor="middle"
        fill={text}
        fontSize={small ? "12" : big ? "18" : "14"}
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
          ¥{value.toLocaleString()} {suffix}
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
