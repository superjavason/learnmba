"use client"

import { useMemo, useState } from "react"
import {
  ComposedChart,
  Bar,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts"
import { Button } from "@/components/ui/button"

interface DataItem {
  name: string
  value: number
}

interface Dataset {
  label: string
  unit: string
  items: DataItem[]
  insight: string
}

const DATASETS: Record<string, Dataset> = {
  客户营收: {
    label: "200 个 SaaS 客户的营收分布",
    unit: "万元",
    insight:
      "Top 20% 客户贡献 80%+ 营收 — 应配置专属客户经理；长尾客户走自助化。",
    items: [
      { name: "客户A", value: 1850 },
      { name: "客户B", value: 1620 },
      { name: "客户C", value: 1180 },
      { name: "客户D", value: 920 },
      { name: "客户E", value: 760 },
      { name: "客户F", value: 580 },
      { name: "客户G", value: 460 },
      { name: "客户H", value: 320 },
      { name: "客户I", value: 220 },
      { name: "客户J", value: 180 },
      { name: "其他 30 个", value: 480 },
      { name: "尾部 160 个", value: 410 },
    ],
  },
  SKU销量: {
    label: "电商平台 12 类 SKU 销量",
    unit: "件 (千)",
    insight:
      "经典 80/20：少数爆品撑起销量，长尾 SKU 主要作为用户多样性需求。",
    items: [
      { name: "爆品 A", value: 580 },
      { name: "爆品 B", value: 460 },
      { name: "爆品 C", value: 380 },
      { name: "热销 D", value: 280 },
      { name: "热销 E", value: 220 },
      { name: "热销 F", value: 180 },
      { name: "中部 G", value: 130 },
      { name: "中部 H", value: 95 },
      { name: "长尾 I", value: 60 },
      { name: "长尾 J", value: 40 },
      { name: "长尾 K", value: 30 },
      { name: "长尾 L", value: 22 },
    ],
  },
  问题原因: {
    label: "客户投诉的根因分布",
    unit: "次/月",
    insight:
      "5 个根因占 80%+ 投诉——聚焦修复这 5 个比改善长尾原因有效得多。",
    items: [
      { name: "登录失败", value: 142 },
      { name: "支付报错", value: 118 },
      { name: "订单延迟", value: 96 },
      { name: "客服响应慢", value: 78 },
      { name: "页面加载慢", value: 62 },
      { name: "推送丢失", value: 35 },
      { name: "搜索不准", value: 28 },
      { name: "图片不显示", value: 22 },
      { name: "排序错误", value: 18 },
      { name: "其他", value: 36 },
    ],
  },
}

export function ParetoChart() {
  const [datasetKey, setDatasetKey] = useState<keyof typeof DATASETS>("客户营收")
  const ds = DATASETS[datasetKey]
  // ensure sorted desc
  const sorted = useMemo(
    () => [...ds.items].sort((a, b) => b.value - a.value),
    [ds]
  )
  const total = sorted.reduce((acc, x) => acc + x.value, 0)
  const chartData = sorted.reduce<
    { name: string; value: number; cumPct: number }[]
  >((acc, it) => {
    const prevCum = acc.length > 0 ? acc[acc.length - 1].cumPct * total / 100 : 0
    const newCum = prevCum + it.value
    acc.push({
      name: it.name,
      value: it.value,
      cumPct: Math.round((newCum / total) * 100),
    })
    return acc
  }, [])

  // find 80% threshold position
  const thresholdIdx = chartData.findIndex((d) => d.cumPct >= 80)
  const thresholdName = thresholdIdx >= 0 ? chartData[thresholdIdx].name : null
  const top20Count = Math.ceil(chartData.length * 0.2)
  const top20Pct = chartData[top20Count - 1]?.cumPct ?? 0

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        切换数据集，观察“关键少数”如何撑起绝大多数贡献。柱子按贡献度从高到低排序，曲线为累计百分比。
      </p>

      <div className="flex flex-wrap gap-2 items-baseline">
        <span className="text-xs text-muted-foreground mr-1">数据集：</span>
        {Object.keys(DATASETS).map((k) => (
          <Button
            key={k}
            variant={datasetKey === k ? "default" : "outline"}
            size="sm"
            onClick={() => setDatasetKey(k)}
          >
            {k}
          </Button>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="text-sm font-medium mb-1">{ds.label}</div>
        <ResponsiveContainer width="100%" height={340}>
          <ComposedChart
            data={chartData}
            margin={{ top: 16, right: 24, left: 8, bottom: 16 }}
          >
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "var(--foreground)" }}
              interval={0}
              angle={-25}
              textAnchor="end"
              dy={6}
              height={70}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              label={{
                value: ds.unit,
                position: "insideLeft",
                angle: -90,
                offset: 10,
                style: { fontSize: 10, fill: "var(--muted-foreground)" },
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 100]}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              label={{
                value: "累计 %",
                position: "insideRight",
                angle: 90,
                offset: 10,
                style: { fontSize: 10, fill: "var(--muted-foreground)" },
              }}
            />
            <Tooltip
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar yAxisId="left" dataKey="value" fill="var(--primary)" name="贡献" />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="cumPct"
              stroke="var(--accent)"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "var(--accent)" }}
              name="累计百分比 %"
            />
            <ReferenceLine
              yAxisId="right"
              y={80}
              stroke="#dc2626"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              label={{
                value: "80% 阈值",
                fill: "#dc2626",
                fontSize: 10,
                position: "right",
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-lg border border-accent/40 bg-accent/5 p-4 grid sm:grid-cols-3 gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            前 20% 项目数
          </div>
          <div className="font-serif text-2xl font-bold tabular-nums">
            {top20Count} / {chartData.length}
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            它们的贡献
          </div>
          <div className="font-serif text-2xl font-bold tabular-nums text-accent">
            {top20Pct}%
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            到达 80% 时的项目
          </div>
          <div className="font-serif text-base font-bold tabular-nums">
            {thresholdName ?? "—"}
          </div>
        </div>
        <p className="sm:col-span-3 text-sm text-muted-foreground border-t border-accent/20 pt-3">
          💡 {ds.insight}
        </p>
      </div>
    </div>
  )
}
