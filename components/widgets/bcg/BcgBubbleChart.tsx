"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface Product {
  id: string
  name: string
  share: number // relative share, log scale 0.1..10
  growth: number // % market growth, 0..30
  revenue: number // billions, controls bubble size
  color: string
}

const APPLE_PRESET: Product[] = [
  { id: "iphone", name: "iPhone", share: 2.2, growth: 4, revenue: 200, color: "#0F172A" },
  { id: "services", name: "服务", share: 2.8, growth: 14, revenue: 96, color: "#C9A961" },
  { id: "wearables", name: "Watch+AirPods", share: 1.6, growth: 12, revenue: 38, color: "#475569" },
  { id: "mac", name: "Mac", share: 1.1, growth: 3, revenue: 30, color: "#0EA5E9" },
  { id: "ipad", name: "iPad", share: 1.6, growth: -2, revenue: 28, color: "#10B981" },
  { id: "vision", name: "Vision Pro", share: 0.4, growth: 24, revenue: 4, color: "#DC2626" },
]

const GROWTH_THRESHOLD = 8
const SHARE_THRESHOLD = 1.0

function quadrant(p: Product): "star" | "cow" | "question" | "dog" {
  const highG = p.growth > GROWTH_THRESHOLD
  const highS = p.share > SHARE_THRESHOLD
  if (highG && highS) return "star"
  if (!highG && highS) return "cow"
  if (highG && !highS) return "question"
  return "dog"
}

const QUAD_LABEL = {
  star: { zh: "明星", en: "Star", strategy: "持续投入，保持领先" },
  cow: { zh: "金牛", en: "Cash Cow", strategy: "收割现金，反哺其他" },
  question: { zh: "问题", en: "Question Mark", strategy: "加大投入或果断退出" },
  dog: { zh: "瘦狗", en: "Dog", strategy: "考虑退出或剥离" },
}

// Plot dimensions
const W = 560
const H = 440
const MARGIN = { top: 28, right: 28, bottom: 56, left: 64 }
const PLOT_W = W - MARGIN.left - MARGIN.right
const PLOT_H = H - MARGIN.top - MARGIN.bottom

// Log scale for x: share 0.1..10, mapped from PLOT_W to 0
function shareToX(share: number): number {
  const log = Math.log10(Math.max(0.1, Math.min(10, share)))
  // Map log [-1, 1] to PLOT_W..0 (high share on the LEFT — BCG convention)
  return MARGIN.left + ((1 - log) / 2) * PLOT_W
}
function xToShare(x: number): number {
  const log = 1 - ((x - MARGIN.left) / PLOT_W) * 2
  return Math.pow(10, log)
}

// Linear y: growth 0..30
function growthToY(g: number): number {
  const clamped = Math.max(0, Math.min(30, g))
  return MARGIN.top + ((30 - clamped) / 30) * PLOT_H
}
function yToGrowth(y: number): number {
  return 30 - ((y - MARGIN.top) / PLOT_H) * 30
}

const SHARE_THRESHOLD_X = shareToX(SHARE_THRESHOLD)
const GROWTH_THRESHOLD_Y = growthToY(GROWTH_THRESHOLD)

function radius(revenue: number): number {
  // sqrt for area mapping; min 6, max 40
  return Math.max(6, Math.min(40, Math.sqrt(revenue) * 2.4))
}

