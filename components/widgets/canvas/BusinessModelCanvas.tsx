import {
  Users,
  Heart,
  Truck,
  UsersRound,
  CircleDollarSign,
  Box,
  Wrench,
  Handshake,
  Receipt,
} from "lucide-react"

interface Block {
  key: string
  zh: string
  en: string
  symbol: string
  icon: React.ComponentType<{ className?: string }>
  hint: string
  color: string
  bg: string
  border: string
  text: string
}

const BLOCKS: Record<string, Block> = {
  KP: {
    key: "KP",
    zh: "关键合作",
    en: "Key Partnerships",
    symbol: "🤝",
    icon: Handshake,
    hint: "战略联盟、供应商、共建",
    color: "#8B5CF6",
    bg: "bg-violet-50/70 dark:bg-violet-950/25",
    border: "border-violet-300/60",
    text: "text-violet-700 dark:text-violet-300",
  },
  KA: {
    key: "KA",
    zh: "关键活动",
    en: "Key Activities",
    symbol: "⚙️",
    icon: Wrench,
    hint: "生产、平台、解决方案",
    color: "#0EA5E9",
    bg: "bg-sky-50/70 dark:bg-sky-950/25",
    border: "border-sky-300/60",
    text: "text-sky-700 dark:text-sky-300",
  },
  KR: {
    key: "KR",
    zh: "关键资源",
    en: "Key Resources",
    symbol: "📦",
    icon: Box,
    hint: "物质、智力、人力、财务",
    color: "#0EA5E9",
    bg: "bg-sky-50/70 dark:bg-sky-950/25",
    border: "border-sky-300/60",
    text: "text-sky-700 dark:text-sky-300",
  },
  VP: {
    key: "VP",
    zh: "价值主张",
    en: "Value Propositions",
    symbol: "🎁",
    icon: Heart,
    hint: "客户为什么选你",
    color: "#C9A961",
    bg: "bg-amber-50/70 dark:bg-amber-950/25",
    border: "border-amber-400/70",
    text: "text-amber-800 dark:text-amber-300",
  },
  CR: {
    key: "CR",
    zh: "客户关系",
    en: "Customer Relationships",
    symbol: "💬",
    icon: UsersRound,
    hint: "自助 / 一对一 / 社群",
    color: "#10B981",
    bg: "bg-emerald-50/70 dark:bg-emerald-950/25",
    border: "border-emerald-300/60",
    text: "text-emerald-700 dark:text-emerald-300",
  },
  CH: {
    key: "CH",
    zh: "渠道",
    en: "Channels",
    symbol: "📡",
    icon: Truck,
    hint: "直营、经销、在线",
    color: "#10B981",
    bg: "bg-emerald-50/70 dark:bg-emerald-950/25",
    border: "border-emerald-300/60",
    text: "text-emerald-700 dark:text-emerald-300",
  },
  CS: {
    key: "CS",
    zh: "客户群体",
    en: "Customer Segments",
    symbol: "👥",
    icon: Users,
    hint: "大众 / 利基 / 多边",
    color: "#10B981",
    bg: "bg-emerald-50/70 dark:bg-emerald-950/25",
    border: "border-emerald-300/60",
    text: "text-emerald-700 dark:text-emerald-300",
  },
  C$: {
    key: "C$",
    zh: "成本结构",
    en: "Cost Structure",
    symbol: "💸",
    icon: Receipt,
    hint: "固定 / 变动 / 规模经济",
    color: "#DC2626",
    bg: "bg-rose-50/70 dark:bg-rose-950/25",
    border: "border-rose-300/60",
    text: "text-rose-700 dark:text-rose-300",
  },
  R$: {
    key: "R$",
    zh: "收入流",
    en: "Revenue Streams",
    symbol: "💰",
    icon: CircleDollarSign,
    hint: "销售 / 订阅 / 抽成 / 广告",
    color: "#16A34A",
    bg: "bg-emerald-50/70 dark:bg-emerald-950/25",
    border: "border-emerald-400/70",
    text: "text-emerald-700 dark:text-emerald-300",
  },
}

function Cell({
  block,
  className = "",
}: {
  block: Block
  className?: string
}) {
  const Icon = block.icon
  return (
    <div className={`rounded-md border ${block.border} ${block.bg} p-3 ${className}`}>
      <div className="flex items-baseline gap-1.5 mb-1">
        <Icon className={`h-3.5 w-3.5 ${block.text} shrink-0`} />
        <span className={`font-serif font-bold text-xs ${block.text}`}>
          {block.zh}
        </span>
        <span className="text-[9px] text-muted-foreground ml-auto tabular-nums">
          {block.key}
        </span>
      </div>
      <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground mb-1">
        {block.en}
      </div>
      <p className="text-[11px] text-muted-foreground leading-relaxed">
        {block.hint}
      </p>
    </div>
  )
}

export function BusinessModelCanvas() {
  return (
    <div className="rounded-lg border border-border bg-card p-3 sm:p-4 overflow-x-auto">
      <div className="grid grid-cols-5 grid-rows-[auto_auto] gap-2 min-w-[680px]">
        {/* Row 1: KP, KA + KR (stacked), VP (tall), CR + CH (stacked), CS */}
        <Cell block={BLOCKS.KP} className="row-span-2" />
        <div className="grid grid-rows-2 gap-2">
          <Cell block={BLOCKS.KA} />
          <Cell block={BLOCKS.KR} />
        </div>
        <Cell block={BLOCKS.VP} className="row-span-2" />
        <div className="grid grid-rows-2 gap-2">
          <Cell block={BLOCKS.CR} />
          <Cell block={BLOCKS.CH} />
        </div>
        <Cell block={BLOCKS.CS} className="row-span-2" />
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2 min-w-[680px]">
        <Cell block={BLOCKS["C$"]} />
        <Cell block={BLOCKS["R$"]} />
      </div>

      <div className="mt-3 text-xs text-muted-foreground text-center">
        左侧（蓝/紫）= 后台运营 · 中央（金）= 价值主张 · 右侧（绿）= 客户与收入 · 底部 = 成本与收入对照
      </div>
    </div>
  )
}

export { BLOCKS }
