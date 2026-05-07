import type { Framework } from "../types"

export const bcg: Framework = {
  slug: "bcg",
  number: 6,
  chapter: 2,
  nameZh: "BCG 矩阵",
  nameEn: "BCG Growth-Share Matrix",
  difficulty: "beginner",
  estimatedMinutes: 10,
  tagline:
    "用市场增长率 × 相对市场份额，把产品组合分四类，回答“钱该投到哪个产品上”。",
  definition: {
    tldr: "BCG 矩阵把产品按市场增长率（高/低）和相对市场份额（高/低）分四象限：明星、金牛、问题、瘦狗，指导资源配置。",
    details: [
      "波士顿咨询 1968 年提出，是产品组合管理的经典工具。",
      "横轴用“相对市场份额”（=自己份额÷最大对手份额），通常以 1.0 为分界，使用对数刻度。",
      "纵轴是“市场增长率”，行业平均（如 10%）通常作为分界线。",
      "气泡大小代表该产品对收入的贡献——大气泡更值得关注。",
    ],
  },
  concepts: [
    {
      title: "明星 Star（高增长 / 高份额）",
      description:
        "高增长市场中的领先者。需要持续投入维持地位；未来的金牛。",
    },
    {
      title: "金牛 Cash Cow（低增长 / 高份额）",
      description:
        "成熟市场中的领先者。现金流充沛，是其他产品的资金来源。",
    },
    {
      title: "问题 Question Mark（高增长 / 低份额）",
      description:
        "高增长市场但未占主导，需大量投入或果断退出，决策两极。",
    },
    {
      title: "瘦狗 Dog（低增长 / 低份额）",
      description:
        "增长慢且份额低。一般考虑退出或剥离，避免持续吸血。",
    },
  ],
  caseStudy: {
    title: "苹果产品组合（2026 视角）",
    company: "Apple Inc.",
    scenario:
      "用 BCG 看苹果当前产品线如何为公司创造现金、哪些是赌注、哪些可能逐步淡出。",
    analysis: [
      {
        label: "金牛：iPhone",
        content:
          "市占率高，市场已成熟（增长放缓），贡献绝大部分营收和现金流。",
      },
      {
        label: "明星：服务（App Store / iCloud）",
        content: "高增长且利润率高，带动整体生态价值。",
      },
      {
        label: "问题：Vision Pro / Apple Car",
        content:
          "新兴空间计算 / 智能驾驶市场增长极高，但苹果尚未占主导，需大额投入。",
      },
      {
        label: "瘦狗：iPod / HomePod mini",
        content:
          "市场已被手机和智能音箱主流玩家占据，份额低且增长低，逐步退出或并入其他产品线。",
      },
    ],
    takeaway:
      "BCG 不是一次性结论：今天的明星会变金牛，金牛会衰退为瘦狗。每年用 BCG 重新审视组合，决定下一年的预算流向。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt:
        "某产品在年增长 20% 的市场中排名第 3，份额 8%（第一名 25%）。它属于：",
      options: [
        { id: "a", label: "明星 Star" },
        { id: "b", label: "金牛 Cash Cow" },
        { id: "c", label: "问题 Question Mark" },
        { id: "d", label: "瘦狗 Dog" },
      ],
      correct: ["c"],
      explanation:
        "市场增长高（20%）但相对份额低（8/25=0.32 < 1.0），属于问题产品——值得加大投入或果断放弃。",
    },
    {
      id: "q2",
      type: "judge",
      prompt: "金牛产品的合理策略是“持续大额再投资”。",
      options: [
        { id: "t", label: "正确" },
        { id: "f", label: "错误" },
      ],
      correct: ["f"],
      explanation:
        "错。金牛的策略是“收割”——保持必要投入维持份额，把多余现金流转给明星和有潜力的问题产品。过度再投资是对金牛的浪费。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "下面哪些是 BCG 矩阵的常见误用（多选）？",
      options: [
        { id: "a", label: "把“增长慢”等同于“无价值”" },
        { id: "b", label: "用绝对份额而不是相对份额" },
        { id: "c", label: "对独立赛道的产品做交叉补贴决策" },
        { id: "d", label: "按象限自动决策，不考虑战略协同" },
      ],
      correct: ["a", "b", "c", "d"],
      explanation:
        "这四种都是常见误用。BCG 是辅助工具，不能替代战略判断与具体业务理解。",
    },
  ],
  tips: [
    "用对数横轴：相对份额从 0.1 到 10，1.0 为中线。",
    "每个气泡标注产品名 + 营收，让矩阵直接服务于资源配置讨论。",
    "至少每年重做一次，市场增长率与份额都在变。",
    "结合 GE 麦肯锡矩阵（更多维度）做交叉验证。",
  ],
  pitfalls: [
    "把“瘦狗”一刀切退出，忽略品牌完整性和现金贡献。",
    "高增长率定义模糊——必须先界定行业增长基准。",
    "忽略产品间协同（如 iPhone 带动 Watch / AirPods 销售）。",
    "BCG 假设“份额≈竞争力”，但小份额的高端品类可能利润率极高。",
  ],
}
