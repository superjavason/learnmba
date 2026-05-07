import type { Framework } from "../types"

export const pyramid: Framework = {
  slug: "pyramid",
  number: 11,
  chapter: 3,
  nameZh: "金字塔原理",
  nameEn: "Pyramid Principle",
  difficulty: "intermediate",
  estimatedMinutes: 12,
  tagline:
    "结论先行，论点支撑论点——麦肯锡顾问的写作和表达圣经。",
  definition: {
    tldr: "金字塔原理是一种思维与表达方法：把核心结论放在顶端，下层论点支撑上层、横向归类分组、纵向逻辑递进，让沟通直击重点。",
    details: [
      "由麦肯锡前咨询顾问 Barbara Minto 在《金字塔原理》中系统化，是商业写作 / 汇报 / 邮件的通用结构。",
      "核心三句话：结论先行（Top-Down）、以上统下、归类分组、逻辑递进。",
      "SCQA（Situation-Complication-Question-Answer）是开篇引出问题的标准范式。",
      "金字塔越严格，结构化思维越扎实——这是顾问最重要的元能力。",
    ],
  },
  concepts: [
    { title: "结论先行 Top-Down", description: "最重要的观点放在最前——读者最少时间最大收获。" },
    { title: "以上统下 Logical Hierarchy", description: "下一层每条论点必须支撑（解释/证明）上一层。" },
    { title: "归类分组 Grouping", description: "同一层级的论点按 MECE 分类，不重叠不遗漏。" },
    { title: "逻辑递进 Logical Order", description: "横向论点之间有合理顺序：时间、结构、重要性。" },
    { title: "SCQA 开篇法", description: "Situation（背景）→ Complication（冲突）→ Question（问题）→ Answer（答案）。" },
  ],
  caseStudy: {
    title: "用金字塔原理写一封建议邮件",
    scenario:
      "某零售公司销售额连续两个季度下滑 8%，CEO 要求市场负责人写一份恢复增长的建议。",
    analysis: [
      {
        label: "S 背景",
        content: "公司过去三年保持 15% 年增长，零售龙头地位稳固。",
      },
      {
        label: "C 冲突",
        content: "近两季度销售额下滑 8%，主要竞争对手在线上份额上升 5%。",
      },
      {
        label: "Q 问题",
        content: "如何在 6 个月内恢复增长？",
      },
      {
        label: "A 答案（金字塔顶）",
        content: "建议三轨并行恢复增长：① 加速线上化；② 重塑核心品类；③ 升级会员体系。",
      },
      {
        label: "支撑论点",
        content:
          "每条建议下都列“为什么这样做（数据 + 逻辑）+ 怎么做（执行计划）”——形成三层金字塔。",
      },
    ],
    takeaway:
      "好的金字塔结构让 CEO 在 30 秒内拿到决策需要的全部信息——“三件事，立即行动”。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt: "金字塔原理最核心的特征是：",
      options: [
        { id: "a", label: "结论先行（最重要的放最前）" },
        { id: "b", label: "数据越多越好" },
        { id: "c", label: "金字塔层级越多越严谨" },
        { id: "d", label: "用尽各种修辞与隐喻" },
      ],
      correct: ["a"],
      explanation:
        "结论先行是金字塔原理的根本——读者第一句话就拿到核心观点，时间越紧越能体现价值。",
    },
    {
      id: "q2",
      type: "single",
      prompt: "下列哪个开头最符合 SCQA 顺序？",
      options: [
        {
          id: "a",
          label: "我们应当立刻关闭欧洲业务并把投入转向亚太。",
        },
        {
          id: "b",
          label:
            "公司过去三年欧洲业务持续盈利（S），但俄乌冲突导致 2026 Q1 转亏损（C），如何止损（Q）？我们建议关闭欧洲并转向亚太（A）。",
        },
        {
          id: "c",
          label: "经过 100 页详细分析，最终我们推荐方案 B。",
        },
        {
          id: "d",
          label: "亚太市场近期增长很快，可以考虑投资。",
        },
      ],
      correct: ["b"],
      explanation:
        "b 完整呈现了 SCQA：背景 → 冲突 → 问题 → 答案，结构清晰，回答最快。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "下列哪些是金字塔结构的正确做法（多选）？",
      options: [
        { id: "a", label: "每一层有 3-7 个论点（避免过多）" },
        { id: "b", label: "下层论点支撑上层论点（不脱节）" },
        { id: "c", label: "同一层论点遵循 MECE" },
        { id: "d", label: "把次要的细节放到顶层吸引眼球" },
      ],
      correct: ["a", "b", "c"],
      explanation:
        "顶层只放最核心的结论；次要细节属于底层支撑事实。其他三项是金字塔的标准准则。",
    },
  ],
  tips: [
    "邮件 / 汇报 / 文档第一句话先把结论说出来。",
    "用 SCQA 引出读者关注的问题，再给答案。",
    "横向 3-5 个论点最佳，过多不利记忆。",
    "纵向不超过 4 层（不然读者迷失）。",
  ],
  pitfalls: [
    "“先讲背景再讲结论”——读者已经走神。",
    "上下层论点不连贯（“以上统下”做不到）。",
    "同一层论点重叠（破坏 MECE）。",
    "把推理过程当结论，让读者自己拼。",
  ],
}
