"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, X, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

type Role = "S" | "C" | "Q" | "A"

interface Card {
  id: string
  text: string
  correct: Role
}

// scrambled order on purpose
const CARDS: Card[] = [
  {
    id: "1",
    text: "建议 Q3 追加 200 万元全部投入该新渠道，预计带来 7700 个付费用户。",
    correct: "A",
  },
  {
    id: "2",
    text: "过去 12 个月我们的获客成本稳定在 480 元，单位经济一直很健康。",
    correct: "S",
  },
  {
    id: "3",
    text: "（CFO 心里）是否、以及该投入多少去抢占这个低成本窗口？",
    correct: "Q",
  },
  {
    id: "4",
    text: "但本季度一个新渠道把成本压到 260 元，且竞争对手尚未进入——窗口有限。",
    correct: "C",
  },
]

const SLOTS: { key: Role; label: string; sub: string; color: string }[] = [
  { key: "S", label: "情境 Situation", sub: "建立共识的背景", color: "#0EA5E9" },
  { key: "C", label: "冲突 Complication", sub: "打破平衡的变化", color: "#DC2626" },
  { key: "Q", label: "疑问 Question", sub: "对方心里的问题", color: "#C9A961" },
  { key: "A", label: "解答 Answer", sub: "你的核心结论", color: "#059669" },
]

export function ScqaBuilder() {
  const [placed, setPlaced] = useState<Record<string, Role>>({})
  const [pickedId, setPickedId] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const remaining = CARDS.filter((c) => !placed[c.id])
  const correctCount = CARDS.filter((c) => placed[c.id] === c.correct).length

  const place = (id: string, role: Role) => {
    if (submitted) return
    // each slot holds exactly one card; clear any card already in that slot
    setPlaced((p) => {
      const next: Record<string, Role> = {}
      for (const [cid, r] of Object.entries(p)) {
        if (r !== role && cid !== id) next[cid] = r
      }
      next[id] = role
      return next
    })
    setPickedId(null)
  }

  const reset = () => {
    setPlaced({})
    setPickedId(null)
    setSubmitted(false)
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        下面 4 句话来自一封争取预算的邮件，但顺序被打乱了。先点选一句，再点对应的 SCQA 角色，把它们各归其位。
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {SLOTS.map((s) => {
          const card = CARDS.find((c) => placed[c.id] === s.key)
          const isCorrect = card && card.correct === s.key
          return (
            <button
              key={s.key}
              onClick={() => pickedId && place(pickedId, s.key)}
              disabled={submitted}
              className={cn(
                "text-left rounded-lg border-2 border-dashed p-3 min-h-[92px] transition-colors",
                pickedId && !submitted
                  ? "cursor-pointer ring-2 ring-accent/40"
                  : "cursor-default"
              )}
              style={{ borderColor: `${s.color}66`, background: `${s.color}0d` }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full text-white text-xs font-serif font-bold"
                  style={{ background: s.color }}
                >
                  {s.key}
                </span>
                <span className="font-serif font-bold text-sm">{s.label}</span>
              </div>
              {card ? (
                <span
                  className={cn(
                    "flex items-start gap-1.5 text-xs leading-relaxed",
                    submitted &&
                      (isCorrect
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-rose-700 dark:text-rose-400")
                  )}
                >
                  {submitted &&
                    (isCorrect ? (
                      <Check className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    ) : (
                      <X className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    ))}
                  {card.text}
                </span>
              ) : (
                <span className="text-[11px] text-muted-foreground">{s.sub}</span>
              )}
            </button>
          )
        })}
      </div>

      {remaining.length > 0 && (
        <div className="rounded-lg border border-border bg-muted/30 p-3">
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
            待归位（{remaining.length}）
          </div>
          <ul className="space-y-2">
            {remaining.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setPickedId(c.id === pickedId ? null : c.id)}
                  className={cn(
                    "w-full text-left rounded border px-3 py-2 text-xs leading-relaxed transition-colors",
                    pickedId === c.id
                      ? "border-accent bg-accent/10"
                      : "border-border bg-background hover:border-accent/60"
                  )}
                >
                  {c.text}
                </button>
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
              <span className="text-xs text-muted-foreground">
                {correctCount === CARDS.length
                  ? "🎉 SCQA 顺序完全正确"
                  : "再想想：哪句在建立共识，哪句在制造张力？"}
              </span>
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
