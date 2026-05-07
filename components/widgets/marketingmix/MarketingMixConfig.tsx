"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, X, RotateCcw, ChevronDown } from "lucide-react"

interface POption {
  text: string
  fit: "good" | "ok" | "bad"
}

interface PConfig {
  key: "product" | "price" | "place" | "promotion"
  label: string
  options: POption[]
}

interface ProductCase {
  name: string
  description: string
  config: Record<"product" | "price" | "place" | "promotion", PConfig>
  reference: string
}

const CASES: ProductCase[] = [
  {
    name: "瑞幸咖啡",
    description: "服务高频通勤白领的中价咖啡品牌。",
    config: {
      product: {
        key: "product",
        label: "Product 产品",
        options: [
          { text: "标准化咖啡 + 频繁推新爆品（生椰拿铁等）", fit: "good" },
          { text: "高端单品咖啡，强调风味与产地", fit: "bad" },
          { text: "30+ SKU 简化菜单 + 季节限定", fit: "ok" },
        ],
      },
      price: {
        key: "price",
        label: "Price 价格",
        options: [
          { text: "9.9 元会员日 + 平均 12-15 元", fit: "good" },
          { text: "对标星巴克 35-50 元", fit: "bad" },
          { text: "5 元以下极致低价", fit: "bad" },
        ],
      },
      place: {
        key: "place",
        label: "Place 渠道",
        options: [
          { text: "写字楼底商 + App 下单自取 + 外卖", fit: "good" },
          { text: "购物中心黄金位置 + 第三空间体验", fit: "bad" },
          { text: "夜市 / 大排档铺位", fit: "bad" },
        ],
      },
      promotion: {
        key: "promotion",
        label: "Promotion 推广",
        options: [
          { text: "新人首单免费 + 推荐返券 + 联名抖音传播", fit: "good" },
          { text: "央视黄金时段品牌广告", fit: "bad" },
          { text: "电梯框架广告 + 私域社群裂变", fit: "ok" },
        ],
      },
    },
    reference:
      "瑞幸真实 4P：标准化高频上新（Product），平价（Price），高坪效写字楼+数字化分发（Place），首单免费+社交裂变（Promotion）。每个 P 都互相支撑同一个战略目标——抢咖啡刚需场景。",
  },
  {
    name: "Tesla Model Y",
    description: "中高端纯电 SUV，瞄准追求科技感的中产家庭。",
    config: {
      product: {
        key: "product",
        label: "Product 产品",
        options: [
          { text: "极简内饰 + 自研芯片 + OTA 持续升级", fit: "good" },
          { text: "豪华材质 + 多按键的传统操控", fit: "bad" },
          { text: "强调续航与基础驾驶体验，不追求科技感", fit: "ok" },
        ],
      },
      price: {
        key: "price",
        label: "Price 价格",
        options: [
          { text: "30-40 万，高于同级燃油 SUV", fit: "good" },
          { text: "70 万以上对标 BBA 旗舰", fit: "bad" },
          { text: "10 万以下走量", fit: "bad" },
        ],
      },
      place: {
        key: "place",
        label: "Place 渠道",
        options: [
          { text: "城市核心商圈直营店 + 在线下单 + 直营服务", fit: "good" },
          { text: "全国 4S 店经销商网络", fit: "bad" },
          { text: "二手车平台主销", fit: "bad" },
        ],
      },
      promotion: {
        key: "promotion",
        label: "Promotion 推广",
        options: [
          { text: "马斯克个人 IP + 用户社群 + 极少广告", fit: "good" },
          { text: "明星代言 + 央视广告轰炸", fit: "bad" },
          { text: "试驾活动 + 内容种草", fit: "ok" },
        ],
      },
    },
    reference:
      "Tesla 真实 4P：科技 / 简洁产品（Product），中高端定价（Price），直营无中间商（Place），创始人 IP + 用户口碑替代传统广告（Promotion）。",
  },
  {
    name: "海底捞",
    description: "中高端火锅连锁，靠极致服务体验出圈。",
    config: {
      product: {
        key: "product",
        label: "Product 产品",
        options: [
          { text: "标准化火锅 + 多 SKU 锅底 / 配菜", fit: "ok" },
          { text: "极致服务体验（美甲 / 等位零食 / 生日）", fit: "good" },
          { text: "强调 Chef 主厨手艺与本地食材", fit: "bad" },
        ],
      },
      price: {
        key: "price",
        label: "Price 价格",
        options: [
          { text: "人均 100-150 元中高端", fit: "good" },
          { text: "人均 30 元以下大众化", fit: "bad" },
          { text: "人均 300 元以上高端", fit: "bad" },
        ],
      },
      place: {
        key: "place",
        label: "Place 渠道",
        options: [
          { text: "购物中心高人流位置 + 外送 + 海底捞超市", fit: "good" },
          { text: "街边小店 + 家庭式门面", fit: "bad" },
          { text: "全部依托外卖平台", fit: "bad" },
        ],
      },
      promotion: {
        key: "promotion",
        label: "Promotion 推广",
        options: [
          { text: "社交媒体上的服务故事 + 用户生成内容", fit: "good" },
          { text: "火爆电视广告 + 节日营销", fit: "ok" },
          { text: "性价比折扣 + 团购券" , fit: "bad" },
        ],
      },
    },
    reference:
      "海底捞真实 4P：服务即产品（Product），中高端（Price），高客流商圈（Place），用户口碑自传播（Promotion）。",
  },
]

