import type { Framework } from "../types"

export const vrio: Framework = {
  slug: "vrio",
  number: 5,
  chapter: 1,
  nameZh: "VRIO 分析",
  nameEn: "VRIO Framework",
  difficulty: "intermediate",
  estimatedMinutes: 10,
  tagline:
    "评估一项资源能不能给企业带来“持续”竞争优势——四道关卡逐一过。",
  definition: {
    tldr: "VRIO 通过四个连续问题判断资源/能力的竞争意义：是否有价值（V）、是否稀缺（R）、是否难以模仿（I）、组织是否能利用（O）。",
    details: [
      "VRIO 由 Jay Barney 在资源基础观（RBV）上发展，回答“什么样的资源能带来长期赚钱能力”。",
      "四问串行：任何一问是“否”，资源的竞争意义就到此为止。",
      "全部“是” → 持续竞争优势；前三是、O 否 → 暂时优势；只有 V → 均势；V 否 → 劣势。",
      "实战中，“组织是否能利用”经常被忽视——很多公司有好资源但组织能力跟不上，最后浪费。",
    ],
  },
  concepts: [
    {
      title: "Valuable 有价值",
      description: "能否帮企业利用机会或抵御威胁？产生效益吗？",
    },
    {
      title: "Rare 稀缺",
      description: "竞争对手是否拥有？少数公司拥有才稀缺。",
    },
    {
      title: "Inimitable 难以模仿",
      description:
        "复制需要多高的成本/时间？历史路径、复杂因果、社会复杂性是常见护城河。",
    },
    {
      title: "Organized 组织化",
      description: "公司流程、文化、激励机制是否能让这项资源真正发挥作用？",
    },
  ],
  caseStudy: {
    title: "可口可乐配方 vs 苹果生态",
    scenario: "用 VRIO 对比两家公司的“传奇资源”是否真的构成持续优势。",
    analysis: [
      {
        label: "可口可乐配方",
        content:
          "V 是（有价值）、R 是（稀缺，业内独有）、I 是（专利+秘方传统极难复制）、O 是（百年组织能力支撑分销 + 营销）→ 持续优势。",
      },
      {
        label: "苹果生态",
        content:
          "V 是（高粘性）、R 是（生态完整度独一无二）、I 是（硬件 + 软件 + 服务 + 用户基数 + 开发者飞轮 = 极难复制）、O 是（组织围绕生态构建的运营能力）→ 持续优势。",
      },
      {
        label: "对照：某 SaaS 的“AI 大模型”",
        content:
          "V 是、R 否（人人都能调用 GPT-4） → 至多带来均势，光有大模型不够。",
      },
    ],
    takeaway:
      "时代变了，“是否稀缺”和“是否难以模仿”快速贬值——AI、云、数据这些当年的护城河，今天可能 6 个月就被填平。VRIO 不是一次性结论，而是常态化的诊断。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt:
        "某公司有先进的 ERP 系统（V 是），但行业内绝大多数公司也都用类似的（R 否）。这项资源给公司带来：",
      options: [
        { id: "a", label: "持续竞争优势" },
        { id: "b", label: "暂时竞争优势" },
        { id: "c", label: "竞争均势" },
        { id: "d", label: "竞争劣势" },
      ],
      correct: ["c"],
      explanation:
        "V 是、R 否（人人都有）→ 不可能成为差异化武器，只能保持竞争均势（不掉队但也不领先）。",
    },
    {
      id: "q2",
      type: "single",
      prompt:
        "某药企研发出新药专利（V/R/I 都是），但商业化团队薄弱、推广乏力（O 否）。结果是：",
      options: [
        { id: "a", label: "持续竞争优势" },
        { id: "b", label: "暂时竞争优势" },
        { id: "c", label: "竞争均势" },
        { id: "d", label: "竞争劣势" },
      ],
      correct: ["b"],
      explanation:
        "VRI 都满足只缺 O → 暂时优势。专利期内还能赚钱，但因为组织无法充分利用，赚得不充分；专利到期后优势消失。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "下列哪些常见因素让一项资源“难以模仿（I）”？",
      options: [
        { id: "a", label: "历史路径依赖（如长期积累的品牌）" },
        { id: "b", label: "因果模糊（说不清为什么有效）" },
        { id: "c", label: "社会复杂性（文化、关系网络）" },
        { id: "d", label: "纯靠资金堆出来的设备" },
      ],
      correct: ["a", "b", "c"],
      explanation:
        "纯靠资金的资产是最容易被复制的——别人也能花钱买。a/b/c 是经典的“难以模仿”机制。",
    },
  ],
  tips: [
    "做 VRIO 时一项一项资源/能力分别评估，不要一锅炖。",
    "把 VRIO 与价值链结合：先用价值链找出关键活动 → 再用 VRIO 评估每个活动的资源。",
    "动态视角：今天的“稀缺”明年可能就普及，定期重评。",
    "O（组织）是最容易被忽视也最容易被低估的护城河——文化、流程、激励机制极难复制。",
  ],
  pitfalls: [
    "只看资源不看活动——“专利”本身不创造价值，使用专利的活动才创造价值。",
    "把规模/资金本身当持续优势——这两项最容易被有钱的对手追平。",
    "忽视 O，只盯着 V/R/I，结果“好资源用不出来”。",
    "把 VRIO 当四象限工具，混淆顺序——它是串行四问，不是平行评估。",
  ],
}
