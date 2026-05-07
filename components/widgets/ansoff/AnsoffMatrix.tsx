interface QuadProps {
  zh: string
  en: string
  desc: string
  risk: number
  bg: string
  border: string
  text: string
}

const QUADS: Record<string, QuadProps> = {
  penetration: {
    zh: "市场渗透",
    en: "Market Penetration",
    desc: "现有产品 → 现有市场。促销、提份额、增加使用频次。",
    risk: 1,
    bg: "from-emerald-50/80 to-emerald-100/40 dark:from-emerald-950/30 dark:to-emerald-950/10",
    border: "border-emerald-300/70",
    text: "text-emerald-700 dark:text-emerald-400",
  },
  marketDev: {
    zh: "市场开发",
    en: "Market Development",
    desc: "现有产品 → 新市场。新地区、新人群、新渠道。",
    risk: 2,
    bg: "from-amber-50/80 to-amber-100/40 dark:from-amber-950/30 dark:to-amber-950/10",
    border: "border-amber-300/70",
    text: "text-amber-700 dark:text-amber-400",
  },
  productDev: {
    zh: "产品开发",
    en: "Product Development",
    desc: "新产品 → 现有市场。产品线扩展、品类创新。",
    risk: 3,
    bg: "from-orange-50/80 to-orange-100/40 dark:from-orange-950/30 dark:to-orange-950/10",
    border: "border-orange-300/70",
    text: "text-orange-700 dark:text-orange-400",
  },
  diversification: {
    zh: "多元化",
    en: "Diversification",
    desc: "新产品 → 新市场。最激进，常通过并购实现。",
    risk: 4,
    bg: "from-rose-50/80 to-rose-100/40 dark:from-rose-950/30 dark:to-rose-950/10",
    border: "border-rose-300/70",
    text: "text-rose-700 dark:text-rose-400",
  },
}

function Cell({ q }: { q: QuadProps }) {
  return (
    <div
      className={`rounded-md border bg-gradient-to-br ${q.bg} ${q.border} p-4 min-h-[150px]`}
    >
      <div className="flex items-baseline justify-between mb-2">
        <div>
          <div className={`font-serif font-bold text-base ${q.text}`}>
            {q.zh}
          </div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {q.en}
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className={`inline-block h-3 w-1.5 rounded-sm ${i < q.risk ? q.text.replace("text-", "bg-") : "bg-muted"}`}
            />
          ))}
        </div>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">{q.desc}</p>
      <div className="mt-3 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        风险 · {["", "低", "中", "中-高", "高"][q.risk]}
      </div>
    </div>
  )
}

export function AnsoffMatrix() {
  return (
    <div className="rounded-lg border border-border bg-card p-3 sm:p-5">
      <div className="grid grid-cols-[28px_1fr_1fr] grid-rows-[28px_1fr_1fr] gap-2">
        <div />
        <div className="text-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground py-1">
          现有产品 / Existing
        </div>
        <div className="text-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground py-1">
          新产品 / New
        </div>

        <div
          className="flex items-center justify-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          现有市场 / Existing
        </div>
        <Cell q={QUADS.penetration} />
        <Cell q={QUADS.productDev} />

        <div
          className="flex items-center justify-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          新市场 / New
        </div>
        <Cell q={QUADS.marketDev} />
        <Cell q={QUADS.diversification} />
      </div>
    </div>
  )
}
