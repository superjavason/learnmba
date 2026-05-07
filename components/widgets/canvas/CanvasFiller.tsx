"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, RotateCcw } from "lucide-react"

type BlockKey = "KP" | "KA" | "KR" | "VP" | "CR" | "CH" | "CS" | "C$" | "R$"

interface CompanyCase {
  id: string
  name: string
  hint: string
  filled: Record<BlockKey, string>
}

const CASES: CompanyCase[] = [
  {
    id: "airbnb",
    name: "Airbnb",
    hint: "P2P 短租平台",
    filled: {
      KP: "支付公司（Stripe）、摄影师网络、保险公司",
      KA: "平台运营、房源审核、用户获取、纠纷解决",
      KR: "全球房源数据库、评价/信任系统、支付系统、品牌",
      VP: "旅行者：独特体验+性价比；房东：闲置资产变现",
      CR: "评价系统 + 客服支持 + 房东社区运营",
      CH: "Airbnb App + 网站 + SEO + 内容营销 + 社媒",
      CS: "需求侧：旅游/商务出行者；供给侧：房东（双边市场）",
      "C$": "技术研发 + 市场营销 + 信任与安全 + 客服",
      R$: "向房东抽成 ~3% + 向租客收 ~14% 服务费",
    },
  },
  {
    id: "netflix",
    name: "Netflix",
    hint: "全球流媒体",
    filled: {
      KP: "影视工作室、ISP（CDN 合作）、设备厂商（智能 TV）",
      KA: "原创内容制作、个性化推荐算法、内容采购",
      KR: "庞大内容库、推荐算法、订阅用户数据、品牌",
      VP: "随时随地无广告观看高质量影视 + 个性化推荐",
      CR: "自助化 + 个性化推荐 + 自动续订 + 客户支持",
      CH: "App、网页、智能电视应用、设备预装",
      CS: "全球付费流媒体用户（按地区与套餐细分）",
      "C$": "原创内容投入（最大）+ 内容采购 + 技术 + CDN + 营销",
      R$: "月度订阅费（多套餐）",
    },
  },
  {
    id: "luckin",
    name: "瑞幸咖啡",
    hint: "中国互联网咖啡连锁",
    filled: {
      KP: "原料供应商、外卖平台、门店物业",
      KA: "门店运营、新品开发、数字化营销、外卖配送",
      KR: "App 用户基础、门店网络、品牌、供应链",
      VP: "便宜高频的咖啡 + 数字化下单极速取餐",
      CR: "App 自助 + 会员体系 + 推荐返券",
      CH: "App / 小程序下单 + 门店自取 + 外卖",
      CS: "高频通勤白领、价格敏感年轻用户",
      "C$": "原料 + 门店租金 + 人员 + 营销 + 物流",
      R$: "咖啡饮品销售 + 周边产品 + 会员卡",
    },
  },
]

const BLOCK_LABELS: Record<BlockKey, string> = {
  KP: "关键合作 KP",
  KA: "关键活动 KA",
  KR: "关键资源 KR",
  VP: "价值主张 VP",
  CR: "客户关系 CR",
  CH: "渠道 CH",
  CS: "客户群体 CS",
  "C$": "成本结构 C$",
  R$: "收入流 R$",
}

const BLOCK_ORDER: BlockKey[] = ["KP", "KA", "KR", "VP", "CR", "CH", "CS", "C$", "R$"]

function emptyState(): Record<BlockKey, string> {
  return {
    KP: "",
    KA: "",
    KR: "",
    VP: "",
    CR: "",
    CH: "",
    CS: "",
    "C$": "",
    R$: "",
  }
}

export function CanvasFiller() {
  const [caseId, setCaseId] = useState<string>("airbnb")
  const [state, setState] = useState<Record<BlockKey, string>>(emptyState)
  const [showRef, setShowRef] = useState<Record<BlockKey, boolean>>({
    KP: false,
    KA: false,
    KR: false,
    VP: false,
    CR: false,
    CH: false,
    CS: false,
    "C$": false,
    R$: false,
  })

  const c = CASES.find((x) => x.id === caseId)!
  const filledCount = BLOCK_ORDER.filter((k) => state[k].trim().length > 0).length

  const switchCase = (id: string) => {
    setCaseId(id)
    setState(emptyState())
    setShowRef({
      KP: false,
      KA: false,
      KR: false,
      VP: false,
      CR: false,
      CH: false,
      CS: false,
      "C$": false,
      R$: false,
    })
  }

  const toggleRef = (k: BlockKey) =>
    setShowRef((p) => ({ ...p, [k]: !p[k] }))

  const reset = () => {
    setState(emptyState())
    setShowRef({
      KP: false,
      KA: false,
      KR: false,
      VP: false,
      CR: false,
      CH: false,
      CS: false,
      "C$": false,
      R$: false,
    })
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        给目标公司填写 9 个模块（按你的理解）。每块填完可以点 👁 看参考答案对比。
      </p>

      <div className="flex flex-wrap gap-2 items-baseline">
        <span className="text-xs text-muted-foreground mr-1">公司案例：</span>
        {CASES.map((cc) => (
          <Button
            key={cc.id}
            variant={caseId === cc.id ? "default" : "outline"}
            size="sm"
            onClick={() => switchCase(cc.id)}
          >
            {cc.name}
            <span className="ml-1.5 text-[10px] opacity-70">{cc.hint}</span>
          </Button>
        ))}
        <Button variant="ghost" size="sm" onClick={reset}>
          <RotateCcw className="mr-1 h-3 w-3" />
          清空
        </Button>
      </div>

      <div className="rounded border border-border bg-secondary/30 p-3">
        <div className="text-xs text-muted-foreground">
          <span className="font-bold text-foreground">进度：</span>
          <span className="font-serif tabular-nums ml-1">{filledCount}/9</span>
          <span className="ml-3">提示：先从“客户群体”和“价值主张”入手最容易。</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {BLOCK_ORDER.map((k) => {
          const ref = c.filled[k]
          const visible = showRef[k]
          return (
            <div
              key={k}
              className="rounded-lg border border-border bg-card p-3 space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-sm flex-1">
                  {BLOCK_LABELS[k]}
                </span>
                <button
                  onClick={() => toggleRef(k)}
                  className="text-muted-foreground hover:text-accent transition-colors"
                  aria-label="对答案"
                  title={visible ? "隐藏参考答案" : "查看参考答案"}
                >
                  {visible ? (
                    <EyeOff className="h-3.5 w-3.5" />
                  ) : (
                    <Eye className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
              <textarea
                value={state[k]}
                onChange={(e) =>
                  setState((p) => ({ ...p, [k]: e.target.value }))
                }
                placeholder="填写你的理解…"
                rows={3}
                className="w-full rounded border border-border bg-background px-2 py-1.5 text-sm focus:border-accent focus:outline-none resize-none"
              />
              {visible && (
                <div className="rounded border-l-2 border-accent bg-accent/5 p-2 text-xs leading-relaxed">
                  <span className="font-bold text-accent mr-1">参考：</span>
                  {ref}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
