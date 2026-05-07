import type { Framework } from "../types"

export const marketingmix: Framework = {
  slug: "marketingmix",
  number: 10,
  chapter: 2,
  nameZh: "4P / 7P 营销组合",
  nameEn: "Marketing Mix",
  difficulty: "beginner",
  estimatedMinutes: 9,
  tagline:
    "把营销的所有可控变量摊开——4P 给产品营销，7P 适用服务营销。",
  definition: {
    tldr: "营销组合是企业营销活动中所有可控变量的集合。4P=Product/Price/Place/Promotion，是产品营销的基础；7P 加 People/Process/Physical Evidence，适用服务营销。",
    details: [
      "Jerome McCarthy 1960 年代提出 4P；Booms & Bitner 1981 年扩展为 7P 用于服务营销。",
      "4P 解决“客户买什么 / 多少钱 / 在哪买 / 怎么知道”。",
      "7P 多出来的 3P 解决服务营销特有的问题：服务的人（People）、流程（Process）、有形证据（Physical Evidence）。",
      "STP 是战略层（在哪里竞争），4P/7P 是战术层（如何竞争）——两者必须一致。",
    ],
  },
  concepts: [
    {
      title: "Product 产品",
      description:
        "提供给客户的有形或无形价值——功能、设计、品牌、包装、服务、保修。",
    },
    {
      title: "Price 价格",
      description:
        "客户为价值支付的金额——定价策略、折扣、付款条件、心理价格点。",
    },
    {
      title: "Place 渠道",
      description: "产品如何到达客户手中——分销网络、零售点、电商、物流。",
    },
    {
      title: "Promotion 推广",
      description:
        "如何让客户知道并选择你——广告、公关、销售促进、人员推销、社媒。",
    },
    {
      title: "People 人员（7P）",
      description:
        "服务人员的素质、培训、态度——直接影响客户体验。",
    },
    {
      title: "Process 流程（7P）",
      description: "服务交付的标准化流程、效率、便利性——决定可复制性。",
    },
    {
      title: "Physical Evidence 有形证据（7P）",
      description: "服务场所、装修、品牌物料——把无形服务“物质化”。",
    },
  ],
  caseStudy: {
    title: "瑞幸咖啡的 4P 配置",
    company: "Luckin Coffee",
    scenario: "瑞幸用一套精密匹配的 4P 在星巴克的咖啡市场撕开缺口。",
    analysis: [
      {
        label: "Product",
        content:
          "标准化中杯美式 / 拿铁 / 生椰拿铁；快速迭代爆品（每年 50+ 新品）；包装简洁现代。",
      },
      {
        label: "Price",
        content:
          "9.9 元会员日 / 平均 12-15 元，是星巴克的 1/3——价格锚定“咖啡 + 价格敏感”心智。",
      },
      {
        label: "Place",
        content:
          "全部门店扫码自取或外卖；不依赖商场黄金位置，开在写字楼底商（坪效高、租金低）。",
      },
      {
        label: "Promotion",
        content:
          "新人首单免费 + 推荐好友返券 + 抖音刷屏话题 + 联名（茅台 / 椰树）。",
      },
    ],
    takeaway:
      "4P 必须互相支撑——瑞幸的低价（P）能成立，是因为门店便宜（Place）+ 标准化产品（Product）+ 数字化获客（Promotion）配合。改一个 P 必须看其他三个。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt: "以下哪一项最属于 Place（渠道）？",
      options: [
        { id: "a", label: "产品的耐用性指标" },
        { id: "b", label: "电商平台 + 线下门店的组合" },
        { id: "c", label: "限时折扣码" },
        { id: "d", label: "代言人选择" },
      ],
      correct: ["b"],
      explanation:
        "渠道决定“在哪买到”。a 是 Product，c 是 Promotion 中的 sales promotion，d 是 Promotion 中的代言。",
    },
    {
      id: "q2",
      type: "judge",
      prompt: "“服务流程 SOP”属于 7P 中的 Process。",
      options: [
        { id: "t", label: "正确" },
        { id: "f", label: "错误" },
      ],
      correct: ["t"],
      explanation:
        "正确。Process 就是服务交付的流程化、标准化设计——海底捞的等位流程、星巴克的下单流程都是典型。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "下列哪些场景应该用 7P 而非 4P（多选）？",
      options: [
        { id: "a", label: "美容院 / SPA" },
        { id: "b", label: "瓶装可乐" },
        { id: "c", label: "酒店 / 民宿" },
        { id: "d", label: "在线教育" },
      ],
      correct: ["a", "c", "d"],
      explanation:
        "服务营销（人员 / 流程 / 场所重要性高）用 7P。瓶装可乐是标准产品营销，4P 足够。",
    },
  ],
  tips: [
    "4P/7P 必须互相一致——产品高端就别低价、不在街边铺货。",
    "服务行业（餐饮、教育、医疗）一律用 7P，3 个新 P 是关键差异化点。",
    "近年还有 4C（Customer / Cost / Convenience / Communication）从客户视角看营销，可与 4P 对照。",
    "为每个 P 设可衡量 KPI——光列“高端定位”没用。",
  ],
  pitfalls: [
    "把 4P 当独立项填表，忘记 P 之间的协同。",
    "服务行业仍只用 4P，错过差异化机会（如 People 培训）。",
    "Place 只想到“渠道”，忽略购买场景的“心理便利性”。",
    "Promotion 等同于打广告——其实包含公关、销售、社群、内容等多种。",
  ],
}