export function BcgBubbleChart() {
  const [products, setProducts] = useState<Product[]>(APPLE_PRESET)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const onPointerDown = (id: string) => (e: React.PointerEvent<SVGCircleElement>) => {
    e.preventDefault()
    setDraggingId(id)
    setSelectedId(id)
    ;(e.target as SVGCircleElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!draggingId) return
    const svg = e.currentTarget
    const rect = svg.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * W
    const y = ((e.clientY - rect.top) / rect.height) * H
    if (
      x < MARGIN.left ||
      x > MARGIN.left + PLOT_W ||
      y < MARGIN.top ||
      y > MARGIN.top + PLOT_H
    )
      return
    const newShare = Math.max(0.1, Math.min(10, xToShare(x)))
    const newGrowth = Math.max(0, Math.min(30, yToGrowth(y)))
    setProducts((prev) =>
      prev.map((p) =>
        p.id === draggingId ? { ...p, share: newShare, growth: newGrowth } : p
      )
    )
  }
  const onPointerUp = () => setDraggingId(null)

  const reset = () => {
    setProducts(APPLE_PRESET)
    setSelectedId(null)
  }

  const selected = products.find((p) => p.id === selectedId) ?? null

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        拖动任意气泡到新位置，看产品象限如何变化（横轴=相对市场份额对数刻度；纵轴=市场增长率）。
      </p>

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto touch-none select-none"
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            role="img"
            aria-label="BCG 矩阵"
          >
            {/* Quadrant background tints */}
            <rect
              x={MARGIN.left}
              y={MARGIN.top}
              width={SHARE_THRESHOLD_X - MARGIN.left}
              height={GROWTH_THRESHOLD_Y - MARGIN.top}
              fill="#fef3c7"
              fillOpacity="0.35"
            />
            <rect
              x={SHARE_THRESHOLD_X}
              y={MARGIN.top}
              width={MARGIN.left + PLOT_W - SHARE_THRESHOLD_X}
              height={GROWTH_THRESHOLD_Y - MARGIN.top}
              fill="#dcfce7"
              fillOpacity="0.4"
            />
            <rect
              x={MARGIN.left}
              y={GROWTH_THRESHOLD_Y}
              width={SHARE_THRESHOLD_X - MARGIN.left}
              height={MARGIN.top + PLOT_H - GROWTH_THRESHOLD_Y}
              fill="#fee2e2"
              fillOpacity="0.3"
            />
            <rect
              x={SHARE_THRESHOLD_X}
              y={GROWTH_THRESHOLD_Y}
              width={MARGIN.left + PLOT_W - SHARE_THRESHOLD_X}
              height={MARGIN.top + PLOT_H - GROWTH_THRESHOLD_Y}
              fill="#dbeafe"
              fillOpacity="0.3"
            />

            {/* Quadrant labels */}
            <text x={SHARE_THRESHOLD_X - 80} y={MARGIN.top + 22} fontSize="13" fontWeight="700" fill="#15803d" style={{ fontFamily: "var(--font-serif)" }}>★ 明星 Star</text>
            <text x={SHARE_THRESHOLD_X + 12} y={MARGIN.top + 22} fontSize="13" fontWeight="700" fill="#92400e" style={{ fontFamily: "var(--font-serif)" }}>? 问题 Question</text>
            <text x={SHARE_THRESHOLD_X - 90} y={MARGIN.top + PLOT_H - 12} fontSize="13" fontWeight="700" fill="#0369a1" style={{ fontFamily: "var(--font-serif)" }}>$ 金牛 Cash Cow</text>
            <text x={SHARE_THRESHOLD_X + 12} y={MARGIN.top + PLOT_H - 12} fontSize="13" fontWeight="700" fill="#9f1239" style={{ fontFamily: "var(--font-serif)" }}>✕ 瘦狗 Dog</text>

            {/* Plot frame */}
            <rect x={MARGIN.left} y={MARGIN.top} width={PLOT_W} height={PLOT_H} fill="none" stroke="var(--border)" />

            {/* Threshold lines */}
            <line x1={SHARE_THRESHOLD_X} y1={MARGIN.top} x2={SHARE_THRESHOLD_X} y2={MARGIN.top + PLOT_H} stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
            <line x1={MARGIN.left} y1={GROWTH_THRESHOLD_Y} x2={MARGIN.left + PLOT_W} y2={GROWTH_THRESHOLD_Y} stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />

            {/* X axis ticks (share, log) */}
            {[0.1, 0.5, 1.0, 2.0, 5.0, 10].map((tick) => (
              <g key={tick}>
                <line x1={shareToX(tick)} y1={MARGIN.top + PLOT_H} x2={shareToX(tick)} y2={MARGIN.top + PLOT_H + 5} stroke="var(--border)" />
                <text x={shareToX(tick)} y={MARGIN.top + PLOT_H + 18} textAnchor="middle" fontSize="10" fill="var(--muted-foreground)" className="tabular-nums">
                  {tick}x
                </text>
              </g>
            ))}
            <text x={MARGIN.left + PLOT_W / 2} y={H - 8} textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
              相对市场份额（对数刻度，高 → 左）
            </text>

            {/* Y axis ticks */}
            {[0, 5, 10, 15, 20, 25, 30].map((tick) => (
              <g key={tick}>
                <line x1={MARGIN.left - 5} y1={growthToY(tick)} x2={MARGIN.left} y2={growthToY(tick)} stroke="var(--border)" />
                <text x={MARGIN.left - 8} y={growthToY(tick) + 3} textAnchor="end" fontSize="10" fill="var(--muted-foreground)" className="tabular-nums">
                  {tick}%
                </text>
              </g>
            ))}
            <text x="14" y={MARGIN.top + PLOT_H / 2} fontSize="11" fill="var(--muted-foreground)" textAnchor="middle" transform={`rotate(-90, 14, ${MARGIN.top + PLOT_H / 2})`}>
              市场增长率
            </text>

            {/* Bubbles */}
            {products.map((p) => {
              const cx = shareToX(p.share)
              const cy = growthToY(p.growth)
              const r = radius(p.revenue)
              const isSelected = p.id === selectedId
              return (
                <g key={p.id}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill={p.color}
                    fillOpacity={isSelected ? 0.85 : 0.65}
                    stroke={isSelected ? "var(--accent)" : p.color}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    onPointerDown={onPointerDown(p.id)}
                    style={{ cursor: draggingId === p.id ? "grabbing" : "grab" }}
                  />
                  <text
                    x={cx}
                    y={cy + r + 12}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill="var(--foreground)"
                  >
                    {p.name}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
              产品列表（点击高亮 / 拖动调整）
            </div>
            <ul className="space-y-1.5">
              {products.map((p) => {
                const q = quadrant(p)
                const ql = QUAD_LABEL[q]
                return (
                  <li key={p.id}>
                    <button
                      onClick={() => setSelectedId(p.id === selectedId ? null : p.id)}
                      className={cn(
                        "w-full flex items-center gap-2 rounded border px-2 py-1.5 text-xs transition-colors",
                        selectedId === p.id
                          ? "border-accent bg-accent/10"
                          : "border-border hover:border-accent/50"
                      )}
                    >
                      <span
                        className="h-3 w-3 rounded-full shrink-0"
                        style={{ background: p.color }}
                      />
                      <span className="font-medium flex-1 text-left">{p.name}</span>
                      <span className="text-[10px] text-muted-foreground tabular-nums">
                        {ql.zh}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
            <Button variant="outline" size="sm" onClick={reset} className="mt-3 w-full">
              <RotateCcw className="mr-2 h-3 w-3" />
              重置为苹果产品组合
            </Button>
          </div>

          {selected && (
            <div className="rounded-lg border border-accent/40 bg-accent/5 p-3">
              <div className="font-serif font-bold text-sm mb-1">
                {selected.name}
              </div>
              <div className="text-xs space-y-1 text-muted-foreground tabular-nums">
                <div>
                  相对份额{" "}
                  <span className="font-bold text-foreground">
                    {selected.share.toFixed(2)}x
                  </span>
                </div>
                <div>
                  市场增长率{" "}
                  <span className="font-bold text-foreground">
                    {selected.growth.toFixed(1)}%
                  </span>
                </div>
                <div>
                  营收 ~$
                  <span className="font-bold text-foreground">
                    {selected.revenue}B
                  </span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-accent/20 text-xs">
                <div className="font-bold mb-0.5">
                  {QUAD_LABEL[quadrant(selected)].zh} ·{" "}
                  {QUAD_LABEL[quadrant(selected)].en}
                </div>
                <div className="text-muted-foreground">
                  策略：{QUAD_LABEL[quadrant(selected)].strategy}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
