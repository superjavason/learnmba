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
    title: "开头：交代情境与任务",
    scenario:
      "面试官问「讲一次你解决团队冲突的经历」。开头怎么说最符合 STAR？",
    options: [
      {
        id: "a",
        label:
          "「我先讲讲那家公司的历史，它 2015 年成立，业务横跨三条线……」用三分钟铺背景。",
        correct: false,
        reason: "情境过长是 STAR 最常见的坑——背景要 1-2 句带过，把时间留给行动和结果。",
      },
      {
        id: "b",
        label:
          "「App 改版临近发版时，设计和开发就『是否保留旧导航』僵持，进度卡了一周（S）。作为项目负责人，我要在不延期下让双方达成有依据的决定（T）。」",
        correct: true,
        reason: "情境与任务各一两句，简洁清晰，并点明了「我的责任」，为后面的行动铺好台。",
      },
      {
        id: "c",
        label: "「反正就是有点矛盾，我来说说我怎么牛的吧。」",
        correct: false,
        reason: "没有交代具体情境和任务，听者无法判断挑战的难度与你的责任。",
      },
    ],
  },
  {
    n: 2,
    title: "主体：描述行动",
    scenario: "接下来描述你做了什么。哪种说法最符合 STAR 对「行动」的要求？",
    options: [
      {
        id: "a",
        label: "「后来我们团队一起想了想办法，最后就解决了。」",
        correct: false,
        reason: "全程「我们」+ 含糊，听不出你个人到底做了什么——行动部分必须凸显「我」的贡献。",
      },
      {
        id: "b",
        label:
          "「我把立场之争转成数据问题：我组织了 80 人灰度 A/B 测试，定义『7 日留存』为唯一判据，并分别和设计、开发一对一确认大家都认这个标准。」",
        correct: true,
        reason: "用「我」讲清关键动作与思路，展现了个人的方法论和推动力——这是面试官最想听的。",
      },
      {
        id: "c",
        label: "「我每天开会催进度，催了一周。」",
        correct: false,
        reason: "只是重复行为、没有解决冲突的方法与思考，体现不出能力。",
      },
    ],
  },
  {
    n: 3,
    title: "收尾：陈述结果",
    scenario: "最后怎么收尾最有说服力？",
    options: [
      {
        id: "a",
        label: "「结果挺好的，大家都挺满意。」",
        correct: false,
        reason: "结果空泛、无数据，可信度大打折扣——STAR 的结果一定要可量化。",
      },
      {
        id: "b",
        label:
          "「测试显示新导航 7 日留存高 4.2 个百分点，双方当场接受，版本按期上线，整体留存提升约 3%。这件事让我学会用客观标准取代立场之争。」",
        correct: true,
        reason: "用具体数字说明成果与影响，并补一句个人收获，故事完整闭环——标准的 R。",
      },
      {
        id: "c",
        label: "「这个项目还有很多别的成果，我再讲十分钟。」",
        correct: false,
        reason: "偏离主题、拖沓。一个 STAR 故事聚焦一条主线、一个量化结果即可。",
      },
    ],
  },
]

export function StarCase() {
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
        面试中要用 STAR 讲一次「化解团队冲突」的经历。分三步选出最符合 STAR 的说法。
      </p>

      <div className="flex items-center gap-2">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex-1 h-1.5 rounded-full transition-colors",
              i < step ? "bg-emerald-500" : i === step ? "bg-accent" : "bg-border"
            )}
          />
        ))}
      </div>

      <div className="rounded-lg border border-border bg-card p-5">
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-1">
          第 {step + 1} 步 / 共 {STEPS.length} 步
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
                  {score === STEPS.length ? "🎉 一个完整有力的 STAR 故事" : "再体会 S/T 简短、A 凸显个人、R 用数据"}
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
