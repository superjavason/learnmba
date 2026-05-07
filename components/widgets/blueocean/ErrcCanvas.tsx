"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Factor {
  key: string
  label: string
}

interface Preset {
  factors: Factor[]
  industry: number[]
  custom: number[]
  description: string
}

const PRESETS: Record<string, Preset> = {
  太阳马戏团: {
    factors: [
      { key: "animals", label: "动物表演" },
      { key: "stars", label: "明星演员" },
      { key: "danger", label: "杂技危险性" },
      { key: "tents", label: "多场地巡演" },
      { key: "art", label: "艺术性" },
      { key: "story", label: "故事情节" },
      { key: "music", label: "原创音乐" },
      { key: "venue", label: "场地装饰" },
      { key: "price", label: "票价" },
    ],
    // 行业平均（传统马戏）
    industry: [9, 8, 8, 8, 2, 1, 3, 3, 3],
    // 太阳马戏团
    custom: [0, 0, 4, 2, 9, 8, 9, 9, 8],
    description:
      "蓝海经典：消除动物 / 明星，减少危险与多场地，增加艺术 / 音乐 / 场地，创造故事情节。",
  },
  Yellow_Tail红酒: {
    factors: [
      { key: "complexity", label: "酒类专业感" },
      { key: "tradition", label: "传统营销" },
      { key: "ageworth", label: "年份价值" },
      { key: "varieties", label: "品种丰富度" },
      { key: "ease", label: "易饮性" },
      { key: "fun", label: "趣味包装" },
      { key: "price", label: "价格" },
    ],
    industry: [9, 8, 8, 9, 3, 2, 8],
    custom: [1, 2, 1, 2, 9, 9, 4],
    description:
      "去掉葡萄酒的复杂术语与高定价，让啤酒 / 鸡尾酒爱好者也能轻松进入红酒市场。",
  },
  Nintendo_Wii: {
    factors: [
      { key: "graphics", label: "画面性能" },
      { key: "complexity", label: "操作复杂度" },
      { key: "library", label: "重度玩家游戏数" },
      { key: "price", label: "价格（越高 = 数值越高）" },
      { key: "motion", label: "体感互动" },
      { key: "social", label: "家庭社交性" },
      { key: "casual", label: "新手易用度" },
    ],
    industry: [9, 7, 9, 9, 1, 3, 3],
    custom: [4, 2, 5, 4, 10, 9, 9],
    description:
      "不在画面 / 性能上死磕索尼微软，开辟“家庭体感游戏”这片蓝海，把不打游戏的人变玩家。",
  },
}

export function ErrcCanvas() {
  const [presetKey, setPresetKey] = useState<keyof typeof PRESETS>("太阳马戏团")
  const preset = PRESETS[presetKey]
  const [vals, setVals] = useState<number[]>(preset.custom)
  const [activePreset, setActivePreset] = useState<keyof typeof PRESETS>(presetKey)

  // Reset vals when preset changes
  if (activePreset !== presetKey) {
    setActivePreset(presetKey)
    setVals(preset.custom)
  }

  const data = preset.factors.map((f, i) => ({
    factor: f.label,
    行业平均: preset.industry[i],
    我的价值曲线: vals[i],
  }))

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        切换案例查看 ERRC 价值曲线，或拖动滑块调整每个因素，观察你的曲线如何与行业平均拉开差异。
      </p>

      <div className="flex flex-wrap gap-2 items-baseline">
        <span className="text-xs text-muted-foreground mr-1">案例预设：</span>
        {Object.keys(PRESETS).map((k) => (
          <Button
            key={k}
            variant={presetKey === k ? "default" : "outline"}
            size="sm"
            onClick={() => setPresetKey(k)}
          >
            {k.replace(/_/g, " ")}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setVals(preset.industry)}
        >
          压平到行业平均
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 16, right: 24, left: 8, bottom: 16 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="factor"
              tick={{ fontSize: 11, fill: "var(--foreground)" }}
              interval={0}
              angle={-12}
              dy={8}
            />
            <YAxis
              domain={[0, 10]}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              label={{ value: "表现水平", angle: -90, position: "insideLeft", offset: 8, style: { fontSize: 10, fill: "var(--muted-foreground)" } }}
            />
            <Tooltip
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line
              type="monotone"
              dataKey="行业平均"
              stroke="#94A3B8"
              strokeWidth={2}
              strokeDasharray="6 4"
              dot={{ r: 4, fill: "#94A3B8" }}
            />
            <Line
              type="monotone"
              dataKey="我的价值曲线"
              stroke="var(--accent)"
              strokeWidth={3}
              dot={{ r: 5, fill: "var(--accent)" }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="text-xs text-muted-foreground italic mt-2 text-center">
          {preset.description}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {preset.factors.map((f, i) => {
          const v = vals[i]
          const ind = preset.industry[i]
          const action =
            v === 0 && ind > 0
              ? { label: "消除", color: "text-rose-600" }
              : v < ind
                ? { label: "减少", color: "text-amber-600" }
                : v === ind
                  ? { label: "持平", color: "text-muted-foreground" }
                  : ind === 0 && v > 0
                    ? { label: "创造", color: "text-emerald-600" }
                    : { label: "增加", color: "text-sky-600" }
          return (
            <div key={f.key} className="rounded border border-border bg-card p-3">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-sm font-medium">{f.label}</span>
                <span className={cn("text-[10px] uppercase tracking-wider font-bold", action.color)}>
                  {action.label}
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-1.5 text-xs tabular-nums text-muted-foreground">
                <span>行业 {ind}</span>
                <span>·</span>
                <span>你 {v}</span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                step={1}
                value={v}
                onChange={(e) => {
                  const n = Number(e.target.value)
                  setVals((prev) => prev.map((x, idx) => (idx === i ? n : x)))
                }}
                className="w-full accent-[var(--accent)] cursor-pointer"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
