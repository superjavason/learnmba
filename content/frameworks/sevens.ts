import type { Framework } from "../types"

export const sevens: Framework = {
  slug: "sevens",
  number: 16,
  chapter: 3,
  nameZh: "麦肯锡 7S 模型",
  nameEn: "McKinsey 7S Framework",
  difficulty: "advanced",
  estimatedMinutes: 12,
  tagline:
    "组织变革要成功，七个要素必须互相一致——少了一个就会被绊住。",
  definition: {
    tldr: "麦肯锡 7S 模型把组织拆为 7 个相互关联的要素：3 个硬件（战略 / 结构 / 系统）+ 4 个软件（共同价值观 / 技能 / 员工 / 风格），强调七者必须相互一致。",
    details: [
      "1980 年代由 McKinsey 顾问 Tom Peters 与 Robert Waterman 提出，是变革管理的经典框架。",
      "硬件（Hard）：战略 Strategy、结构 Structure、系统 Systems——可见、可文档化。",
      "软件（Soft）：共同价值观 Shared Values、技能 Skills、员工 Staff、风格 Style——隐性、靠文化。",
      "核心洞察：硬件改了软件没改 → 变革失败；这是最常见的并购整合失败原因。",
    ],
  },
  concepts: [
    { title: "Strategy 战略 (硬)", description: "组织如何获取竞争优势的计划。" },
    { title: "Structure 结构 (硬)", description: "组织架构、汇报关系、职能分工。" },
    { title: "Systems 系统 (硬)", description: "日常流程、IT 系统、决策机制。" },
    { title: "Shared Values 共同价值观 (软)", description: "组织文化的核心，是其他 6S 的中心。" },
    { title: "Skills 技能 (软)", description: "组织和员工拥有的核心能力。" },
    { title: "Staff 员工 (软)", description: "员工配置、招聘、培训、晋升。" },
    { title: "Style 管理风格 (软)", description: "领导力风格、决策方式、互动模式。" },
  ],
  caseStudy: {
    title: "诺基亚的 7S 失衡",
    company: "Nokia (2007-2013)",
    scenario:
      "iPhone 发布后，诺基亚试图转向智能手机，但最终失败被微软收购。用 7S 看为什么。",
    analysis: [
      {
        label: "Strategy（变了）",
        content: "战略从“功能机霸主”转向智能机 + 系统竞争。",
      },
      {
        label: "Structure（半变）",
        content: "组织架构调整缓慢，仍保留功能机的事业部强势影响力。",
      },
      {
        label: "Systems（没变）",
        content:
          "决策流程仍按功能机时代的“质量优先 + 慢迭代”运作，跟不上 iOS / Android 节奏。",
      },
      {
        label: "Shared Values（没变）",
        content:
          "工程师文化（“做最可靠的硬件”）持续，但智能机时代要的是“软件 + 生态”。",
      },
      {
        label: "Style + Staff",
        content:
          "中层管理风格官僚化；招进来的员工大多是硬件背景，软件人才弱势。",
      },
      {
        label: "Skills",
        content: "硬件 + 制造能力极强，但软件平台 / 生态运营能力远弱于苹果谷歌。",
      },
    ],
    takeaway:
      "诺基亚改了战略却没改其他 6S，导致整个组织像“拉车的马还在走，但车头已经换成飞机引擎”——必然撕裂。7S 的提示是：变革要七管齐下。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt: "下列哪一项属于 7S 的“软件”要素？",
      options: [
        { id: "a", label: "组织架构图" },
        { id: "b", label: "OKR 系统" },
        { id: "c", label: "管理风格" },
        { id: "d", label: "三年战略规划" },
      ],
      correct: ["c"],
      explanation:
        "管理风格 Style 属于 4 个软件之一（隐性、靠文化）。a 结构、b 系统、d 战略都是硬件。",
    },
    {
      id: "q2",
      type: "judge",
      prompt: "7S 模型的 7 个要素是“相互独立”的，可以单独优化。",
      options: [
        { id: "t", label: "正确" },
        { id: "f", label: "错误" },
      ],
      correct: ["f"],
      explanation:
        "错。7S 的核心主张正是“七者相互依赖、必须一致”——单独优化任何一个会破坏整体平衡。共同价值观居于中心。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "并购后整合失败常见的 7S 失衡（多选）：",
      options: [
        { id: "a", label: "战略 + 结构变了，但价值观与员工文化未融合" },
        { id: "b", label: "系统迁移过快，员工技能跟不上" },
        { id: "c", label: "管理风格冲突（被收购方扁平 vs 收购方科层）" },
        { id: "d", label: "新的统一愿景没有有效传达到一线员工" },
      ],
      correct: ["a", "b", "c", "d"],
      explanation:
        "这四种全是经典的并购整合失败原因——本质都是“硬件变了，软件没跟上”。",
    },
  ],
  tips: [
    "并购 / 转型时，从“共同价值观”这个中心开始诊断，再看其他 6S 的偏差。",
    "硬件容易改（架构图重画一周），软件难改（文化改 3-5 年）——预算和时间要倾斜软件。",
    "把 7S 当“一致性体检”而不是“变革方案”——它告诉你哪里不一致，不告诉你怎么改。",
    "结合科特变革八步法：7S 诊断现状，科特设计行动路径。",
  ],
  pitfalls: [
    "只改硬件不改软件，是变革失败 #1 原因。",
    "把 7S 当“写 PPT 的工具”，没真正看七者的一致性。",
    "忽略“共同价值观”这个中心要素，单独看其他 6 个。",
    "认为软件无法改——文化可以改，但需要 3+ 年和坚定领导力。",
  ],
}
