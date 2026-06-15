import type { Framework } from "../types"

export const scqa: Framework = {
  slug: "scqa",
  number: 26,
  chapter: 3,
  nameZh: "SCQA 开场结构",
  nameEn: "SCQA Framework",
  difficulty: "beginner",
  estimatedMinutes: 10,
  tagline:
    "情境—冲突—疑问—解答：麦肯锡用来抓住读者注意力的开场公式。",
  definition: {
    tldr: "SCQA 是 Barbara Minto 提出的开场结构：先给对方熟悉的「情境」，引出打破平衡的「冲突」，激发「疑问」，再亮出你的「解答」——让结论显得是顺理成章的回答。",
    details: [
      "S=Situation 情境：从对方已知、认同的事实切入，建立共识。",
      "C=Complication 冲突：抛出变化或矛盾，打破情境的平衡，制造张力。",
      "Q=Question 疑问：冲突自然引出对方心里的问题（通常隐含、不必明写）。",
      "A=Answer 解答：你的核心结论，正好回答这个疑问——它正是金字塔的塔尖。",
      "SCQA 是金字塔原理的「序言（Introduction）」，负责把读者引到塔尖；金字塔主体再展开论证。",
    ],
  },
  concepts: [
    { title: "S 情境 Situation", description: "对方熟悉、无争议的背景，先建立「我们在说同一件事」的共识。" },
    { title: "C 冲突 Complication", description: "情境里出现的变化/问题/威胁——这是引起注意的「钩子」。" },
    { title: "Q 疑问 Question", description: "冲突在对方脑中触发的问题，常隐含为「那怎么办？」。" },
    { title: "A 解答 Answer", description: "你的中心结论，直接回答 Q——后续全文都为它服务。" },
    { title: "四种变体", description: "标准式(SCA)、开门见山式(ASC)、突出忧虑式(CSA)、突出信心式(QSCA)——按场景调换顺序。" },
  ],
  caseStudy: {
    title: "用 SCQA 写一封争取预算的邮件开头",
    company: "某 SaaS 公司增长团队",
    scenario:
      "增长负责人要向 CFO 申请追加 200 万元投放预算，邮件第一段必须让 CFO 愿意读下去。",
    analysis: [
      {
        label: "S 情境",
        content: "过去 12 个月，我们的付费获客成本（CAC）稳定在 480 元，LTV/CAC 维持在 3.2，单位经济健康。",
      },
      {
        label: "C 冲突",
        content: "但本季度一个新渠道把 CAC 压到了 260 元，目前每月仅能消化 30 万预算就触顶——这个窗口竞争对手尚未进入。",
      },
      {
        label: "Q 疑问",
        content: "（CFO 心里）是否、以及该投入多少去抢占这个低成本窗口？",
      },
      {
        label: "A 解答",
        content: "建议追加 200 万元在 Q3 全部投入该渠道，预计带来 7700 个付费用户、回收周期 4 个月。",
      },
    ],
    takeaway:
      "好的 SCQA 让 CFO 在第一段就明白「有个划算且限时的机会」，结论（要 200 万）于是变成顺理成章的答案，而不是突兀的索取。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt: "SCQA 中的「C（冲突）」最核心的作用是：",
      options: [
        { id: "a", label: "打破情境的平衡，制造张力，勾起对方的关注" },
        { id: "b", label: "罗列尽可能多的背景数据" },
        { id: "c", label: "直接给出最终的解决方案" },
        { id: "d", label: "对对方提出质疑和批评" },
      ],
      correct: ["a"],
      explanation:
        "冲突是 SCQA 的「钩子」——它在对方认同的情境上制造变化或矛盾，让对方产生「那怎么办？」的疑问，从而愿意听你的解答。",
    },
    {
      id: "q2",
      type: "single",
      prompt: "当对方时间极其紧张、需要你「先说结论」时，应采用哪种 SCQA 变体？",
      options: [
        { id: "a", label: "标准式：S → C → Q → A" },
        { id: "b", label: "开门见山式：A → S → C（先抛答案，再补背景与冲突）" },
        { id: "c", label: "突出忧虑式：C → S → A" },
        { id: "d", label: "完全不用 SCQA，直接堆数据" },
      ],
      correct: ["b"],
      explanation:
        "开门见山式把 Answer 提到最前，先给结论再回填情境与冲突——适合高层、时间紧、或对方已了解背景的场合。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "下列哪些是写好 SCQA 情境（S）的正确做法（多选）？",
      options: [
        { id: "a", label: "从对方已知、认同的事实切入" },
        { id: "b", label: "保持中立、无争议，避免一上来就引发反驳" },
        { id: "c", label: "把你的核心结论藏在情境里，让对方自己猜" },
        { id: "d", label: "为后面的「冲突」埋好伏笔" },
      ],
      correct: ["a", "b", "d"],
      explanation:
        "情境的任务是建立共识、为冲突铺垫，所以要无争议、对方认同，并自然引向冲突。结论属于 A，不该藏在 S 里。",
    },
  ],
  tips: [
    "情境一定从对方「点头认同」的事实开始，否则后面全盘皆输。",
    "冲突要具体、可感——数字、变化、威胁比形容词更有张力。",
    "疑问通常不必写出来，让冲突自然在对方脑中触发即可。",
    "写完先问：我的 A 是否精确回答了 Q？答非所问是最常见的失败。",
  ],
  pitfalls: [
    "情境太长太细，读者还没到冲突就走神。",
    "冲突与解答对不上——A 回答的不是 C 引出的那个 Q。",
    "一上来就讲争议性观点当情境，引发对方防御。",
    "把 SCQA 当公式硬套，忽略对方真正关心的问题。",
  ],
}
