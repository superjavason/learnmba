"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, X, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

type Role = "P1" | "R" | "E" | "P2"

interface Card {
  id: string
  text: string
  correct: Role
}

const CARDS: Card[] = [
  {
    id: "1",
    text: "我建议这两周暂停「分享海报」，把 2 名工程师调去做付费转化。",
    correct: "P1",
  },
  {
    id: "2",
    text: "因为注册→付费环节流失了 62%，这是离收入最近、ROI 最高的杠杆。",
    correct: "R",
  },
  {
    id: "3",
    text: "上季度我们只优化了支付页一步，付费率就从 8% 升到 11%，多带来约 40 万 MRR。",
    correct: "E",
  },
  {
    id: "4",
    text: "所以建议本周就把这 2 人调到转化漏斗，两周后用付费率复盘。",
    correct: "P2",
  },
]

const SLOTS: { key: Role; label: string; sub: string; color: string }[] = [
  { key: "P1", label: "P 观点", sub: "开门见山的结论", color: "#059669" },
  { key: "R", label: "R 理由", sub: "为什么这么主张", color: "#0EA5E9" },
  { key: "E", label: "E 案例", sub: "具体数据/事例", color: "#C9A961" },
  { key: "P2", label: "P 重申", sub: "回到观点 + 行动呼吁", color: "#10B981" },
]

export function PrepSort() {
  const [placed, setPlaced] = useState<Record<string, Role>>({})
  const [pickedId, setPickedId] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const remaining = CARDS.filter((c) => !placed[c.id])
  const correctCount = CARDS.filter((c) => placed[c.id] === c.correct).length

  const place = (id: string, role: Role) => {
    if (submitted) return
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
        这是一段 30 秒的周会发言，被拆成了 4 句。先点一句，再点它在 PREP 中的角色——注意「观点」在首尾各出现一次。
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
                "text-left rounded-lg border-2 border-dashed p-3 min-h-[88px] transition-colors",
                pickedId && !submitted
                  ? "cursor-pointer ring-2 ring-accent/40"
                  : "cursor-default"
              )}
              style={{ borderColor: `${s.color}66`, background: `${s.color}0d` }}
            >
              <div className="font-serif font-bold text-sm mb-1">{s.label}</div>
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
                  ? "🎉 PREP 结构完全正确"
                  : "提示：带行动呼吁的「所以建议……」是结尾的重申"}
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
