import {
  HelpCircle,
  Target,
  MapPin,
  Clock,
  User,
  Cog,
  DollarSign,
} from "lucide-react"

const DIMS = [
  { k: "What", zh: "做什么", icon: Target, color: "#0EA5E9", q: "核心内容、对象、目标是什么？" },
  { k: "Why", zh: "为什么", icon: HelpCircle, color: "#DC2626", q: "目的、动机、必要性——最该先问" },
  { k: "Where", zh: "在哪", icon: MapPin, color: "#8B5CF6", q: "地点、场景、渠道在哪里？" },
  { k: "When", zh: "何时", icon: Clock, color: "#F97316", q: "时间、节点、截止日是什么时候？" },
  { k: "Who", zh: "谁", icon: User, color: "#C9A961", q: "责任人、参与者、对象是谁？" },
  { k: "How", zh: "怎么做", icon: Cog, color: "#0D9488", q: "方法、步骤、流程怎么实施？" },
  { k: "How much", zh: "多少", icon: DollarSign, color: "#059669", q: "成本、数量、预算是多少？" },
]

export function FiveW2HGrid() {
  return (
    <div className="rounded-lg border border-border bg-card p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif font-bold text-sm">
          5W<br />2H
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          七个问题逐项发问，既是「想清楚」的检查清单，也是「讲清楚」的表达模板。
          <span className="font-bold text-foreground"> 5 个 W + 2 个 H</span>。
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {DIMS.map((d, i) => {
          const Icon = d.icon
          const isH = d.k.startsWith("How")
          return (
            <div
              key={d.k}
              className="rounded-lg border-2 p-3 flex items-start gap-3"
              style={{ borderColor: `${d.color}55`, background: `${d.color}0d` }}
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
                style={{ background: d.color }}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif font-bold text-sm">{d.k}</span>
                  <span className="text-xs text-muted-foreground">{d.zh}</span>
                  <span
                    className="ml-auto text-[10px] font-bold rounded px-1.5 py-0.5"
                    style={{ color: d.color, background: `${d.color}1a` }}
                  >
                    {isH ? "H" : "W"}
                    {i + 1 <= 5 ? i + 1 : ""}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                  {d.q}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="rounded-lg border border-border bg-secondary/30 p-3 text-xs">
        <span className="font-bold text-foreground">先问 Why：</span>{" "}
        <span className="text-muted-foreground">
          人们常直接跳到 What/How，却忘了先问 Why。目的不清，执行再完善也可能是「正确地做错事」。
        </span>
      </div>
    </div>
  )
}
