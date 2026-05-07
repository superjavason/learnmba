"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, X, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

type Dim = "financial" | "customer" | "process" | "learning"

interface KPI {
  id: string
  text: string
  correct: Dim
}

const KPIS: KPI[] = [
  { id: "1", text: "毛利率", correct: "financial" },
  { id: "2", text: "净推荐值 NPS", correct: "customer" },
  { id: "3", text: "员工 12 个月留存率", correct: "learning" },
  { id: "4", text: "新品上线周期", correct: "process" },
  { id: "5", text: "经营性现金流", correct: "financial" },
  { id: "6", text: "客户复购率", correct: "customer" },
  { id: "7", text: "工程师培训完成率", correct: "learning" },
  { id: "8", text: "服务交付周期", correct: "process" },
  { id: "9", text: "市场份额", correct: "customer" },
  { id: "10", text: "良品率", correct: "process" },
  { id: "11", text: "ROE", correct: "financial" },
  { id: "12", text: "员工敬业度得分", correct: "learning" },
]

const DIMS: { key: Dim; label: string; sub: string; bg: string; border: string }[] = [
  { key: "financial", label: "财务 Financial", sub: "对股东的表现", bg: "bg-sky-50/70 dark:bg-sky-950/25", border: "border-sky-400/70" },
  { key: "customer", label: "客户 Customer", sub: "客户如何看我们", bg: "bg-emerald-50/70 dark:bg-emerald-950/25", border: "border-emerald-400/70" },
  { key: "process", label: "内部流程 Process", sub: "我们要擅长什么", bg: "bg-amber-50/70 dark:bg-amber-950/25", border: "border-amber-400/70" },
  { key: "learning", label: "学习与成长", sub: "持续创新改进", bg: "bg-violet-50/70 dark:bg-violet-950/25", border: "border-violet-400/70" },
]

export function BscDragQuiz() {
  const [placed, setPlaced] = useState<Record<string, Dim>>({})
  const [submitted, setSubmitted] = useState(false)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [pickedId, setPickedId] = useState<string | null>(null)

  const remaining = KPIS.filter((k) => !placed[k.id])
  const correctCount = KPIS.filter((k) => placed[k.id] === k.correct).length

  const place = (id: string, dim: Dim) => {
    if (submitted) return
    setPlaced((p) => ({ ...p, [id]: dim }))
    setPickedId(null)
  }

  const onDrop = (dim: Dim) => (e: React.DragEvent) => {
    e.preventDefault()
    const id = e.dataTransfer.getData("text/plain")
    if (id) place(id, dim)
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
        把 12 个 KPI 拖到对应的 BSC 维度（或点击拾取后再点目标维度）。完成后看分类正确率。
      </p>

      <div className="grid grid-cols-2 gap-3">
        {DIMS.map((d) => {
          const items = KPIS.filter((k) => placed[k.id] === d.key)
          return (
            <div
              key={d.key}
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop(d.key)}
              onClick={() => pickedId && place(pickedId, d.key)}
              className={cn(
                "rounded-lg border-2 border-dashed p-3 min-h-[140px]",
                d.border,
                d.bg,
                pickedId && !submitted && "ring-2 ring-accent/50 cursor-pointer"
              )}
            >
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <div className="font-serif font-bold text-sm">{d.label}</div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {d.sub}
                  </div>
                </div>
                <span className="text-[10px] tabular-nums text-muted-foreground">
                  {items.length}
                </span>
              </div>
              <ul className="space-y-1.5">
                {items.map((k) => {
                  const isCorrect = placed[k.id] === k.correct
                  return (
                    <li
                      key={k.id}
                      draggable={!submitted}
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", k.id)
                        setDraggingId(k.id)
                      }}
                      onDragEnd={() => setDraggingId(null)}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (submitted) return
                        setPlaced((p) => {
                          const { [k.id]: _o, ...rest } = p
                          void _o
                          return rest
                        })
                      }}
                      className={cn(
                        "rounded border bg-background px-2 py-1.5 text-xs leading-relaxed flex items-center gap-2",
                        !submitted && "cursor-grab active:cursor-grabbing hover:border-accent",
                        submitted && isCorrect && "border-emerald-500 text-emerald-700 dark:text-emerald-400",
                        submitted && !isCorrect && "border-rose-500 text-rose-700 dark:text-rose-400",
                        draggingId === k.id && "opacity-40"
                      )}
                    >
                      {submitted && (isCorrect ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />)}
                      {k.text}
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
            {remaining.map((k) => (
              <li
                key={k.id}
                draggable={!submitted}
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", k.id)
                  setDraggingId(k.id)
                }}
                onDragEnd={() => setDraggingId(null)}
                onClick={() => setPickedId(k.id === pickedId ? null : k.id)}
                className={cn(
                  "rounded border px-2.5 py-1.5 text-xs cursor-pointer transition-colors",
                  pickedId === k.id ? "border-accent bg-accent/10" : "border-border bg-background hover:border-accent/60",
                  draggingId === k.id && "opacity-40"
                )}
              >
                {k.text}
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
                {correctCount}/{KPIS.length}
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
