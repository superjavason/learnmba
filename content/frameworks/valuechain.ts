import type { Framework } from "../types"

export const valuechain: Framework = {
  slug: "valuechain",
  number: 4,
  chapter: 1,
  nameZh: "波特价值链",
  nameEn: "Porter's Value Chain",
  difficulty: "intermediate",
  estimatedMinutes: 12,
  tagline: "把企业活动拆成 5 主 + 4 支持，看清谁在创造价值、谁在吃成本。",
  definition: {
    tldr: "价值链模型把企业拆解为五项基本活动 + 四项支持活动，识别每个环节的价值创造与成本来源。",
    details: [
      "波特 1985 年在《竞争优势》提出。背后的思想是：企业不是一个黑盒，而是一系列环环相扣的活动。",
      "五项主活动按物流逻辑串起来：入库物流 → 生产 → 出库物流 → 营销与销售 → 服务。",
      "四项支持活动横跨所有主活动：基础设施、人力资源、技术开发、采购。",
      "右端的“利润”不是凭空而来——它是各活动加成（增值）减去成本后的剩余。",
    ],
  },
  concepts: [
    {
      title: "入库物流 Inbound Logistics",
      description: "原材料接收、存储、仓储、库存管理。",
    },
    {
      title: "生产 Operations",
      description: "原材料 → 成品的全部转化活动，含质量控制。",
    },
    {
      title: "出库物流 Outbound Logistics",
      description: "成品仓储、订单处理、配送给客户。",
    },
    {
      title: "营销与销售 Marketing & Sales",
      description: "品牌、广告、定价、销售队伍、渠道。",
    },
    {
      title: "服务 Service",
      description: "安装、维修、培训、退换、客户支持。",
    },
    {
      title: "基础设施",
      description: "管理、财务、法务、规划——支撑全企业运转。",
    },
    {
      title: "人力资源",
      description: "招聘、培训、薪酬、文化。",
    },
    {
      title: "技术开发",
      description: "研发、流程创新、信息系统。",
    },
    {
      title: "采购",
      description: "供应商管理、采购战略——影响所有主活动的投入。",
    },
  ],
  caseStudy: {
    title: "苹果 vs 沃尔玛 — 同样的价值链，不同的赢法",
    scenario: "两家世界级公司用截然不同的价值链配置赢得各自市场。",
    analysis: [
      {
        label: "苹果 · 重营销与服务",
        content:
          "营销与销售（直营 Apple Store、品牌溢价）+ 服务（生态绑定）创造大部分价值；生产环节外包给富士康。",
      },
      {
        label: "苹果 · 技术开发是核心",
        content: "M 系列芯片、操作系统是支持活动里的最大投入，赋能全主活动。",
      },
      {
        label: "沃尔玛 · 重物流与采购",
        content: "全球最大私营物流网 + 极致采购议价能力把成本压到最低，再回馈低价。",
      },
      {
        label: "沃尔玛 · 营销不重要",
        content: "靠“低价”本身做营销，广告投入相对收入很低。",
      },
    ],
    takeaway:
      "价值链分析的关键不是“哪些活动多”，而是“哪些活动是你区别于对手的关键”——苹果靠营销+技术，沃尔玛靠物流+采购，活动配置决定竞争优势。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt: "下列哪一项属于“支持活动”？",
      options: [
        { id: "a", label: "原材料入库" },
        { id: "b", label: "终端配送给消费者" },
        { id: "c", label: "招聘工程师" },
        { id: "d", label: "品牌广告投放" },
      ],
      correct: ["c"],
      explanation:
        "招聘属于人力资源，是横跨所有主活动的支持活动。a 是入库物流（主），b 是出库物流（主），d 是营销（主）。",
    },
    {
      id: "q2",
      type: "judge",
      prompt: "采购属于主活动。",
      options: [
        { id: "t", label: "正确" },
        { id: "f", label: "错误" },
      ],
      correct: ["f"],
      explanation:
        "采购在波特原模型里属于支持活动，因为它服务于所有主活动的投入需求，不只是入库物流。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "如果你想分析某公司“成本优势”来源，应当重点分析（多选）：",
      options: [
        { id: "a", label: "采购成本（议价、规模）" },
        { id: "b", label: "生产效率（自动化、规模经济）" },
        { id: "c", label: "物流成本（配送密度、距离）" },
        { id: "d", label: "客户净推荐值" },
      ],
      correct: ["a", "b", "c"],
      explanation:
        "成本优势来自高成本活动的优化。客户 NPS 反映服务/营销效果，与成本关系间接。",
    },
  ],
  tips: [
    "先标出每项活动的成本占比，再问“这项活动我比对手强/弱多少？”。",
    "做“活动地图”——把活动间的依赖与信息流画出来，找瓶颈。",
    "用价值链找差异化，而不是平均用力——大部分活动只需做到行业平均。",
    "结合 VRIO：价值链识别活动，VRIO 评估这些活动是否构成持续优势。",
  ],
  pitfalls: [
    "把价值链画成流程图，忘记“每项活动应创造的价值”分析。",
    "只看主活动，忘了 4 个支持活动也消耗大量成本（尤其 IT 与基础设施）。",
    "孤立看每个活动，忽略活动间的协同（如出库物流与服务的耦合）。",
    "把价值链当一次性的咨询交付物，不持续更新。",
  ],
}
