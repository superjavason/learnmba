"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, X, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

type Strategy = "penetration" | "marketDev" | "productDev" | "diversification"

const STRATS: {
  key: Strategy
  zh: string
  en: string
  risk: number // 1-4
  color: string
  bg: string
  border: string
}[] = [
  {
    key: "penetration",
    zh: "市场渗透",
    en: "Market Penetration",
    risk: 1,
    color: "text-emerald-700 dark:text-emerald-400",
    bg: "bg-emerald-50/70 dark:bg-emerald-950/25",
    border: "border-emerald-300/70",
  },
  {
    key: "marketDev",
    zh: "市场开发",
    en: "Market Development",
    risk: 2,
    color: "text-amber-700 dark:text-amber-400",
    bg: "bg-amber-50/70 dark:bg-amber-950/25",
    border: "border-amber-300/70",
  },
  {
    key: "productDev",
    zh: "产品开发",
    en: "Product Development",
    risk: 3,
    color: "text-orange-700 dark:text-orange-400",
    bg: "bg-orange-50/70 dark:bg-orange-950/25",
    border: "border-orange-300/70",
  },
  {
    key: "diversification",
    zh: "多元化",
    en: "Diversification",
    risk: 4,
    color: "text-rose-700 dark:text-rose-400",
    bg: "bg-rose-50/70 dark:bg-rose-950/25",
    border: "border-rose-300/70",
  },
]

interface Scenario {
  id: string
  text: string
  correct: Strategy
  explain: string
}

const SCENARIOS: Scenario[] = [
  {
    id: "1",
    text: "瑞幸推出会员日 9.9 元活动，提升老用户购买频次。",
    correct: "penetration",
    explain: "现有产品 + 现有市场 + 增加使用频次 = 市场渗透。",
  },
  {
    id: "2",
    text: "蜜雪冰城进入越南、印尼、马来西亚开店。",
    correct: "marketDev",
    explain: "现有产品（茶饮）+ 新地理市场 = 市场开发。",
  },
  {
    id: "3",
    text: "海底捞向自有 1 亿会员推出预制菜“开饭了”。",
    correct: "productDev",
    explain: "新产品（预制菜）+ 现有市场（火锅会员）= 产品开发。",
  },
  {
    id: "4",
    text: "格力做新能源汽车（银隆）。",
    correct: "diversification",
    explain: "新产品（汽车）+ 新市场（汽车买家）= 多元化，风险最高。",
  },
  {
    id: "5",
    text: "Netflix 把订阅模式从美国扩展到 190 个国家。",
    correct: "marketDev",
    explain: "现有产品（流媒体）+ 新地理市场 = 市场开发。",
  },
  {
    id: "6",
    text: "字节做剪映（向抖音用户推视频剪辑工具）。",
    correct: "productDev",
    explain: "新产品（剪映）+ 现有市场（抖音创作者）= 产品开发。",
  },
]

export function AnsoffScenarioQuiz() {
  const [answers, setAnswers] = useState<Record<string, Strategy>>({})
  const [submitted, setSubmitted] = useState(false)

  const choose = (id: string, s: Strategy) => {
    if (submitted) return
    setAnswers((p) => ({ ...p, [id]: s }))
  }
  const allAnswered = SCENARIOS.every((s) => answers[s.id])

  const correctCount = SCENARIOS.filter(
    (s) => answers[s.id] === s.correct
  ).length

  const reset = () => {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        给下面 6 个场景判断属于哪种增长战略，完成后看正确答案与风险等级。
      </p>

      <ol className="space-y-4">
        {SCENARIOS.map((s, idx) => {
          const userAns = answers[s.id]
          const isCorrect = userAns === s.correct
          return (
            <li
              key={s.id}
              className="rounded-lg border border-border bg-card p-4"
            >
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-serif font-bold text-accent">
                  {idx + 1}.
                </span>
                <p className="text-sm leading-relaxed">{s.text}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {STRATS.map((st) => {
                  const sel = userAns === st.key
                  const showCorrect = submitted && st.key === s.correct
                  const showWrong = submitted && sel && !isCorrect
                  return (
                    <button
                      key={st.key}
                      onClick={() => choose(s.id, st.key)}
                      className={cn(
                        "rounded border px-3 py-2 text-xs text-left transition-colors flex items-center gap-2",
                        sel && !submitted && "border-accent bg-accent/10",
                        !sel && !submitted && "border-border hover:border-accent/50",
                        showCorrect &&
                          "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300",
                        showWrong &&
                          "border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-300"
                      )}
                    >
                      <span className={cn("font-medium", st.color)}>{st.zh}</span>
                      <span className="text-[10px] text-muted-foreground italic">
                        {st.en}
                      </span>
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
                      ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20"
                      : "border-rose-500 bg-rose-50/50 dark:bg-rose-950/20"
                  )}
                >
                  {s.explain}
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
                {correctCount}/{SCENARIOS.length}
              </span>
              <span className="text-xs text-muted-foreground">分类正确</span>
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
