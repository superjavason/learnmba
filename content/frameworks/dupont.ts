import type { Framework } from "../types"

export const dupont: Framework = {
  slug: "dupont",
  number: 17,
  chapter: 4,
  nameZh: "杜邦分析法",
  nameEn: "DuPont Analysis",
  difficulty: "intermediate",
  estimatedMinutes: 11,
  tagline:
    "把 ROE 拆成三个杠杆——盈利、效率、杠杆——一眼看清企业是怎么赚钱的。",
  definition: {
    tldr: "杜邦分析法通过分解 ROE（净资产收益率）= 净利率 × 资产周转率 × 权益乘数，系统识别企业盈利驱动因素。",
    details: [
      "1920 年代杜邦公司发明，是财务分析最经典的框架。",
      "ROE = 净利率（盈利能力）× 资产周转率（运营效率）× 权益乘数（财务杠杆）。",
      "三个杠杆告诉你企业靠什么赚钱：高利润率（苹果）、高周转（沃尔玛）、还是高杠杆（银行）。",
      "进一步可向下分解：净利率 → 毛利率 / 费用率 / 税率；周转率 → 应收 / 库存周转。",
    ],
  },
  concepts: [
    {
      title: "净利率 Profit Margin",
      description:
        "净利润 ÷ 收入。反映赚钱效率。高端品牌（苹果）、奢侈品（LV）通常 > 20%。",
    },
    {
      title: "资产周转率 Asset Turnover",
      description:
        "收入 ÷ 总资产。反映资产利用效率。零售（沃尔玛）通常 > 2，重资产行业 < 0.5。",
    },
    {
      title: "权益乘数 Equity Multiplier",
      description:
        "总资产 ÷ 净资产。反映财务杠杆。银行常 > 10，制造业通常 1.5-3。",
    },
    {
      title: "ROE = 三者乘积",
      description: "三种赚钱路径：靠利润率、靠周转、靠杠杆，或组合。",
    },
  ],
  caseStudy: {
    title: "苹果 vs 沃尔玛 vs 银行 — 同样高 ROE，三种赚法",
    scenario:
      "三家公司 ROE 都接近 15-25%，但拆开看驱动因素截然不同。",
    analysis: [
      {
        label: "苹果 (高利润率主导)",
        content: "净利率 ~25%、周转率 ~0.9、杠杆 ~6 → ROE ~135%（峰值）。靠高溢价品牌赚钱。",
      },
      {
        label: "沃尔玛 (高周转主导)",
        content: "净利率 ~3%、周转率 ~2.4、杠杆 ~3 → ROE ~21%。靠极致供应链效率赚钱。",
      },
      {
        label: "银行 (高杠杆主导)",
        content: "净利率 ~25%、周转率 ~0.05、杠杆 ~12 → ROE ~15%。靠负债经营赚利差。",
      },
      {
        label: "诊断",
        content:
          "杜邦让你避免“ROE 高就是好”的误区——银行的高杠杆 ROE 隐含远高于苹果的风险。",
      },
    ],
    takeaway:
      "看到一家公司 ROE 高，先用杜邦拆开问“靠哪个杠杆？可持续吗？”——这是估值的起点。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt:
        "某公司 ROE = 20%，其中净利率 4%、资产周转率 2.5、权益乘数 2。它最像：",
      options: [
        { id: "a", label: "高端品牌（如奢侈品）" },
        { id: "b", label: "大型零售（如沃尔玛）" },
        { id: "c", label: "商业银行" },
        { id: "d", label: "重资产制造业" },
      ],
      correct: ["b"],
      explanation:
        "净利率低、周转率高、杠杆中等 — 典型零售业特征。a 高利润率，c 极高杠杆，d 低周转。",
    },
    {
      id: "q2",
      type: "judge",
      prompt: "ROE 越高总是越好。",
      options: [
        { id: "t", label: "正确" },
        { id: "f", label: "错误" },
      ],
      correct: ["f"],
      explanation:
        "错。如果 ROE 高主要靠杠杆驱动，意味着风险也高（如银行、地产）。要看“质量”而不是“数字”。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "下列哪些是有效的提升 ROE 的杠杆（多选）？",
      options: [
        { id: "a", label: "提价（提升净利率）" },
        { id: "b", label: "压降库存周转天数（提升资产周转率）" },
        { id: "c", label: "增加债务融资（提升权益乘数）" },
        { id: "d", label: "降低销售收入（直接拉高利润率）" },
      ],
      correct: ["a", "b", "c"],
      explanation:
        "前三种都是 ROE 三杠杆的具体动作。d 降低收入会让利润率变高但绝对盈利下降，ROE 反而下降。",
    },
  ],
  tips: [
    "看到 ROE 高时，先拆三杠杆，弄清楚靠什么。",
    "对比同行业用同一杜邦结构，更容易看出差异。",
    "把杜邦再下钻一层：净利率 → 毛利率 / 费用率 / 税率，找到具体改善点。",
    "高杠杆 ROE 要附加“偿债能力”视角：流动比率、利息覆盖倍数。",
  ],
  pitfalls: [
    "只看 ROE 数字不拆解，错失结构信息。",
    "盲目追求 ROE，靠不可持续的杠杆推高（次贷危机典型）。",
    "跨行业比较杠杆——银行和制造业本质不同。",
    "忽略一次性损益对净利率的扭曲（资产出售 / 减值）。",
  ],
}