type Selections = Record<"product" | "price" | "place" | "promotion", number | null>

export function MarketingMixConfig() {
  const [caseIdx, setCaseIdx] = useState(0)
  const c = CASES[caseIdx]
  const [sel, setSel] = useState<Selections>({
    product: null,
    price: null,
    place: null,
    promotion: null,
  })
  const [submitted, setSubmitted] = useState(false)

  const allSelected = (Object.keys(sel) as (keyof Selections)[]).every(
    (k) => sel[k] !== null
  )

  const score = (Object.keys(sel) as (keyof Selections)[]).reduce((acc, k) => {
    const idx = sel[k]
    if (idx == null) return acc
    const opt = c.config[k].options[idx]
    return acc + (opt.fit === "good" ? 1 : opt.fit === "ok" ? 0.5 : 0)
  }, 0)

  const reset = () => {
    setSel({ product: null, price: null, place: null, promotion: null })
    setSubmitted(false)
  }

  const switchCase = (i: number) => {
    setCaseIdx(i)
    reset()
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        给下面这个产品配置 4P。每项给出 3 个选项，选最贴合该产品定位的那个。
      </p>

      <div className="flex flex-wrap gap-2 items-baseline">
        <span className="text-xs text-muted-foreground mr-1">产品案例：</span>
        {CASES.map((cc, i) => (
          <Button
            key={cc.name}
            variant={i === caseIdx ? "default" : "outline"}
            size="sm"
            onClick={() => switchCase(i)}
          >
            {cc.name}
          </Button>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1">
          {c.name}
        </div>
        <p className="text-sm">{c.description}</p>
      </div>

      <div className="space-y-4">
        {(["product", "price", "place", "promotion"] as const).map((k) => {
          const conf = c.config[k]
          return (
            <div key={k} className="rounded-lg border border-border bg-card p-4">
              <div className="font-serif font-bold mb-3">{conf.label}</div>
              <ul className="space-y-2">
                {conf.options.map((opt, i) => {
                  const selected = sel[k] === i
                  const showFit = submitted && selected
                  return (
                    <li key={i}>
                      <button
                        onClick={() =>
                          !submitted && setSel((p) => ({ ...p, [k]: i }))
                        }
                        className={cn(
                          "w-full text-left flex items-start gap-3 rounded-md border p-3 text-sm transition-colors",
                          selected && !submitted && "border-accent bg-accent/5",
                          !selected && !submitted && "border-border hover:border-accent/50",
                          showFit &&
                            opt.fit === "good" &&
                            "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
                          showFit &&
                            opt.fit === "ok" &&
                            "border-amber-500 bg-amber-50 dark:bg-amber-950/30",
                          showFit &&
                            opt.fit === "bad" &&
                            "border-rose-500 bg-rose-50 dark:bg-rose-950/30",
                          submitted && "cursor-default"
                        )}
                      >
                        <span className="leading-relaxed flex-1">{opt.text}</span>
                        {showFit && opt.fit === "good" && (
                          <span className="text-xs text-emerald-600 flex items-center gap-1">
                            <Check className="h-3 w-3" /> 最佳
                          </span>
                        )}
                        {showFit && opt.fit === "ok" && (
                          <span className="text-xs text-amber-600 flex items-center gap-1">
                            <ChevronDown className="h-3 w-3" /> 可行
                          </span>
                        )}
                        {showFit && opt.fit === "bad" && (
                          <span className="text-xs text-rose-600 flex items-center gap-1">
                            <X className="h-3 w-3" /> 不匹配
                          </span>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>

      {submitted && (
        <div className="rounded-lg border border-accent/40 bg-accent/5 p-4 space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl font-bold tabular-nums">
              {score}/4
            </span>
            <span className="text-xs text-muted-foreground">
              （最佳=1 分，可行=0.5 分，不匹配=0 分）
            </span>
          </div>
          <p className="text-sm leading-relaxed">{c.reference}</p>
        </div>
      )}

      <div className="flex items-center gap-3 flex-wrap">
        {!submitted ? (
          <Button onClick={() => setSubmitted(true)} disabled={!allSelected}>
            提交配置
          </Button>
        ) : (
          <Button variant="outline" onClick={reset}>
            <RotateCcw className="mr-2 h-3.5 w-3.5" />
            重新配置
          </Button>
        )}
      </div>
    </div>
  )
}
