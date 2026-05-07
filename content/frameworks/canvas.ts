import type { Framework } from "../types"

export const canvas: Framework = {
  slug: "canvas",
  number: 23,
  chapter: 6,
  nameZh: "商业模式画布",
  nameEn: "Business Model Canvas",
  difficulty: "intermediate",
  estimatedMinutes: 12,
  tagline:
    "用 9 个模块讲清楚“你怎么创造价值、怎么把钱赚回来”——一张纸看完一家公司。",
  definition: {
    tldr: "商业模式画布（BMC）由 Alex Osterwalder 提出，用 9 个相互关联的模块系统描述企业如何创造、传递和获取价值。",
    details: [
      "9 模块分为 4 组：客户侧（Who/CR/CH/CS）、价值（VP）、运营侧（KP/KA/KR）、财务（CS / R$）。",
      "中心是“价值主张”——把客户群与运营资源连接起来。",
      "右侧 4 块（客户群、客户关系、渠道、收入流）回答“你赚谁的钱、怎么赚”。",
      "左侧 4 块（关键合作、关键活动、关键资源、成本结构）回答“你怎么造出价值”。",
      "BMC 适合早期商业模式设计、新业务孵化、并购整合的快速画像。",
    ],
  },
  concepts: [
    { title: "客户群体 Customer Segments", description: "你瞄准的不同客户群——大众市场 / 利基市场 / 多边市场。" },
    { title: "价值主张 Value Proposition", description: "为什么客户选你而不是对手——独特价值。" },
    { title: "渠道 Channels", description: "如何把价值传递给客户——直营 / 经销 / 在线。" },
    { title: "客户关系 Customer Relationships", description: "如何与客户建立和维持关系——自助 / 一对一 / 社群。" },
    { title: "收入流 Revenue Streams", description: "如何收钱——一次性销售 / 订阅 / 抽成 / 广告。" },
    { title: "关键资源 Key Resources", description: "执行价值主张需要的核心资产——物质 / 智力 / 人力 / 财务。" },
    { title: "关键活动 Key Activities", description: "支撑价值主张的关键运营动作——生产 / 解决方案 / 平台。" },
    { title: "关键合作 Key Partnerships", description: "外部协作伙伴——战略联盟 / 供应商 / 共享经济。" },
    { title: "成本结构 Cost Structure", description: "执行业务的主要成本——固定 / 变动、规模经济、范围经济。" },
  ],
  caseStudy: {
    title: "Airbnb 商业模式画布",
    company: "Airbnb",
    scenario: "Airbnb 用平台模式重新定义“住宿”，BMC 9 模块完整分析。",
    analysis: [
      { label: "客户群（CS）", content: "需求侧：旅游者 / 商务出行者；供给侧：房东。" },
      { label: "价值主张（VP）", content: "旅行者：独特体验 + 性价比；房东：闲置资产变现。" },
      { label: "渠道（CH）", content: "Airbnb App + 网站 + SEO + 内容营销 + 社媒。" },
      { label: "客户关系（CR）", content: "评价系统 + 客服支持 + 房东社区运营。" },
      { label: "收入流（R$）", content: "向房东抽成 ~3% + 向租客收 ~14% 服务费。" },
      { label: "关键资源（KR）", content: "全球房源数据库 + 评价/信任系统 + 支付系统 + 品牌。" },
      { label: "关键活动（KA）", content: "平台运营 + 房源审核 + 用户获取 + 纠纷解决。" },
      { label: "关键合作（KP）", content: "支付公司（Stripe）+ 摄影师网络 + 保险公司。" },
      { label: "成本结构（C$）", content: "技术研发 + 市场营销 + 信任与安全 + 客服。" },
    ],
    takeaway:
      "Airbnb 不拥有任何房子，靠平台连接需求和供给——这种轻资产模式让边际成本接近零，是双边市场的经典案例。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt: "下列哪一项属于 BMC 的“关键资源”模块？",
      options: [
        { id: "a", label: "Airbnb 的房东抽成" },
        { id: "b", label: "Airbnb 的全球房源数据库" },
        { id: "c", label: "Airbnb 的纠纷解决流程" },
        { id: "d", label: "Airbnb 的市场营销" },
      ],
      correct: ["b"],
      explanation:
        "数据库是核心资产，属于关键资源。a 是收入流，c 是关键活动，d 是成本结构里的活动。",
    },
    {
      id: "q2",
      type: "judge",
      prompt: "BMC 中“价值主张”是 9 模块的中心，连接客户侧与运营侧。",
      options: [
        { id: "t", label: "正确" },
        { id: "f", label: "错误" },
      ],
      correct: ["t"],
      explanation:
        "正确。VP 在画布中央，右边描述“为谁、怎么传递、怎么赚”，左边描述“怎么造出来”。VP 是连接器。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "BMC 应用时，下列哪些是常见误用（多选）？",
      options: [
        { id: "a", label: "把所有 9 模块都填得一样厚重，不区分主次" },
        { id: "b", label: "9 模块独立填写，忽略它们之间的因果关系" },
        { id: "c", label: "用 BMC 替代精细的财务模型与执行计划" },
        { id: "d", label: "画完一次就归档，业务变化时不更新" },
      ],
      correct: ["a", "b", "c", "d"],
      explanation:
        "这四种全是 BMC 的常见误用。BMC 是“快速画像 + 持续迭代”的工具，不是“一次性写死的文档”。",
    },
  ],
  tips: [
    "先从“客户群 + 价值主张”开始填，再向两侧展开。",
    "用便利贴版本（线下打印）做团队共创，效率比在线工具高。",
    "BMC 不替代财务模型——验证商业可行性需要单元经济学（unit economics）。",
    "新增模块时检查：哪个客户群对应？哪个价值主张？维持画布的连贯性。",
  ],
  pitfalls: [
    "9 模块独立填，忽略它们的因果链——画布应该“能讲一个故事”。",
    "客户群定义太宽（“所有人”）——精准客户群是 BMC 的起点。",
    "把价值主张当一句广告语——VP 必须能映射到具体功能 / 收益。",
    "“关键合作”全是供应商——遗漏战略联盟、社区共建等更重要的合作类型。",
  ],
}
