"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, X, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

type Verdict = "mece" | "overlap" | "missing" | "both"

interface Item {
  id: string
  classification: string[]
  context: string
  correct: Verdict
  explain: string
}

const ITEMS: Item[] = [
  {
    id: "1",
    context: "“产品成本”可分为：",
    classification: ["固定成本", "变动成本"],
    correct: "mece",
    explain: "经典 MECE 分解，无交集（成本要么不随销量变化要么变化）也无遗漏。",
  },
  {
    id: "2",
    context: "“销售区域”可分为：",
    classification: ["华东", "华南", "华北", "华中", "西部", "海外"],
    correct: "missing",
    explain:
      "无交集（ME ✓），但东北地区被遗漏，违反 CE。常见做法是单列东北或并入华北。",
  },
  {
    id: "3",
    context: "“客户分类”可分为：",
    classification: ["大企业", "中小企业", "国企", "外资", "高净值客户"],
    correct: "both",
    explain:
      "国企/外资可同时是大企业（违反 ME），且“高净值”是 To C 维度——混合规模 / 所有制 / 收入三个维度，既有交集也有遗漏。",
  },
  {
    id: "4",
    context: "“员工类型”可分为：",
    classification: ["全职", "兼职", "外包"],
    correct: "mece",
    explain: "用工形式单维度切分，无交集也覆盖大多数情况，是合理的 MECE。",
  },
  {
    id: "5",
    context: "“消费者”可分为：",
    classification: ["新客户", "老客户", "VIP 客户"],
    correct: "overlap",
    explain:
      "VIP 既可能是新客户也可能是老客户（违反 ME）。三类总体覆盖了所有客户（CE 没问题），但分类维度混合了“关系阶段 + 价值层级”。",
  },
]

const OPTIONS: { key: Verdict; label: string; sub: string }[] = [
  { key: "mece", label: "MECE 正确", sub: "无交集 + 无遗漏" },
  { key: "overlap", label: "违反 ME", sub: "类别有交集" },
  { key: "missing", label: "违反 CE", sub: "有遗漏未覆盖" },
  { key: "both", label: "ME / CE 都违反", sub: "维度混合" },
]

export function MeceJudgeQuiz() {
  const [answers, setAnswers] = useState<Record<string, Verdict>>({})
  const [submitted, setSubmitted] = useState(false)
  const allAnswered = ITEMS.every((i) => answers[i.id])
  const correct = ITEMS.filter((i) => answers[i.id] === i.correct).length

  const reset = () => {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        判断下面 5 个分类方案是否 MECE。每题选一个最贴近的诊断。
      </p>

      <ol className="space-y-4">
        {ITEMS.map((item, idx) => {
          const userAns = answers[item.id]
          const isCorrect = userAns === item.correct
          return (
            <li key={item.id} className="rounded-lg border border-border bg-card p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1">
                第 {idx + 1} 题
              </div>
              <p className="text-sm mb-2">{item.context}</p>
              <ul className="flex flex-wrap gap-1.5 mb-3">
                {item.classification.map((c) => (
                  <li
                    key={c}
                    className="rounded border border-border bg-secondary/40 px-2 py-1 text-xs"
                  >
                    {c}
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-2 gap-2">
                {OPTIONS.map((o) => {
                  const sel = userAns === o.key
                  const showCorrect = submitted && o.key === item.correct
                  const showWrong = submitted && sel && !isCorrect
                  return (
                    <button
                      key={o.key}
                      onClick={() =>
                        !submitted &&
                        setAnswers((p) => ({ ...p, [item.id]: o.key }))
                      }
                      className={cn(
                        "rounded border px-2.5 py-1.5 text-xs text-left transition-colors flex items-center gap-2",
                        sel && !submitted && "border-accent bg-accent/10",
                        !sel && !submitted && "border-border hover:border-accent/50",
                        showCorrect &&
                          "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
                        showWrong && "border-rose-500 bg-rose-50 dark:bg-rose-950/30"
                      )}
                    >
                      <span className="font-medium">{o.label}</span>
                      <span className="text-[10px] text-muted-foreground">{o.sub}</span>
                      {showCorrect && <Check className="h-3 w-3 ml-auto" />}
                      {showWrong && <X className="h-3 w-3 ml-auto" />}
                    </button>
                  )
                })}
              </div>
              {submitted && (
                <div
                  className={cn(
                    "mt-3 rounded border-l-2 px-3 py-2 text-xs leading-relaxed",
                    isCorrect
                      ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/20"
                      : "border-rose-500 bg-rose-50/60 dark:bg-rose-950/20"
                  )}
                >
                  {item.explain}
                </div>
              )}
            </li>
          )
        })}
      </ol>

      <div className="flex items-center gap-3 flex-wrap">
        {!submitted ? (
          <Button onClick={() => setSubmitted(true)} disabled={!allAnswered}>
            提交答案
          </Button>
        ) : (
          <>
            <div className="flex-1 text-sm flex items-baseline gap-2">
              <span className="font-serif text-xl font-bold tabular-nums">
                {correct}/{ITEMS.length}
              </span>
              <span className="text-xs text-muted-foreground">分类判断正确</span>
            </div>
            <Button variant="outline" onClick={reset}>
              <RotateCcw className="mr-2 h-3.5 w-3.5" />
              再来一组
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
