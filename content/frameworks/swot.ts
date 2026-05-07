import type { Framework } from "../types"

export const swot: Framework = {
  slug: "swot",
  number: 1,
  chapter: 1,
  nameZh: "SWOT 分析",
  nameEn: "SWOT Analysis",
  difficulty: "beginner",
  estimatedMinutes: 10,
  tagline:
    "把企业的内部能力（S/W）与外部环境（O/T）摆在一张 2×2 矩阵里，是制定战略最经典的起点。",
  definition: {
    tldr: "SWOT 是把企业放进一张 2×2 矩阵，看清自身优势、劣势、机会与威胁的战略规划工具。",
    details: [
      "S（Strengths）和 W（Weaknesses）描述的是企业的内部能力——可控、靠自身改变。",
      "O（Opportunities）和 T（Threats）描述的是外部环境——通常不可控，只能识别和应对。",
      "进一步可以做 SO/WO/ST/WT 交叉策略矩阵，把单纯的列表变成可执行的行动计划。",
    ],
  },
  concepts: [
    {
      title: "Strengths（优势）",
      description: "内部因素，组织相对竞争对手的强项，例如品牌、技术、渠道。",
    },
    {
      title: "Weaknesses（劣势）",
      description: "内部因素，组织相对竞争对手的弱项，例如成本结构、人才储备。",
    },
    {
      title: "Opportunities（机会）",
      description: "外部因素，市场或环境中可利用的有利条件，例如新兴市场、政策红利。",
    },
    {
      title: "Threats（威胁）",
      description:
        "外部因素，可能造成负面影响的力量，例如新进入者、替代品、监管变化。",
    },
  ],
  caseStudy: {
    title: "苹果公司 SWOT",
    company: "Apple Inc.",
    scenario:
      "作为全球市值最高的科技公司，苹果在硬件、软件、服务垂直整合上具备独特优势，但也面临供应链与监管多重压力。",
    analysis: [
      {
        label: "S 优势",
        content: "强品牌溢价、垂直整合生态、高利润率、忠诚用户群。",
      },
      {
        label: "W 劣势",
        content: "产品线相对窄、高端定价限制下沉市场、对单一爆款（iPhone）依赖高。",
      },
      {
        label: "O 机会",
        content: "服务与可穿戴持续增长、新兴市场用户升级、Vision 等空间计算赛道。",
      },
      {
        label: "T 威胁",
        content: "中国市场政策风险、供应链集中度、安卓生态竞争、欧盟反垄断。",
      },
    ],
    takeaway:
      "做 SWOT 不是为了把四象限填满，而是用 SO/ST 思考“用强项抓机会、防威胁”——苹果的服务业务正是 SO 的典型产出。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt: "下列哪一项最可能属于企业的“威胁（T）”？",
      options: [
        { id: "a", label: "公司刚获得 ISO 27001 认证" },
        { id: "b", label: "主要供应商被收购，未来可能涨价" },
        { id: "c", label: "员工平均工龄 8 年" },
        { id: "d", label: "新建成的数据中心" },
      ],
      correct: ["b"],
      explanation:
        "T 是外部、可能造成负面影响的因素。供应商被收购属于外部环境变化，且对企业不利。其他三项是内部资源/能力（S 或 W）。",
    },
    {
      id: "q2",
      type: "single",
      prompt: "市场份额连续两个季度下滑，最可能属于：",
      options: [
        { id: "a", label: "S 优势" },
        { id: "b", label: "W 劣势" },
        { id: "c", label: "O 机会" },
        { id: "d", label: "T 威胁" },
      ],
      correct: ["b"],
      explanation:
        "市场份额下滑反映企业自身竞争力相对下降，是内部表现的体现，归为劣势 W。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "下面哪些是 SWOT 分析做对的标志（多选）？",
      options: [
        { id: "a", label: "邀请跨职能团队共同列要素" },
        { id: "b", label: "每个象限尽量列得越多越好" },
        { id: "c", label: "对每条要素分析重要性与影响" },
        { id: "d", label: "形成 SO/WO/ST/WT 交叉策略" },
      ],
      correct: ["a", "c", "d"],
      explanation:
        "做对的 SWOT 强调多视角、有重要性排序、并产出可执行策略。盲目堆条目反而稀释焦点。",
    },
  ],
  tips: [
    "邀请跨职能团队（销售、产品、运营、财务）共同梳理，避免单一视角盲区。",
    "每条要素都标“重要性 1-5 + 影响 1-5”，按优先级聚焦真正关键的少数。",
    "至少每年回顾一次 SWOT，市场和能力都在变。",
    "把 SWOT 推到 TOWS（交叉策略）才能从描述变成行动。",
  ],
  pitfalls: [
    "把 SWOT 当 brainstorming 凑数，不区分重要性。",
    "S/W 与 O/T 混淆——记住：内部 vs 外部是核心分界。",
    "做完就归档，没产出对应策略与责任人。",
    "缺少数据支撑，全凭主观判断。",
  ],
}
