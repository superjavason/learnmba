import { TrendingUp, Heart, Settings, GraduationCap } from "lucide-react"

const QUADRANTS = [
  {
    key: "financial",
    icon: TrendingUp,
    title: "财务 Financial",
    question: "我们对股东的表现如何？",
    examples: ["营收增长", "ROE", "毛利率", "现金流"],
    color: "#0EA5E9",
    bg: "bg-sky-50/70 dark:bg-sky-950/25",
    border: "border-sky-300/70",
    text: "text-sky-700 dark:text-sky-300",
  },
  {
    key: "customer",
    icon: Heart,
    title: "客户 Customer",
    question: "客户如何看待我们？",
    examples: ["NPS", "留存率", "市场份额", "满意度"],
    color: "#10B981",
    bg: "bg-emerald-50/70 dark:bg-emerald-950/25",
    border: "border-emerald-300/70",
    text: "text-emerald-700 dark:text-emerald-300",
  },
  {
    key: "process",
    icon: Settings,
    title: "内部流程 Process",
    question: "我们必须擅长什么？",
    examples: ["周期时间", "良品率", "创新速度", "SOP 合规率"],
    color: "#C9A961",
    bg: "bg-amber-50/70 dark:bg-amber-950/25",
    border: "border-amber-300/70",
    text: "text-amber-700 dark:text-amber-300",
  },
  {
    key: "learning",
    icon: GraduationCap,
    title: "学习与成长 Learning",
    question: "我们能否持续创新与改进？",
    examples: ["员工留存", "培训完成率", "技能矩阵", "信息系统"],
    color: "#8B5CF6",
    bg: "bg-violet-50/70 dark:bg-violet-950/25",
    border: "border-violet-300/70",
    text: "text-violet-700 dark:text-violet-300",
  },
]

export function BalancedScorecard() {
  return (
    <div className="rounded-lg border border-border bg-card p-5 space-y-4">
      <div className="text-center">
        <div className="text-[11px] uppercase tracking-[0.2em] text-accent font-bold mb-1">
          愿景与战略 / Vision & Strategy
        </div>
        <div className="font-serif font-bold">中心：把战略转化为可执行 KPI</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative">
        {QUADRANTS.map((q) => {
          const Icon = q.icon
          return (
            <div
              key={q.key}
              className={`rounded-lg border-2 ${q.border} ${q.bg} p-4`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-background border-2 ${q.border} ${q.text}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className={`font-serif font-bold text-sm ${q.text}`}>
                    {q.title}
                  </div>
                  <div className="text-xs text-muted-foreground italic mt-0.5">
                    {q.question}
                  </div>
                </div>
              </div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
                典型 KPI
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {q.examples.map((e) => (
                  <li
                    key={e}
                    className="rounded border border-border bg-background/70 px-2 py-0.5 text-[11px]"
                  >
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      <div className="border-t border-border pt-3">
        <div className="text-xs text-muted-foreground text-center">
          <span className="font-bold text-accent">因果链：</span>
          学习与成长 → 内部流程 → 客户满意 → 财务结果
        </div>
      </div>
    </div>
  )
}
