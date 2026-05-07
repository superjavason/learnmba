import type { Framework } from "../types"

export const issuetree: Framework = {
  slug: "issuetree",
  number: 14,
  chapter: 3,
  nameZh: "问题树",
  nameEn: "Issue Tree",
  difficulty: "intermediate",
  estimatedMinutes: 11,
  tagline:
    "把大问题切成可分析的小问题——结构化思维的“树状外壳”。",
  definition: {
    tldr: "问题树通过 MECE 原则把核心问题递归分解为子问题，直到每个叶子节点可以直接获得数据或分析。",
    details: [
      "问题树是结构化解决问题的核心工具，常与假设驱动法、80/20 法则配合使用。",
      "构建问题树的核心：每一层向下分解必须 MECE，避免重复或遗漏。",
      "最经典的应用是利润树（Profit Tree）：利润 = 收入 - 成本，再继续分解。",
      "好的问题树让团队“看到全貌”，避免抓小放大。",
    ],
  },
  concepts: [
    { title: "1. 明确核心问题", description: "把核心要解决的问题写在树根（如：利润下滑）。" },
    { title: "2. 第一层 MECE 分解", description: "用核心驱动因素拆解（如收入 / 成本）。" },
    { title: "3. 持续向下细化", description: "每一层继续 MECE 分解，直到叶子节点可直接获取数据。" },
    { title: "4. 用数据 + 80/20 找重点", description: "对叶子节点定量分析，找出影响最大的少数因子。" },
  ],
  caseStudy: {
    title: "利润下降 15% 的问题树诊断",
    scenario:
      "某零售公司过去一年净利润下降 15%，CEO 要求快速定位根因。",
    analysis: [
      {
        label: "L1 拆解",
        content: "利润 = 收入 − 成本 → 收入下降 8% + 成本上升 5% 共同作用。",
      },
      {
        label: "L2 收入侧",
        content: "收入 = 销量 × 单价。销量持平，单价下滑 8% → 进入定价问题。",
      },
      {
        label: "L2 成本侧",
        content:
          "成本 = 固定成本 + 变动成本。固定成本占比 40% 持平；变动成本 + 8%（原材料价格上涨）。",
      },
      {
        label: "结论",
        content:
          "利润下滑根因：1) 单价下滑 8%（最大影响）2) 变动成本上涨 5%。聚焦“为何单价下滑”和“原材料对冲策略”。",
      },
    ],
    takeaway:
      "问题树让“利润下降”从模糊问题变成两个具体动作清单：定价 + 原材料采购。这就是结构化思维的力量。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt:
        "构建利润树时，最合理的第一层分解是：",
      options: [
        { id: "a", label: "按业务部门拆分" },
        { id: "b", label: "利润 = 收入 − 成本" },
        { id: "c", label: "按客户类型拆分" },
        { id: "d", label: "按时间周期拆分" },
      ],
      correct: ["b"],
      explanation:
        "利润树的标准第一层是会计恒等式：利润 = 收入 − 成本。这是最 MECE、最普适的拆分。其他维度可作为后续分支。",
    },
    {
      id: "q2",
      type: "single",
      prompt: "问题树的“叶子节点”应该具备的特征是：",
      options: [
        { id: "a", label: "尽可能抽象" },
        { id: "b", label: "可以直接获得数据或进行分析" },
        { id: "c", label: "包含越多变量越好" },
        { id: "d", label: "由 CEO 亲自负责" },
      ],
      correct: ["b"],
      explanation:
        "叶子节点的目的是“可分析”——抽象到最后还无法用数据验证就没意义。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "下列哪些是构建问题树的常见错误（多选）？",
      options: [
        { id: "a", label: "层级过深，每个叶子节点过细，失去操作性" },
        { id: "b", label: "同一层使用混合维度（同时按地区 + 产品 + 客户）" },
        { id: "c", label: "用数据先验证假设再细化" },
        { id: "d", label: "分支不 MECE，存在交集与遗漏" },
      ],
      correct: ["a", "b", "d"],
      explanation:
        "c 是好做法（验证驱动）。其他三项都是常见错误。",
    },
  ],
  tips: [
    "第一层用财务恒等式（如利润 = 收入 − 成本）几乎总是最优解。",
    "层级控制在 3-4 层，再深就难落地。",
    "每个分支用同一维度切分（不混维度）。",
    "结合 80/20：找出贡献最大的少数叶子，集中资源解决。",
  ],
  pitfalls: [
    "把问题树当“好看就行”，不基于业务真实结构。",
    "每个分支都要展开，导致树过于庞大无法决策。",
    "层级混乱（地区下挂客户类型，再下挂时间），失去 MECE。",
    "分解到底层却没数据支撑，停留在概念层。",
  ],
}
