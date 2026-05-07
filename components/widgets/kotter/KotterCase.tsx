"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, X, RotateCcw, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  n: number
  title: string
  scenario: string
  options: { id: string; label: string; correct: boolean; reason: string }[]
}

const STEPS: Step[] = [
  {
    n: 1,
    title: "第 1 步：建立紧迫感",
    scenario:
      "你是 CEO，要推动公司全面数字化转型。第一次全员大会，你应该：",
    options: [
      {
        id: "a",
        label: "宣布“5 年内成为行业数字化标杆”的口号，鼓舞士气。",
        correct: false,
        reason: "口号没数据支撑，无法触动员工——典型“跳过紧迫感”错误。",
      },
      {
        id: "b",
        label: "公开内部 vs 同行的关键数据：电商占比 12% vs 同行 28%、按当前轨迹 3 年现金流转负。",
        correct: true,
        reason: "用客观数据让员工自己得出“必须变”的结论，是科特说的“真实紧迫感”。",
      },
      {
        id: "c",
        label: "强调“不变就裁员”，制造危机感。",
        correct: false,
        reason: "过度威胁 → 员工陷入自保和恐慌，反而无法推动变革。",
      },
    ],
  },
  {
    n: 2,
    title: "第 2 步：建立领导联盟",
    scenario: "组建“数字化指挥部”，你应该选哪些人？",
    options: [
      {
        id: "a",
        label: "全部由 C 级高管组成（CEO/COO/CTO/CFO）。",
        correct: false,
        reason: "缺中层与一线声音，看似权力大但执行链断裂。",
      },
      {
        id: "b",
        label: "CEO + COO + CTO + 3 位区域总裁 + 2 位明星店长 + 1 位有影响力的反对派。",
        correct: true,
        reason: "层级齐全、有中层、有反对派——这是 Kotter 强调的“真实联盟”。",
      },
      {
        id: "c",
        label: "公司投票选出最受欢迎的 10 人。",
        correct: false,
        reason: "受欢迎不等于推动力——联盟需要的是影响力 + 决策权。",
      },
    ],
  },
  {
    n: 6,
    title: "第 6 步：创造短期成就",
    scenario:
      "变革推动 6 个月后，你需要选一个“短期成就”案例对全员宣讲。哪个最合适？",
    options: [
      {
        id: "a",
        label: "选 50 家试点门店，3 个月内线上销售从 12% 升到 35%——可量化、与战略一致、有员工故事。",
        correct: true,
        reason: "好的短期成就：可见、可量化、与战略相关、有人物故事——满足 Kotter 全部三标准。",
      },
      {
        id: "b",
        label: "全公司启动 10+ 数字化项目，全部都还在进行中。",
        correct: false,
        reason: "都在“进行中”意味着没成果——只能挫伤士气。",
      },
      {
        id: "c",
        label: "公司股价上涨 5% 当作成就。",
        correct: false,
        reason: "股价波动不一定来自变革，归因模糊；也无法转化为员工“我做到了”的成就感。",
      },
    ],
  },
  {
    n: 8,
    title: "第 8 步：融入文化",
    scenario: "试点见效后，下一年最重要的动作是？",
    options: [
      {
        id: "a",
        label: "宣布数字化转型成功，团队功成身退。",
        correct: false,
        reason:
          "这是 Kotter 强调的最常见错误——过早宣布胜利。后续 1-2 年是最危险的回退期。",
      },
      {
        id: "b",
        label:
          "把数字化指标纳入所有人的 KPI；把试点经验写成公司“数字门店标准”；半年一次复盘。",
        correct: true,
        reason: "通过制度化、流程化、复盘机制把变革固化进文化——这就是 Kotter 第 8 步的本质。",
      },
      {
        id: "c",
        label: "把指挥部解散，让各业务部门自己推动。",
        correct: false,
        reason: "过早解散指挥部 → 失去推力 → 半年内退回原点。",
      },
    ],
  },
]

export function KotterCase() {
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
  const score = STEPS.filter(
    (_, i) =>
      showFeedback[i] && STEPS[i].options.find((o) => o.id === answers[i])?.correct
  ).length

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        作为某零售集团 CEO，你要推动数字化转型。在 4 个关键节点上做出科特八步式的决策。
      </p>

      <div className="flex items-center gap-2">
        {STEPS.map((_, i) => (
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
          第 {step + 1} 个决策 / 共 {STEPS.length} 个
        </div>
        <h4 className="font-serif text-lg font-bold mb-2">{current.title}</h4>
        <p className="text-sm leading-relaxed mb-4">{current.scenario}</p>

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
                  {showCorrect && <Check className="h-4 w-4 text-emerald-600 shrink-0" />}
                  {showWrong && <X className="h-4 w-4 text-destructive shrink-0" />}
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

        <div className="mt-4 flex items-center gap-3 flex-wrap">
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
                  {score === STEPS.length ? "🎉 完美执行 Kotter 八步" : "继续练习"}
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
