"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, X, RotateCcw, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  n: number
  title: string
  prompt: string
  options: { id: string; label: string; correct: boolean; reason: string }[]
}

const STEPS: Step[] = [
  {
    n: 1,
    title: "形成假设",
    prompt:
      "某连锁咖啡品牌全国销量下滑 12%。基于初步访谈，下列哪组初始假设最有质量？",
    options: [
      {
        id: "a",
        label: "假设可能受到“多种因素”综合影响。",
        correct: false,
        reason: "假设过于模糊，无法证伪——好的假设应该具体、可证伪。",
      },
      {
        id: "b",
        label:
          "H1：竞品压力 H2：产品创新乏力 H3：城市分化 H4：价格敏感用户流失。",
        correct: true,
        reason: "并列 4 个具体可证伪的假设，能用最小数据集快速排查。",
      },
      {
        id: "c",
        label: "假设是公司内部管理混乱导致的。",
        correct: false,
        reason: "单一假设、过于抽象，且不基于业务事实。",
      },
    ],
  },
  {
    n: 2,
    title: "设计分析",
    prompt: "假设“H1：竞品压力”需要怎样的最小数据集来验证？",
    options: [
      {
        id: "a",
        label: "调取 12 个月每家门店周边 5 公里内竞品门店数与自家销量。",
        correct: true,
        reason: "聚焦验证：竞品密度增加是否与销量下滑相关——可证伪。",
      },
      {
        id: "b",
        label: "全国 1000 家门店所有 SKU 三年完整销售明细。",
        correct: false,
        reason: "数据范围远超验证需要，浪费时间——这是典型“穷举法”陷阱。",
      },
      {
        id: "c",
        label: "通过用户调研问“你为什么不来了”。",
        correct: false,
        reason: "用户调研有偏差且无法量化，不适合作为主要验证手段。",
      },
    ],
  },
  {
    n: 3,
    title: "收集数据",
    prompt:
      "数据显示：3 公里内有竞品门店的店铺销量平均下滑 25%，无竞品的店铺持平。该数据：",
    options: [
      {
        id: "a",
        label: "强支持 H1，竞品压力是主要原因。",
        correct: true,
        reason: "数据有显著差异（25% vs 0%），且差异方向与假设一致。",
      },
      {
        id: "b",
        label: "需要更多数据再判断。",
        correct: false,
        reason:
          "假设驱动并不要求“穷尽数据”，已有数据若清晰就该形成结论。完美主义反而阻碍决策。",
      },
      {
        id: "c",
        label: "数据是相关性不是因果，无法判断。",
        correct: false,
        reason:
          "学术上严格——但商业诊断中“相关 + 业务逻辑”足以驱动决策。",
      },
    ],
  },
  {
    n: 4,
    title: "验证修正",
    prompt: "结论清晰后，下一步应该：",
    options: [
      {
        id: "a",
        label: "继续测试 H2/H3/H4 直到全部验证。",
        correct: false,
        reason:
          "其他假设也可能成立，但 H1 已是最大驱动因素，应优先深入“如何对抗竞品”而不是穷尽。",
      },
      {
        id: "b",
        label:
          "深入 H1 子假设：竞品的什么因素导致流失？产品 / 价格 / 便利性？",
        correct: true,
        reason: "顺着已验证的方向再下钻一层——这是假设驱动的“迭代”精髓。",
      },
      {
        id: "c",
        label: "立即关停所有竞品 3 公里内的门店。",
        correct: false,
        reason: "数据揭示问题但未给出解决方案，跳过设计 / 验证直接行动很危险。",
      },
    ],
  },
]

export function HypothesisCase() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showFeedback, setShowFeedback] = useState<Record<number, boolean>>({})

  const current = STEPS[step]
  const userAns = answers[step]
  const fb = showFeedback[step]
  const opt = current.options.find((o) => o.id === userAns)

  const choose = (id: string) => {
    if (fb) return
    setAnswers((p) => ({ ...p, [step]: id }))
  }
  const submit = () => setShowFeedback((p) => ({ ...p, [step]: true }))
  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1))
  const reset = () => {
    setStep(0)
    setAnswers({})
    setShowFeedback({})
  }
  const isLast = step === STEPS.length - 1
  const allDone = STEPS.every((s, i) => showFeedback[i])
  const score = STEPS.filter(
    (s, i) =>
      showFeedback[i] && s.options.find((o) => o.id === answers[i])?.correct
  ).length

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        跟着案例走一遍假设驱动法的 4 步：连锁咖啡销量下滑 12%，作为顾问该怎么诊断？
      </p>

      {/* progress */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div
            key={i}
            className={cn(
              "flex-1 h-1.5 rounded-full transition-colors",
              i < step
                ? "bg-emerald-500"
                : i === step
                  ? "bg-accent"
                  : "bg-border"
            )}
          />
        ))}
      </div>

      <div className="rounded-lg border border-border bg-card p-5">
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-1">
          第 {current.n} 步 / 共 4 步
        </div>
        <h4 className="font-serif text-lg font-bold mb-2">{current.title}</h4>
        <p className="text-sm leading-relaxed mb-4">{current.prompt}</p>

        <ul className="space-y-2">
          {current.options.map((o) => {
            const selected = userAns === o.id
            const showCorrect = fb && o.correct
            const showWrong = fb && selected && !o.correct
            return (
              <li key={o.id}>
                <button
                  onClick={() => choose(o.id)}
                  className={cn(
                    "w-full text-left flex items-start gap-3 rounded-md border p-3 text-sm transition-colors",
                    selected && !fb && "border-accent bg-accent/5",
                    !selected && !fb && "border-border hover:border-accent/50",
                    showCorrect && "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
                    showWrong && "border-rose-500 bg-rose-50 dark:bg-rose-950/30",
                    fb && "cursor-default"
                  )}
                >
                  <span className="leading-relaxed flex-1">{o.label}</span>
                  {showCorrect && (
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                  )}
                  {showWrong && (
                    <X className="h-4 w-4 text-destructive shrink-0" />
                  )}
                </button>
              </li>
            )
          })}
        </ul>

        {fb && opt && (
          <div
            className={cn(
              "mt-4 rounded border-l-2 px-3 py-2 text-sm leading-relaxed",
              opt.correct
                ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/20"
                : "border-rose-500 bg-rose-50/60 dark:bg-rose-950/20"
            )}
          >
            <span className="font-bold mr-1">解析：</span>
            {opt.reason}
          </div>
        )}

        <div className="mt-4 flex items-center gap-3">
          {!fb && (
            <Button onClick={submit} disabled={!userAns}>
              提交
            </Button>
          )}
          {fb && !isLast && (
            <Button onClick={next}>
              下一步 <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Button>
          )}
          {fb && isLast && (
            <>
              <div className="flex-1 text-sm flex items-baseline gap-2">
                <span className="font-serif text-xl font-bold tabular-nums">
                  {score}/{STEPS.length}
                </span>
                <span className="text-xs text-muted-foreground">
                  {allDone && score === STEPS.length
                    ? "🎉 完美执行假设驱动法"
                    : "继续练习"}
                </span>
              </div>
              <Button variant="outline" onClick={reset}>
                <RotateCcw className="mr-2 h-3.5 w-3.5" />
                重新走一遍
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
