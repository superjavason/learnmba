import type { Framework } from "../types"

export const npvFramework: Framework = {
  slug: "npv",
  number: 19,
  chapter: 4,
  nameZh: "NPV / IRR 投资决策",
  nameEn: "NPV / IRR Investment Decision",
  difficulty: "advanced",
  estimatedMinutes: 14,
  tagline:
    "未来的现金流值多少“今天的钱”？这是企业一切投资决策的根问题。",
  definition: {
    tldr: "NPV（净现值）把未来现金流贴现到今天再减初始投资；IRR（内部收益率）是让 NPV=0 的折现率。两者是企业投资决策的核心方法。",
    details: [
      "NPV = ∑ 现金流ᵢ ÷ (1+折现率)ⁱ − 初始投资。NPV > 0 → 接受；NPV < 0 → 拒绝。",
      "IRR 是 NPV = 0 时的折现率，无法解析求解，需迭代。IRR > 资本成本 → 项目可行。",
      "两者结合使用：NPV 显示绝对收益，IRR 显示相对收益率，便于跨项目比较。",
      "敏感性分析：调整折现率或现金流，看 NPV 变化幅度，识别项目脆弱性。",
    ],
  },
  concepts: [
    {
      title: "现金流 Cash Flow",
      description:
        "每年净流入（流出为负）。初始投资在第 0 年，常为大额负值。",
    },
    {
      title: "折现率 Discount Rate",
      description:
        "把未来钱换算成今天钱的“贴现率”。常用 WACC（加权平均资本成本）。",
    },
    {
      title: "NPV 决策规则",
      description: "NPV > 0 接受 / NPV < 0 拒绝 / NPV = 0 临界。",
    },
    {
      title: "IRR 决策规则",
      description: "IRR > 资本成本（最低期望收益）→ 接受。",
    },
  ],
  caseStudy: {
    title: "新工厂 vs 数字化升级 — 该投哪个？",
    scenario:
      "某公司有 500 万预算，两个选项：A 建新工厂（5 年现金流 [200, 200, 200, 200, 200]）；B 数字化系统（5 年现金流 [50, 100, 200, 350, 400]）。资本成本 10%。",
    analysis: [
      {
        label: "A 新工厂",
        content:
          "初始 −500，5 年各 +200。NPV(10%) ≈ +258 万；IRR ≈ 28.6%。前期收益高，回本快。",
      },
      {
        label: "B 数字化系统",
        content:
          "初始 −500，现金流递增 [50,100,200,350,400]。NPV(10%) ≈ +268 万；IRR ≈ 22.6%。NPV 略高但 IRR 较低。",
      },
      {
        label: "决策",
        content:
          "两者 NPV 接近（B 略胜），但 A 的 IRR 显著更高（28.6% vs 22.6%）+ 现金流前置。若资金紧张优先 A；若长期增长优先 B。",
      },
      {
        label: "敏感性",
        content:
          "若资本成本升至 15%，A NPV 变 +170 万，B 变 +143 万——A 更稳健（前期现金流不受贴现影响大）。",
      },
    ],
    takeaway:
      "NPV 看“值不值”，IRR 看“好不好”，敏感性看“稳不稳”。三者合一才是完整的投资决策。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt:
        "项目初始投资 100 万，下一年现金流入 110 万。在折现率 10% 时，NPV 等于：",
      options: [
        { id: "a", label: "10 万" },
        { id: "b", label: "0 万" },
        { id: "c", label: "−10 万" },
        { id: "d", label: "100 万" },
      ],
      correct: ["b"],
      explanation:
        "NPV = −100 + 110 / 1.10 = −100 + 100 = 0。IRR 恰好等于折现率时 NPV = 0。",
    },
    {
      id: "q2",
      type: "judge",
      prompt: "项目 IRR 越高就越值得投资。",
      options: [
        { id: "t", label: "正确" },
        { id: "f", label: "错误" },
      ],
      correct: ["f"],
      explanation:
        "错。IRR 高的项目可能规模小（绝对收益少）；多个非常规现金流时 IRR 可能有多个解；跨项目比较应优先 NPV。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "下列哪些是 NPV / IRR 分析的常见局限（多选）？",
      options: [
        { id: "a", label: "对折现率假设非常敏感" },
        { id: "b", label: "现金流预测的不确定性" },
        { id: "c", label: "忽略战略价值（如平台效应）" },
        { id: "d", label: "无法处理不同期限的项目对比" },
      ],
      correct: ["a", "b", "c", "d"],
      explanation:
        "这四种都是经典局限。实战中需结合“战略期权”、敏感性分析、多场景模拟来弥补。",
    },
  ],
  tips: [
    "做敏感性分析：折现率 ±2% 看 NPV 变化（高敏感 = 高风险）。",
    "IRR 在非常规现金流（多次正负切换）时可能有多个解——优先用 NPV。",
    "用市场无风险利率 + 行业风险溢价估算折现率（CAPM）。",
    "考虑“战略期权价值”——某些项目本身规模小但开启未来巨大可能（如平台投资）。",
  ],
  pitfalls: [
    "用单一折现率覆盖所有项目，不考虑项目特定风险。",
    "现金流过于乐观，没做悲观情景分析。",
    "只看 IRR 不看规模——5% × 10 亿 远胜 50% × 100 万。",
    "忽略隐性成本（如机会成本、人员投入）。",
  ],
}
