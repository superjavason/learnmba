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
    title: "1. 共情阶段",
    scenario:
      "你要为老年人设计一款手机 App。怎么开始“共情”最有效？",
    options: [
      {
        id: "a",
        label: "看市场上的同类产品分析报告 + 调研问卷数据。",
        correct: false,
        reason: "数据 + 报告 ≠ 共情。老人填问卷时往往“客气地说很好”——只能听到表层。",
      },
      {
        id: "b",
        label: "去 30 户老人家里跟随观察 1 天 + 深度一对一访谈。",
        correct: true,
        reason: "亲身观察 + 访谈是共情的金标准——能看到老人“说不出但真实存在”的痛点（如怕骗、怕点错）。",
      },
      {
        id: "c",
        label: "找产品经理团队脑暴 1 小时“老人会想要什么”。",
        correct: false,
        reason: "团队脑暴是“构思”阶段做的事——共情必须接触真实用户。",
      },
    ],
  },
  {
    n: 2,
    title: "2. 定义阶段",
    scenario:
      "共情后你发现老人“不是看不清，而是怕点错丢钱”。哪个 POV 陈述最好？",
    options: [
      {
        id: "a",
        label: "我们要给老年人提供更好的手机 App 体验。",
        correct: false,
        reason: "太宽泛——“更好”意味着没方向。POV 必须聚焦到具体用户 + 需求 + 洞察。",
      },
      {
        id: "b",
        label:
          "60-75 岁退休用户（用户）+ 需要在子女不在场时安全完成日常操作（需求）+ 因怕“点错丢钱”而焦虑（洞察）。",
        correct: true,
        reason: "完整 POV：用户 + 需求 + 洞察三要素齐备，能直接驱动构思。",
      },
      {
        id: "c",
        label: "我们要做一个字大、按钮简单、防骗功能强的老年版。",
        correct: false,
        reason: "这是“解决方案”不是 POV。POV 应该描述问题，不该规定方案。",
      },
    ],
  },
  {
    n: 3,
    title: "3. 构思阶段",
    scenario: "针对 POV，你召集设计 + 工程 + 运营头脑风暴。最佳做法？",
    options: [
      {
        id: "a",
        label: "每人都先想 5 个想法，再一起讨论筛选最可行的 2-3 个。",
        correct: true,
        reason: "“质以量胜”——先广撒网（30+ 想法）再筛选。结合“先发散再收敛”的设计思维标准。",
      },
      {
        id: "b",
        label: "团队主管直接拍板 2-3 个方向，避免浪费时间。",
        correct: false,
        reason: "扼杀创新——构思阶段必须先发散，主管拍板等于跳过整个阶段。",
      },
      {
        id: "c",
        label: "脑暴时立即评判每个想法，淘汰不可行的。",
        correct: false,
        reason: "“先评判”会让人不敢提想法——构思阶段的金科玉律是“延迟评判”。",
      },
    ],
  },
  {
    n: 4,
    title: "4. 原型阶段",
    scenario: "选了“家人远程帮帮按钮”这个想法，怎么做原型？",
    options: [
      {
        id: "a",
        label: "完整开发出后端 + App，再上线小范围测试。",
        correct: false,
        reason: "代价太高 —— 原型阶段就是要“最低成本快速验证”。完整开发 ≈ 跳过原型阶段。",
      },
      {
        id: "b",
        label: "Figma 做交互式低保真原型 + 模拟员工“帮帮”流程（一个人扮演子女）。",
        correct: true,
        reason: "1-2 天能做出来 + 真实老人能体验——这就是原型阶段的价值。",
      },
      {
        id: "c",
        label: "写一份 30 页的 PRD 给老人看。",
        correct: false,
        reason: "原型必须“能让用户体验”——文档不是原型。",
      },
    ],
  },
  {
    n: 5,
    title: "5. 测试阶段",
    scenario:
      "原型让 5 位老人试用后，3 人喜欢“反悔确认”，2 人觉得“声纹身份”太复杂。下一步？",
    options: [
      {
        id: "a",
        label: "认为反馈不一致，直接把两个功能都开发出来交给市场判断。",
        correct: false,
        reason: "5 个用户中有 2 个觉得难用 = 40% 阻力——直接上线极可能失败。设计思维要求基于反馈迭代。",
      },
      {
        id: "b",
        label:
          "保留“反悔确认”，砍掉“声纹身份”，回到第 3 步（构思）想其他验证身份的方式（如家人远程一键确认）。",
        correct: true,
        reason: "这正是设计思维的迭代精髓——根据测试反馈回到正确的步骤重做，而不是死磕原方案。",
      },
      {
        id: "c",
        label: "再多找 50 个用户测试，让数据决定。",
        correct: false,
        reason: "5 个用户已经能识别趋势——再扩大样本浪费时间。设计思维提倡“少量用户、快速迭代”。",
      },
    ],
  },
]

export function DesignThinkingCase() {
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
        作为产品经理，给“老年人手机难用”这个模糊问题，走完设计思维 5 步。每步选最贴近“以用户为中心、迭代验证”原则的做法。
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
                  {score === STEPS.length
                    ? "🎉 完美执行设计思维 5 步"
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
