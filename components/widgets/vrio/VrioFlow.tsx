"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, X, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

const QUESTIONS = [
  {
    key: "V",
    label: "有价值 Valuable",
    question: "这项资源能帮你利用机会或抵御威胁、创造经济价值吗？",
  },
  {
    key: "R",
    label: "稀缺 Rare",
    question: "在你的行业里，是少数公司才拥有这项资源吗？",
  },
  {
    key: "I",
    label: "难以模仿 Inimitable",
    question:
      "竞争对手要复制这项资源会面临极高的成本或时间障碍吗？",
  },
  {
    key: "O",
    label: "组织化 Organized",
    question:
      "你的公司有适合的流程、文化、激励来真正利用这项资源吗？",
  },
] as const

type Answer = "yes" | "no" | null
type Answers = Record<"V" | "R" | "I" | "O", Answer>

interface ResourceCase {
  name: string
  hint: string
  answers: Answers
}

const PRESETS: ResourceCase[] = [
  {
    name: "可口可乐秘方",
    hint: "百年专利+保密",
    answers: { V: "yes", R: "yes", I: "yes", O: "yes" },
  },
  {
    name: "调用 GPT-4 API",
    hint: "通用大模型能力",
    answers: { V: "yes", R: "no", I: "no", O: "yes" },
  },
  {
    name: "重金购买的高端设备",
    hint: "竞争对手也能买",
    answers: { V: "yes", R: "no", I: "no", O: "yes" },
  },
  {
    name: "新药专利+弱商业化",
    hint: "好资源用不出来",
    answers: { V: "yes", R: "yes", I: "yes", O: "no" },
  },
]

function evaluate(a: Answers): {
  tier: string
  color: string
  explanation: string
} {
  if (a.V === "no")
    return {
      tier: "竞争劣势 Disadvantage",
      color:
        "text-rose-700 bg-rose-50 dark:text-rose-300 dark:bg-rose-950/30 border-rose-300/70",
      explanation:
        "资源没有价值，反而消耗成本——重新审视是否值得保留。",
    }
  if (a.R === "no")
    return {
      tier: "竞争均势 Parity",
      color:
        "text-slate-700 bg-slate-50 dark:text-slate-200 dark:bg-slate-900/40 border-slate-300/70",
      explanation:
        "有价值但不稀缺——可以维持业务正常运转，但无法形成差异化。",
    }
  if (a.I === "no")
    return {
      tier: "暂时竞争优势 Temporary",
      color:
        "text-amber-700 bg-amber-50 dark:text-amber-300 dark:bg-amber-950/30 border-amber-300/70",
      explanation:
        "短期能赚到钱，但对手很快会复制——抓紧把暂时优势转化为别的护城河。",
    }
  if (a.O === "no")
    return {
      tier: "暂时竞争优势 Temporary",
      color:
        "text-amber-700 bg-amber-50 dark:text-amber-300 dark:bg-amber-950/30 border-amber-300/70",
      explanation:
        "好资源但组织没用好——立刻补强组织能力（流程、文化、激励），否则浪费。",
    }
  return {
    tier: "持续竞争优势 Sustained",
    color:
      "text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-950/30 border-emerald-400/70",
    explanation:
      "四问全是——这是真正的护城河。但仍需动态监控，今天的护城河明天可能贬值。",
  }
}

