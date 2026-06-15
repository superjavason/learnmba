"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, X, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

type Dim = "What" | "Why" | "Where" | "When" | "Who" | "How" | "HowMuch"

interface Card {
  id: string
  text: string
  correct: Dim
}

// from the「新产品体验官招募」case — scrambled
const CARDS: Card[] = [
  { id: "1", text: "招募 50 名内部员工作为新版 App 的体验官", correct: "What" },
  { id: "2", text: "在公开发布前发现致命体验问题，降低差评与返工风险", correct: "Why" },
  { id: "3", text: "线上参与：企业微信群 + 内测包", correct: "Where" },
  { id: "4", text: "报名截止 6/20，试用期 6/23–7/4，反馈会 7/5", correct: "When" },
  { id: "5", text: "市场部小李统筹，产品经理负责答疑与收集反馈", correct: "Who" },
  { id: "6", text: "扫码报名 → 发放内测包 → 按问卷模板提交反馈", correct: "How" },
  { id: "7", text: "预算 1 万元：50 份体验官礼品 + 1 次抽奖", correct: "HowMuch" },
]

const SLOTS: { key: Dim; label: string; color: string }[] = [
  { key: "What", label: "What 做什么", color: "#0EA5E9" },
  { key: "Why", label: "Why 为什么", color: "#DC2626" },
  { key: "Where", label: "Where 在哪", color: "#8B5CF6" },
  { key: "When", label: "When 何时", color: "#F97316" },
  { key: "Who", label: "Who 谁", color: "#C9A961" },
  { key: "How", label: "How 怎么做", color: "#0D9488" },
  { key: "HowMuch", label: "How much 多少", color: "#059669" },
]

export function FiveW2HMatch() {
  const [placed, setPlaced] = useState<Record<string, Dim>>({})
  const [pickedId, setPickedId] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const remaining = CARDS.filter((c) => !placed[c.id])
  const correctCount = CARDS.filter((c) => placed[c.id] === c.correct).length

  const place = (id: string, dim: Dim) => {
    if (submitted) return
    setPlaced((p) => {
      const next: Record<string, Dim> = {}
      for (const [cid, d] of Object.entries(p)) {
        if (d !== dim && cid !== id) next[cid] = d
      }
      next[id] = dim
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
        一份「新产品体验官招募」通知的 7 个要点被打乱了。先点一个要点，再点它对应的 5W2H 维度，把通知还原完整。
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {SLOTS.map((s) => {
          const card = CARDS.find((c) => placed[c.id] === s.key)
          const isCorrect = card && card.correct === s.key
          return (
            <button
              key={s.key}
              onClick={() => pickedId && place(pickedId, s.key)}
              disabled={submitted}
              className={cn(
                "text-left rounded-lg border-2 border-dashed p-2.5 min-h-[64px] transition-colors",
                pickedId && !submitted
                  ? "cursor-pointer ring-2 ring-accent/40"
                  : "cursor-default"
              )}
              style={{ borderColor: `${s.color}66`, background: `${s.color}0d` }}
            >
              <div className="font-serif font-bold text-xs mb-1">{s.label}</div>
              {card ? (
                <span
                  className={cn(
                    "flex items-start gap-1.5 text-[11px] leading-relaxed",
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
                <span className="text-[10px] text-muted-foreground/70">点此放入要点</span>
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
          <ul className="flex flex-wrap gap-2">
            {remaining.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setPickedId(c.id === pickedId ? null : c.id)}
                  className={cn(
                    "rounded border px-2.5 py-1.5 text-[11px] leading-relaxed transition-colors text-left max-w-[260px]",
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
                  ? "🎉 一份 5W2H 齐全的通知，同事看完就能行动"
                  : "想想：哪条在讲『为什么做』，哪条在讲『花多少』？"}
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
