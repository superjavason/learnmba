"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, X, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

type Quadrant = "S" | "W" | "O" | "T"

interface Item {
  id: string
  text: string
  correct: Quadrant
}

const ITEMS: Item[] = [
  { id: "1", text: "公司拥有行业领先的研发团队", correct: "S" },
  { id: "2", text: "海外市场用户对产品认知度低", correct: "W" },
  { id: "3", text: "国家出台新能源补贴政策", correct: "O" },
  { id: "4", text: "主要竞争对手发布同类新品", correct: "T" },
  { id: "5", text: "供应链严重依赖单一国家", correct: "W" },
  { id: "6", text: "Z 世代消费偏好快速升级", correct: "O" },
  { id: "7", text: "拥有 5000 万付费会员资产", correct: "S" },
  { id: "8", text: "欧盟拟出台数据出境新规", correct: "T" },
]

const QUADRANTS: {
  key: Quadrant
  label: string
  sub: string
  bg: string
  border: string
  text: string
}[] = [
  {
    key: "S",
    label: "优势 S",
    sub: "内部 / 正面",
    bg: "bg-emerald-50/70 dark:bg-emerald-950/25",
    border: "border-emerald-400/70",
    text: "text-emerald-700 dark:text-emerald-400",
  },
  {
    key: "W",
    label: "劣势 W",
    sub: "内部 / 负面",
    bg: "bg-amber-50/70 dark:bg-amber-950/25",
    border: "border-amber-400/70",
    text: "text-amber-700 dark:text-amber-400",
  },
  {
    key: "O",
    label: "机会 O",
    sub: "外部 / 正面",
    bg: "bg-sky-50/70 dark:bg-sky-950/25",
    border: "border-sky-400/70",
    text: "text-sky-700 dark:text-sky-400",
  },
  {
    key: "T",
    label: "威胁 T",
    sub: "外部 / 负面",
    bg: "bg-rose-50/70 dark:bg-rose-950/25",
    border: "border-rose-400/70",
    text: "text-rose-700 dark:text-rose-400",
  },
]

export function SwotDragQuiz() {
  const [placed, setPlaced] = useState<Record<string, Quadrant>>({})
  const [checked, setChecked] = useState(false)
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const remaining = useMemo(
    () => ITEMS.filter((i) => !placed[i.id]),
    [placed]
  )

  const handleDrop = (q: Quadrant) => (e: React.DragEvent) => {
    e.preventDefault()
    const id = e.dataTransfer.getData("text/plain")
    if (!id) return
    setPlaced((p) => ({ ...p, [id]: q }))
    setDraggingId(null)
  }

  const correctCount = ITEMS.filter((i) => placed[i.id] === i.correct).length

  // Click-to-place for keyboard / mobile
  const [pickedId, setPickedId] = useState<string | null>(null)
  const place = (q: Quadrant) => {
    if (!pickedId || checked) return
    setPlaced((p) => ({ ...p, [pickedId]: q }))
    setPickedId(null)
  }

  const reset = () => {
    setPlaced({})
    setChecked(false)
    setPickedId(null)
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        把下方 {ITEMS.length} 张要素卡拖拽（或点击拾取后再点目标象限）到对应象限。完成后点“对答案”。
      </p>

      <div className="grid grid-cols-2 gap-3">
        {QUADRANTS.map((q) => {
          const items = ITEMS.filter((i) => placed[i.id] === q.key)
          return (
            <div
              key={q.key}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop(q.key)}
              onClick={() => place(q.key)}
              className={cn(
                "rounded-lg border-2 border-dashed p-3 min-h-[150px] transition-colors",
                q.border,
                q.bg,
                pickedId && !checked && "ring-2 ring-accent/50 cursor-pointer"
              )}
            >
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <div className="font-serif font-bold text-sm">{q.label}</div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {q.sub}
                  </div>
                </div>
                <span
                  className={cn(
                    "text-[10px] tabular-nums px-1.5 py-0.5 rounded bg-background/70 border",
                    q.text
                  )}
                >
                  {items.length}
                </span>
              </div>
              <ul className="space-y-1.5">
                {items.map((it) => {
                  const isCorrect = placed[it.id] === it.correct
                  const showStatus = checked
                  return (
                    <li
                      key={it.id}
                      draggable={!checked}
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", it.id)
                        setDraggingId(it.id)
                      }}
                      onDragEnd={() => setDraggingId(null)}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (checked) return
                        // unplace by clicking
                        setPlaced((p) => {
                          const { [it.id]: _omit, ...rest } = p
                          void _omit
                          return rest
                        })
                      }}
                      className={cn(
                        "flex items-center gap-2 rounded border bg-background px-2 py-1.5 text-xs leading-relaxed transition-colors",
                        !checked &&
                          "cursor-grab active:cursor-grabbing hover:border-accent",
                        showStatus &&
                          isCorrect &&
                          "border-emerald-500 text-emerald-700 dark:text-emerald-400",
                        showStatus &&
                          !isCorrect &&
                          "border-rose-500 text-rose-700 dark:text-rose-400",
                        draggingId === it.id && "opacity-40"
                      )}
                    >
                      {showStatus &&
                        (isCorrect ? (
                          <Check className="h-3 w-3 shrink-0" />
                        ) : (
                          <X className="h-3 w-3 shrink-0" />
                        ))}
                      <span>{it.text}</span>
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
            {remaining.map((it) => (
              <li
                key={it.id}
                draggable={!checked}
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", it.id)
                  setDraggingId(it.id)
                }}
                onDragEnd={() => setDraggingId(null)}
                onClick={() => setPickedId(it.id === pickedId ? null : it.id)}
                className={cn(
                  "rounded border px-2.5 py-1.5 text-xs cursor-pointer transition-colors",
                  pickedId === it.id
                    ? "border-accent bg-accent/10"
                    : "border-border bg-background hover:border-accent/60",
                  draggingId === it.id && "opacity-40"
                )}
              >
                {it.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center gap-3 flex-wrap">
        {!checked ? (
          <Button onClick={() => setChecked(true)} disabled={remaining.length > 0}>
            对答案
          </Button>
        ) : (
          <>
            <div className="flex-1 text-sm flex items-baseline gap-2">
              <span className="font-serif text-xl font-bold tabular-nums">
                {correctCount}/{ITEMS.length}
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