export function VrioFlow() {
  const [answers, setAnswers] = useState<Answers>({
    V: null,
    R: null,
    I: null,
    O: null,
  })
  const [resourceName, setResourceName] = useState("")

  const setAt = (k: keyof Answers, v: Answer) =>
    setAnswers((p) => ({ ...p, [k]: v }))

  const reset = () => {
    setAnswers({ V: null, R: null, I: null, O: null })
    setResourceName("")
  }

  const apply = (p: ResourceCase) => {
    setResourceName(p.name)
    setAnswers(p.answers)
  }

  // determine when result is decided (any "no" or all "yes")
  const decisive = (() => {
    if (answers.V === "no") return true
    if (answers.V === "yes" && answers.R === "no") return true
    if (answers.V === "yes" && answers.R === "yes" && answers.I === "no")
      return true
    if (
      answers.V === "yes" &&
      answers.R === "yes" &&
      answers.I === "yes" &&
      answers.O !== null
    )
      return true
    return false
  })()

  const result = decisive ? evaluate(answers) : null

  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-medium block mb-2">
          想评估的资源/能力
        </label>
        <input
          type="text"
          value={resourceName}
          onChange={(e) => setResourceName(e.target.value)}
          placeholder="例：我们公司的客户数据资产"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
        />
        <div className="mt-2 flex flex-wrap gap-2 items-baseline">
          <span className="text-xs text-muted-foreground">或试试预设：</span>
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => apply(p)}
              className="text-xs underline-offset-4 hover:underline text-accent"
              title={p.hint}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <ol className="space-y-1">
          {QUESTIONS.map((q, i) => {
            const k = q.key as keyof Answers
            const v = answers[k]
            const prevKeys = QUESTIONS.slice(0, i).map(
              (x) => x.key as keyof Answers
            )
            const prevAllYes = prevKeys.every((kk) => answers[kk] === "yes")
            const blocked = i > 0 && !prevAllYes
            const isLast = i === QUESTIONS.length - 1
            return (
              <li key={q.key} className="relative">
                {!isLast && (
                  <div
                    className={cn(
                      "absolute left-[18px] top-9 bottom-0 w-px",
                      v === "yes" && !blocked
                        ? "bg-emerald-400"
                        : "bg-border"
                    )}
                  />
                )}
                <div className="flex items-start gap-3 py-3">
                  <div
                    className={cn(
                      "z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-serif font-bold border",
                      v === "yes" &&
                        "bg-emerald-500 text-white border-emerald-500",
                      v === "no" &&
                        "bg-rose-500 text-white border-rose-500",
                      v === null &&
                        !blocked &&
                        "border-border bg-background text-foreground",
                      blocked &&
                        "border-border bg-muted text-muted-foreground/50"
                    )}
                  >
                    {q.key}
                  </div>
                  <div className="flex-1 space-y-2 pt-1">
                    <div>
                      <div className="font-serif font-bold text-sm">
                        {q.label}
                      </div>
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        {q.question}
                      </div>
                    </div>
                    {!blocked && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setAt(k, "yes")}
                          className={cn(
                            "rounded border px-3 py-1 text-xs flex items-center gap-1 transition-colors",
                            v === "yes"
                              ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                              : "border-border hover:border-emerald-400"
                          )}
                        >
                          <Check className="h-3 w-3" /> 是
                        </button>
                        <button
                          onClick={() => setAt(k, "no")}
                          className={cn(
                            "rounded border px-3 py-1 text-xs flex items-center gap-1 transition-colors",
                            v === "no"
                              ? "border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"
                              : "border-border hover:border-rose-400"
                          )}
                        >
                          <X className="h-3 w-3" /> 否
                        </button>
                      </div>
                    )}
                    {blocked && (
                      <div className="text-xs text-muted-foreground italic">
                        前一问答“否”已得出结论 — 此问无需评估
                      </div>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      {result && (
        <div className={cn("rounded-lg border-2 p-5", result.color)}>
          <div className="text-[11px] uppercase tracking-[0.18em] opacity-70 mb-1">
            评估结论
          </div>
          <div className="font-serif text-2xl font-bold mb-2">{result.tier}</div>
          <p className="text-sm leading-relaxed">{result.explanation}</p>
          {resourceName && (
            <div className="mt-3 text-xs italic opacity-80">
              针对资源：{resourceName}
            </div>
          )}
          <Button variant="outline" size="sm" onClick={reset} className="mt-4">
            <RotateCcw className="mr-2 h-3 w-3" />
            评估另一项资源
          </Button>
        </div>
      )}
    </div>
  )
}
