import type { Framework } from "../types"

export const bsc: Framework = {
  slug: "bsc",
  number: 20,
  chapter: 5,
  nameZh: "平衡计分卡",
  nameEn: "Balanced Scorecard",
  difficulty: "intermediate",
  estimatedMinutes: 11,
  tagline:
    "不只看财务——从财务、客户、流程、学习四维度衡量组织绩效，避免单一指标的片面。",
  definition: {
    tldr: "平衡计分卡（BSC）是一套综合业绩管理系统，从财务、客户、内部流程、学习与成长四个维度平衡衡量组织绩效，把战略转化为可执行 KPI。",
    details: [
      "Robert Kaplan 与 David Norton 1992 年在《哈佛商业评论》提出，被《哈佛商业评论》评为“75 年最具影响力的管理思想”之一。",
      "财务（Financial）—— 我们对股东的表现如何？",
      "客户（Customer）—— 客户如何看待我们？",
      "内部流程（Internal Process）—— 我们必须擅长什么？",
      "学习与成长（Learning & Growth）—— 我们能否持续创新和改进？",
      "四个维度形成因果链：学习成长 → 内部流程 → 客户满意 → 财务结果。",
    ],
  },
  concepts: [
    {
      title: "财务维度 Financial",
      description:
        "ROE / 营收增长 / 利润率 / 现金流——衡量战略是否转化为股东价值。",
    },
    {
      title: "客户维度 Customer",
      description:
        "客户满意度 / NPS / 留存率 / 市场份额——客户是财务的前置指标。",
    },
    {
      title: "内部流程 Internal Process",
      description:
        "周期时间 / 良品率 / 创新速度 / 服务交付——支撑客户满意的运营能力。",
    },
    {
      title: "学习与成长 Learning & Growth",
      description:
        "员工敬业度 / 培训投入 / 技能矩阵 / 信息系统——所有上层维度的根基。",
    },
  ],
  caseStudy: {
    title: "某连锁咖啡的平衡计分卡",
    company: "某高端咖啡连锁",
    scenario: "公司过去 3 年财务亮眼但门店离职率上升，CEO 用 BSC 重新平衡管理重点。",
    analysis: [
      {
        label: "财务",
        content:
          "目标：营收增长 15%、毛利率 ≥ 65%。指标：同店销售增长率、新店投资回报周期。",
      },
      {
        label: "客户",
        content:
          "目标：NPS ≥ 70、会员复购率 ≥ 50%。指标：每月新增会员数、APP DAU、投诉响应时间。",
      },
      {
        label: "内部流程",
        content:
          "目标：单杯出杯时间 ≤ 90 秒、新品季上线时间 ≤ 6 周。指标：门店运营 SOP 合规率、新品成功率。",
      },
      {
        label: "学习与成长",
        content:
          "目标：员工 12 个月留存 ≥ 80%、师傅咖啡师占比 ≥ 30%。指标：培训完成率、内部晋升占比、员工敬业度调研得分。",
      },
    ],
    takeaway:
      "把“员工流失”定为学习成长维度 KPI 后，连带流程稳定性、客户体验、财务都改善——这正是 BSC 因果链的力量。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt: "客户净推荐值（NPS）属于 BSC 的哪个维度？",
      options: [
        { id: "a", label: "财务" },
        { id: "b", label: "客户" },
        { id: "c", label: "内部流程" },
        { id: "d", label: "学习与成长" },
      ],
      correct: ["b"],
      explanation:
        "NPS 直接衡量客户对企业的推荐意愿，属于客户维度。",
    },
    {
      id: "q2",
      type: "judge",
      prompt: "BSC 的四个维度之间是相互独立的。",
      options: [
        { id: "t", label: "正确" },
        { id: "f", label: "错误" },
      ],
      correct: ["f"],
      explanation:
        "错。BSC 的精髓是因果链：学习与成长 → 内部流程 → 客户 → 财务。改善底层维度才能驱动上层结果。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "下列哪些是 BSC 设计 KPI 的好原则（多选）？",
      options: [
        { id: "a", label: "可衡量（量化）" },
        { id: "b", label: "与战略目标直接相关" },
        { id: "c", label: "尽量多列以保证全面" },
        { id: "d", label: "四维度数量保持平衡，避免偏重财务" },
      ],
      correct: ["a", "b", "d"],
      explanation:
        "KPI 不是越多越好，每个维度 3-5 个核心 KPI 即可。其他三项是 BSC 设计的标准准则。",
    },
  ],
  tips: [
    "把战略目标先描述清楚，再为每个维度设 3-5 个 KPI（不超过）。",
    "强调因果：底层维度（学习成长）改善能驱动上层（财务）。",
    "至少季度回顾 KPI 是否仍服务于当前战略——市场变了 KPI 要变。",
    "把 BSC 与 OKR 结合：BSC 给框架，OKR 给季度行动。",
  ],
  pitfalls: [
    "过度强调财务维度，把 BSC 退化为 KPI 大杂烩。",
    "KPI 太多反而稀释焦点，团队不知道该追什么。",
    "学习成长维度是最容易被忽视的——这恰恰是长期能力的根基。",
    "把 KPI 当结果而非杠杆——要追问 “这个数字怎么改善？”。",
  ],
}
