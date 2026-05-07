import type { Framework } from "../types"

export const mece: Framework = {
  slug: "mece",
  number: 12,
  chapter: 3,
  nameZh: "MECE 原则",
  nameEn: "Mutually Exclusive, Collectively Exhaustive",
  difficulty: "intermediate",
  estimatedMinutes: 8,
  tagline:
    "把问题切干净——彼此独立、完全穷尽，是结构化思维的最低门槛。",
  definition: {
    tldr: "MECE 是问题分解的核心原则：分类要相互独立（无交集）、完全穷尽（无遗漏）。",
    details: [
      "MECE = Mutually Exclusive, Collectively Exhaustive，由麦肯锡 Barbara Minto 推广。",
      "ME（独立）：各类别之间无交集，避免重复计算。",
      "CE（穷尽）：各类别加起来覆盖全部情况，避免遗漏。",
      "MECE 是金字塔原理、问题树、80/20 法则的共同基础。",
    ],
  },
  concepts: [
    {
      title: "ME 独立 Mutually Exclusive",
      description: "类别之间没有交集，一个事物只能归入一个类别。",
    },
    {
      title: "CE 穷尽 Collectively Exhaustive",
      description: "所有类别加起来覆盖全部情况，没有遗漏。",
    },
    {
      title: "好分类的标志",
      description: "用同一维度切分（如年龄、地区、收入），不混维度。",
    },
    {
      title: "常见分解维度",
      description: "地理 / 客户类型 / 时间 / 成本结构 / 价值链环节。",
    },
  ],
  caseStudy: {
    title: "公司客户分类是否 MECE？",
    scenario:
      "某 To B 公司把客户分为：① 大企业 ② 中小企业 ③ 国企 ④ 外资企业 ⑤ 高净值客户。判断是否 MECE。",
    analysis: [
      {
        label: "ME 独立性问题",
        content:
          "国企可能同时是大企业（重复）；外资也可能是大企业（重复）；高净值客户是 To C 维度，与 To B 维度混淆。",
      },
      {
        label: "CE 穷尽性问题",
        content:
          "“大 / 中小”是规模维度，“国企 / 外资”是所有制维度——混合不同维度后既有交集又有遗漏（如民营中小企业可能漏分类）。",
      },
      {
        label: "正确做法",
        content:
          "选一个主维度切分。例如规模：大 / 中 / 小 / 微（穷尽）。所有制单独成另一维度独立分析。",
      },
    ],
    takeaway:
      "MECE 的诀窍是“一次只切一个维度”——“客户分类”不能既按规模又按所有制，否则必然出现交集与遗漏。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt: "把消费者分为：男性 / 女性 / 高净值客户。这个分类：",
      options: [
        { id: "a", label: "MECE 正确" },
        { id: "b", label: "违反 ME（有交集）" },
        { id: "c", label: "违反 CE（有遗漏）" },
        { id: "d", label: "既违反 ME 也违反 CE" },
      ],
      correct: ["d"],
      explanation:
        "高净值客户里也有男性女性（违反 ME），同时混合了不同维度（性别 vs 收入）必然有遗漏（违反 CE）。",
    },
    {
      id: "q2",
      type: "single",
      prompt: "把销售按地区分为：华东 / 华南 / 华北 / 华中 / 西部 / 海外。这个分类：",
      options: [
        { id: "a", label: "MECE 正确" },
        { id: "b", label: "违反 ME" },
        { id: "c", label: "违反 CE（漏了东北）" },
        { id: "d", label: "维度混合错误" },
      ],
      correct: ["c"],
      explanation:
        "ME 没问题（地区不重叠），但东北地区被遗漏，违反 CE。常见做法是在“华北”含东北，或单列“东北”。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "下列哪些组合属于 MECE 分解（多选）？",
      options: [
        { id: "a", label: "成本 = 固定成本 + 变动成本" },
        { id: "b", label: "时间 = 工作日 + 节假日" },
        { id: "c", label: "客户 = 新客户 + 老客户 + VIP" },
        { id: "d", label: "员工 = 全职 + 兼职 + 外包" },
      ],
      correct: ["a", "b", "d"],
      explanation:
        "c 错——VIP 既可能是新客户又可能是老客户，违反 ME。其他三项是经典的 MECE 分解。",
    },
  ],
  tips: [
    "“一次只切一个维度”是 MECE 的不二法则。",
    "做完分类后回头检查：随机举一个例子，能且只能归入一个类别吗？",
    "用“+ 其他”兜底，是确保穷尽性的实用技巧（但要谨慎使用）。",
    "MECE 不是非黑即白的判断，2x2 矩阵是天然 MECE。",
  ],
  pitfalls: [
    "混合维度（如规模 + 所有制 + 价值），必然破坏 MECE。",
    "为了 MECE 而 MECE——分类必须有商业意义。",
    "层级过深，最底层的“叶子”过细反而失去操作性。",
    "认为 MECE 必然合理——逻辑严谨不等于洞察深刻。",
  ],
}
