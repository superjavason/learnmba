"use client"

import { useState } from "react"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts"
import { Button } from "@/components/ui/button"
import { pestelScore } from "@/lib/score"

type Dim = "P" | "E1" | "S" | "T" | "E2" | "L"
const DIMS: { key: Dim; label: string; full: string; hint: string }[] = [
  { key: "P", label: "政治 P", full: "Political", hint: "政策稳定性、监管、贸易协议" },
  { key: "E1", label: "经济 E", full: "Economic", hint: "GDP 增长、利率、通胀、汇率" },
  { key: "S", label: "社会 S", full: "Social", hint: "人口、文化、消费习惯、教育" },
  { key: "T", label: "技术 T", full: "Technological", hint: "创新、数字化、研发投入" },
  { key: "E2", label: "环境 E", full: "Environmental", hint: "气候、资源、环保法规" },
  { key: "L", label: "法律 L", full: "Legal", hint: "知识产权、消费者保护、隐私" },
]

const PRESETS: Record<string, Record<Dim, number>> = {
  "新能源车（中国）": { P: 8, E1: 7, S: 8, T: 9, E2: 9, L: 6 },
  "传统燃油车（欧洲）": { P: 3, E1: 5, S: 3, T: 5, E2: 2, L: 4 },
  "AI SaaS（美国）": { P: 5, E1: 7, S: 7, T: 9, E2: 7, L: 4 },
}

export function PestelRadar() {
  const [vals, setVals] = useState<Record<Dim, number>>({
    P: 5,
    E1: 5,
    S: 5,
    T: 5,
    E2: 5,
    L: 5,
  })

  const score = pestelScore({
    political: vals.P,
    economic: vals.E1,
    social: vals.S,
    technological: vals.T,
    environmental: vals.E2,
    legal: vals.L,
  })

  const data = DIMS.map((d) => ({
    dim: d.label,
    value: vals[d.key],
    full: 10,
  }))

  const verdict =
    score >= 7
      ? { label: "宏观环境对你较有利", tone: "text-emerald-600" }
      : score >= 4.5
      ? { label: "环境利弊参半", tone: "text-amber-600" }
      : { label: "宏观环境不利，谨慎进入", tone: "text-rose-600" }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        每个维度评分 0-10（越高代表外部环境对你越有利）。试试预设场景对比，或拖动滑块自己评估。
      </p>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <ResponsiveContainer width="100%" height={360}>
            <RadarChart data={data} outerRadius="75%">
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis
                dataKey="dim"
                tick={{ fontSize: 12, fill: "var(--foreground)" }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 10]}
                tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                stroke="var(--muted-foreground)"
              />
              <Radar
                name="环境评分"
                dataKey="value"
                stroke="var(--accent)"
                fill="var(--accent)"
                fillOpacity={0.35}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-2 flex items-baseline justify-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              综合环境指数
            </span>
            <span className="font-serif text-3xl font-bold tabular-nums">
              {score.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">/10</span>
            <span className={`text-xs ml-2 ${verdict.tone}`}>{verdict.label}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
              预设场景
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(PRESETS).map(([name, p]) => (
                <Button
                  key={name}
                  variant="outline"
                  size="sm"
                  onClick={() => setVals(p)}
                >
                  {name}
                </Button>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setVals({ P: 5, E1: 5, S: 5, T: 5, E2: 5, L: 5 })
                }
              >
                重置
              </Button>
            </div>
          </div>
          <div className="space-y-3">
            {DIMS.map((d) => (
              <div key={d.key}>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-sm font-medium">{d.label}</span>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {vals[d.key]} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  value={vals[d.key]}
                  onChange={(e) =>
                    setVals((v) => ({
                      ...v,
                      [d.key]: Number(e.target.value),
                    }))
                  }
                  className="w-full accent-[var(--accent)] cursor-pointer"
                />
                <div className="text-[10px] text-muted-foreground mt-0.5">
                  {d.hint}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
