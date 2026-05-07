"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Brand {
  id: string
  name: string
  x: number // 0-100, axis-X value
  y: number // 0-100, axis-Y value
  color: string
}

interface MarketPreset {
  axisX: { left: string; right: string }
  axisY: { bottom: string; top: string }
  brands: Brand[]
}

const PRESETS: Record<string, MarketPreset> = {
  汽车: {
    axisX: { left: "经济实用", right: "豪华高端" },
    axisY: { bottom: "燃油传统", top: "新能源 / 智能" },
    brands: [
      { id: "by", name: "比亚迪", x: 32, y: 80, color: "#0EA5E9" },
      { id: "ts", name: "Tesla", x: 70, y: 92, color: "#DC2626" },
      { id: "tt", name: "丰田", x: 35, y: 22, color: "#10B981" },
      { id: "bmw", name: "BMW", x: 78, y: 32, color: "#0F172A" },
      { id: "wl", name: "五菱宏光", x: 8, y: 30, color: "#F97316" },
      { id: "li", name: "理想", x: 65, y: 70, color: "#8B5CF6" },
    ],
  },
  咖啡: {
    axisX: { left: "便宜", right: "高价" },
    axisY: { bottom: "标准化", top: "精品手冲" },
    brands: [
      { id: "lk", name: "瑞幸", x: 30, y: 35, color: "#0EA5E9" },
      { id: "sb", name: "星巴克", x: 65, y: 55, color: "#10B981" },
      { id: "msbc", name: "蜜雪冰城", x: 8, y: 15, color: "#DC2626" },
      { id: "manner", name: "Manner", x: 55, y: 75, color: "#475569" },
      { id: "blue", name: "Blue Bottle", x: 88, y: 92, color: "#0F172A" },
      { id: "kfc", name: "KFC", x: 22, y: 22, color: "#F97316" },
    ],
  },
  智能手机: {
    axisX: { left: "性价比", right: "高端" },
    axisY: { bottom: "通用大众", top: "极客 / 影像 / 游戏" },
    brands: [
      { id: "ap", name: "iPhone", x: 88, y: 70, color: "#0F172A" },
      { id: "hw", name: "华为", x: 75, y: 78, color: "#DC2626" },
      { id: "xm", name: "小米", x: 30, y: 55, color: "#F97316" },
      { id: "ov", name: "OV", x: 45, y: 30, color: "#10B981" },
      { id: "ss", name: "Samsung", x: 68, y: 60, color: "#0EA5E9" },
      { id: "rm", name: "Redmi", x: 12, y: 35, color: "#FBBF24" },
    ],
  },
}

const W = 540
const H = 420
const MARGIN = 48

export function PerceptualMap() {
  const [presetKey, setPresetKey] = useState<keyof typeof PRESETS>("汽车")
  const preset = PRESETS[presetKey]
  const [brands, setBrands] = useState<Brand[]>(preset.brands)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [activePreset, setActivePreset] = useState<keyof typeof PRESETS>(presetKey)

  if (activePreset !== presetKey) {
    setActivePreset(presetKey)
    setBrands(preset.brands)
  }

  const onPointerDown = (id: string) => (e: React.PointerEvent<SVGGElement>) => {
    e.preventDefault()
    setDraggingId(id)
    ;(e.target as SVGGElement).setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!draggingId) return
    const svg = e.currentTarget
    const rect = svg.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * W
    const y = ((e.clientY - rect.top) / rect.height) * H
    const xVal = Math.max(0, Math.min(100, ((x - MARGIN) / (W - MARGIN * 2)) * 100))
    const yVal = Math.max(0, Math.min(100, ((H - MARGIN - y) / (H - MARGIN * 2)) * 100))
    setBrands((prev) =>
      prev.map((b) => (b.id === draggingId ? { ...b, x: xVal, y: yVal } : b))
    )
  }
  const onPointerUp = () => setDraggingId(null)

  const reset = () => setBrands(preset.brands)

  function plotX(v: number) {
    return MARGIN + (v / 100) * (W - MARGIN * 2)
  }
  function plotY(v: number) {
    return H - MARGIN - (v / 100) * (H - MARGIN * 2)
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        拖动品牌点重新定位。空白象限通常是潜在的“蓝海”——没人占据但有需求的位置。
      </p>

      <div className="flex flex-wrap gap-2 items-baseline">
        <span className="text-xs text-muted-foreground mr-1">行业：</span>
        {Object.keys(PRESETS).map((k) => (
          <Button
            key={k}
            variant={presetKey === k ? "default" : "outline"}
            size="sm"
            onClick={() => setPresetKey(k)}
          >
            {k}
          </Button>
        ))}
        <Button variant="ghost" size="sm" onClick={reset}>
          重置位置
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto touch-none select-none"
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          role="img"
          aria-label="品牌感知图"
        >
          {/* Plot frame */}
          <rect
            x={MARGIN}
            y={MARGIN}
            width={W - MARGIN * 2}
            height={H - MARGIN * 2}
            fill="var(--secondary)"
            fillOpacity={0.25}
            stroke="var(--border)"
          />

          {/* Axis lines through center */}
          <line
            x1={MARGIN}
            y1={H / 2}
            x2={W - MARGIN}
            y2={H / 2}
            stroke="var(--muted-foreground)"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.5"
          />
          <line
            x1={W / 2}
            y1={MARGIN}
            x2={W / 2}
            y2={H - MARGIN}
            stroke="var(--muted-foreground)"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.5"
          />

          {/* Axis arrows */}
          <line
            x1={MARGIN - 8}
            y1={H - MARGIN}
            x2={W - MARGIN + 8}
            y2={H - MARGIN}
            stroke="var(--foreground)"
            strokeWidth="1.5"
            markerEnd="url(#axarrow)"
          />
          <line
            x1={MARGIN}
            y1={H - MARGIN + 8}
            x2={MARGIN}
            y2={MARGIN - 8}
            stroke="var(--foreground)"
            strokeWidth="1.5"
            markerEnd="url(#axarrow)"
          />
          <defs>
            <marker
              id="axarrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--foreground)" />
            </marker>
          </defs>

          {/* Axis labels */}
          <text x={MARGIN - 4} y={H - MARGIN + 24} fontSize="11" fill="var(--muted-foreground)" textAnchor="start">
            {preset.axisX.left}
          </text>
          <text x={W - MARGIN + 4} y={H - MARGIN + 24} fontSize="11" fill="var(--muted-foreground)" textAnchor="end">
            {preset.axisX.right}
          </text>
          <text
            x={MARGIN - 24}
            y={MARGIN - 14}
            fontSize="11"
            fill="var(--muted-foreground)"
            textAnchor="start"
          >
            {preset.axisY.top}
          </text>
          <text
            x={MARGIN - 24}
            y={H - MARGIN + 4}
            fontSize="11"
            fill="var(--muted-foreground)"
            textAnchor="start"
          >
            {preset.axisY.bottom}
          </text>

          {/* Brand points */}
          {brands.map((b) => (
            <g
              key={b.id}
              transform={`translate(${plotX(b.x)}, ${plotY(b.y)})`}
              onPointerDown={onPointerDown(b.id)}
              style={{ cursor: draggingId === b.id ? "grabbing" : "grab" }}
            >
              <circle
                r={draggingId === b.id ? 12 : 10}
                fill={b.color}
                stroke="white"
                strokeWidth="2.5"
                opacity={draggingId === b.id ? 1 : 0.9}
              />
              <text
                x="14"
                y="4"
                fontSize="11"
                fontWeight="700"
                fill="var(--foreground)"
                style={{ pointerEvents: "none" }}
              >
                {b.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}
