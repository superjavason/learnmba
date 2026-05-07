"use client"

import { useState } from "react"
import type { QuizQuestion } from "@/content/types"
import { Button } from "@/components/ui/button"
import { useLearning } from "@/lib/store"
import { Check, X, ListChecks, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

export function QuizCard({
  slug,
  questions,
}: {
  slug: string
  questions: QuizQuestion[]
}) {
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [submitted, setSubmitted] = useState(false)
  const saveQuizScore = useLearning((s) => s.saveQuizScore)

  if (questions.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        本框架的测验题即将上线
      </div>
    )
  }

  const toggle = (qid: string, oid: string, multi: boolean) => {
    if (submitted) return
    setAnswers((prev) => {
      const cur = prev[qid] ?? []
      if (multi) {
        return {
          ...prev,
          [qid]: cur.includes(oid)
            ? cur.filter((x) => x !== oid)
            : [...cur, oid],
        }
      }
      return { ...prev, [qid]: [oid] }
    })
  }

  const submit = () => {
    let correct = 0
    questions.forEach((q) => {
      const a = (answers[q.id] ?? []).slice().sort().join(",")
      const c = q.correct.slice().sort().join(",")
      if (a === c && a !== "") correct++
    })
    saveQuizScore(slug, correct, questions.length)
    setSubmitted(true)
  }

  const reset = () => {
    setAnswers({})
    setSubmitted(false)
  }

  const score = questions.reduce((acc, q) => {
    const a = (answers[q.id] ?? []).slice().sort().join(",")
    const c = q.correct.slice().sort().join(",")
    return acc + (a === c && a !== "" ? 1 : 0)
  }, 0)

  const allAnswered = questions.every((q) => (answers[q.id] ?? []).length > 0)
  const passed = submitted && score / questions.length >= 0.8

  return (
    <section className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-4">
        <ListChecks className="h-3.5 w-3.5" />
        知识检测 · {questions.length} 题
      </div>
      <ol className="space-y-6">
        {questions.map((q, qi) => {
          const multi = q.type === "multi"
          const userAns = answers[q.id] ?? []
          return (
            <li key={q.id} className="space-y-3">
              <p className="font-serif font-bold leading-relaxed">
                <span className="text-accent mr-2">Q{qi + 1}.</span>
                {q.prompt}
                {multi && (
                  <span className="ml-2 text-xs font-sans text-muted-foreground">
                    （多选）
                  </span>
                )}
              </p>
              <ul className="space-y-2">
                {q.options.map((o) => {
                  const selected = userAns.includes(o.id)
                  const isCorrect = q.correct.includes(o.id)
                  const showCorrect = submitted && isCorrect
                  const showWrong = submitted && selected && !isCorrect
                  return (
                    <li key={o.id}>
                      <button
                        type="button"
                        onClick={() => toggle(q.id, o.id, multi)}
                        className={cn(
                          "w-full text-left flex items-start gap-3 rounded-md border p-3 text-sm transition-colors",
                          selected &&
                            !submitted &&
                            "border-accent bg-accent/5",
                          !selected &&
                            !submitted &&
                            "border-border hover:border-accent/50",
                          showCorrect &&
                            "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/25",
                          showWrong && "border-destructive bg-destructive/5",
                          submitted && "cursor-default"
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px]",
                            selected &&
                              !submitted &&
                              "border-accent bg-accent text-accent-foreground",
                            !selected && !submitted && "border-border",
                            showCorrect &&
                              "border-emerald-600 bg-emerald-600 text-white",
                            showWrong &&
                              "border-destructive bg-destructive text-destructive-foreground"
                          )}
                        >
                          {showCorrect ? (
                            <Check className="h-3 w-3" />
                          ) : showWrong ? (
                            <X className="h-3 w-3" />
                          ) : selected ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            ""
                          )}
                        </span>
                        <span className="leading-relaxed">{o.label}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
              {submitted && (
                <div className="rounded border-l-2 border-accent bg-accent/5 p-3 text-sm leading-relaxed">
                  <span className="font-bold mr-1">解析：</span>
                  {q.explanation}
                </div>
              )}
            </li>
          )
        })}
      </ol>
      <div className="mt-6 flex items-center gap-3 flex-wrap">
        {!submitted ? (
          <Button onClick={submit} disabled={!allAnswered}>
            提交答案
          </Button>
        ) : (
          <>
            <div className="flex-1 text-sm flex items-baseline gap-3">
              <span className="font-serif text-2xl font-bold tabular-nums">
                {score}/{questions.length}
              </span>
              <span
                className={cn(
                  "text-xs",
                  passed ? "text-emerald-600" : "text-muted-foreground"
                )}
              >
                {passed ? "已通过 · 保存到学习进度" : "未达 80%，再试一次"}
              </span>
            </div>
            <Button variant="outline" onClick={reset}>
              <RotateCcw className="mr-2 h-3.5 w-3.5" />
              再练一次
            </Button>
          </>
        )}
      </div>
    </section>
  )
}
