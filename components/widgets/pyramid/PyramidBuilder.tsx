"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, X, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

type Tier = "top" | "middle" | "bottom"

interface Card {
  id: string
  text: string
  correct: Tier
}

const CARDS: Card[] = [
  { id: "1", text: "建议三轨并行恢复 6 个月内增长", correct: "top" },
  { id: "2", text: "加速线上化（论点 1）", correct: "middle" },
  { id: "3", text: "重塑核心品类（论点 2）", correct: "middle" },
  { id: "4", text: "升级会员体系（论点 3）", correct: "middle" },
  { id: "5", text: "线上销售占比仅 12%，行业平均 28%", correct: "bottom" },
  { id: "6", text: "TOP10 SKU 贡献 60% 销售额，需重点投入", correct: "bottom" },
  { id: "7", text: "高价值会员复购率仅 18%，行业 35%", correct: "bottom" },
  { id: "8", text: "新增 200 家店面装修升级", correct: "bottom" },
]

const TIERS: { key: Tier; label: string; sub: string; max: number; bg: string; border: string }[] = [
  { key: "top", label: "顶层 / 中心结论", sub: "1 句话", max: 1, bg: "bg-primary/10", border: "border-primary/40" },
  { key: "middle", label: "中层 / 主要论点", sub: "3 个", max: 3, bg: "bg-amber-50/70 dark:bg-amber-950/30", border: "border-amber-300/70" },
  { key: "bottom", label: "底层 / 数据事实", sub: "4 个", max: 4, bg: "bg-secondary/40", border: "border-border" },
]

export function PyramidBuilder() {
  const [placed, setPlaced] = useState<Record<string, Tier>>({})
  const [submitted, setSubmitted] = useState(false)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [pickedId, setPickedId] = useState<string | null>(null)

  const remaining = CARDS.filter((c) => !placed[c.id])
  const correctCount = CARDS.filter((c) => placed[c.id] === c.correct).length

  const place = (id: string, tier: Tier) => {
    if (submitted) return
    const tierMax = TIERS.find((t) => t.key === tier)!.max
    const inTier = Object.entries(placed).filter(
      ([cid, t]) => t === tier && cid !== id
    ).length
    if (inTier >= tierMax) return
    setPlaced((p) => ({ ...p, [id]: tier }))
    setPickedId(null)
  }

  const handleDrop = (tier: Tier) => (e: React.DragEvent) => {
    e.preventDefault()
    const id = e.dataTransfer.getData("text/plain")
    if (id) place(id, tier)
    setDraggingId(null)
  }

  const reset = () => {
    setPlaced({})
    setSubmitted(false)
    setPickedId(null)
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        把 8 张卡片拖到金字塔的对应层级（顶层=1 个结论 / 中层=3 个论点 / 底层=4 个数据）。完成后查看是否符合“以上统下”。
      </p>

      <div className="space-y-3">
        {TIERS.map((t) => {
          const items = CARDS.filter((c) => placed[c.id] === t.key)
          return (
            <div
              key={t.key}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop(t.key)}
              onClick={() => pickedId && place(pickedId, t.key)}
              className={cn(
                "rounded-lg border-2 border-dashed p-3 min-h-[80px]",
                t.border,
                t.bg,
                pickedId && !submitted && "ring-2 ring-accent/50 cursor-pointer"
              )}
            >
              <div className="flex items-baseline justify-between mb-2">
                <div>
                  <div className="font-serif font-bold text-sm">{t.label}</div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {t.sub}
                  </div>
                </div>
                <span className="text-[10px] tabular-nums text-muted-foreground">
                  {items.length}/{t.max}
                </span>
              </div>
              <ul className="space-y-1.5">
                {items.map((c) => {
                  const isCorrect = placed[c.id] === c.correct
                  const showStatus = submitted
                  return (
                    <li
                      key={c.id}
                      draggable={!submitted}
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", c.id)
                        setDraggingId(c.id)
                      }}
                      onDragEnd={() => setDraggingId(null)}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (submitted) return
                        setPlaced((p) => {
                          const { [c.id]: _o, ...rest } = p
                          void _o
                          return rest
                        })
                      }}
                      className={cn(
                        "rounded border bg-background px-2 py-1.5 text-xs leading-relaxed",
                        !submitted && "cursor-grab active:cursor-grabbing hover:border-accent",
                        showStatus &&
                          isCorrect &&
                          "border-emerald-500 text-emerald-700 dark:text-emerald-400",
                        showStatus &&
                          !isCorrect &&
                          "border-rose-500 text-rose-700 dark:text-rose-400",
                        draggingId === c.id && "opacity-40"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {showStatus &&
                          (isCorrect ? (
                            <Check className="h-3 w-3 shrink-0" />
                          ) : (
                            <X className="h-3 w-3 shrink-0" />
                          ))}
                        {c.text}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>

      {remaining.length > 0 && (
        <div className="rounded-lg border border-border bg-muted/30 p-3">
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
            待分配（{remaining.length}）
          </div>
          <ul className="flex flex-wrap gap-2">
            {remaining.map((c) => (
              <li
                key={c.id}
                draggable={!submitted}
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", c.id)
                  setDraggingId(c.id)
                }}
                onDragEnd={() => setDraggingId(null)}
                onClick={() => setPickedId(c.id === pickedId ? null : c.id)}
                className={cn(
                  "rounded border px-2.5 py-1.5 text-xs cursor-pointer transition-colors",
                  pickedId === c.id
                    ? "border-accent bg-accent/10"
                    : "border-border bg-background hover:border-accent/60",
                  draggingId === c.id && "opacity-40"
                )}
              >
                {c.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center gap-3 flex-wrap">
        {!submitted ? (
          <Button onClick={() => setSubmitted(true)} disabled={remaining.length > 0}>
            对答案
          </Button>
        ) : (
          <>
            <div className="flex-1 text-sm flex items-baseline gap-2">
              <span className="font-serif text-xl font-bold tabular-nums">
                {correctCount}/{CARDS.length}
              </span>
              <span className="text-xs text-muted-foreground">分类正确</span>
            </div>
            <Button variant="outline" onClick={reset}>
              <RotateCcw className="mr-2 h-3.5 w-3.5" />
              重新尝试
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
