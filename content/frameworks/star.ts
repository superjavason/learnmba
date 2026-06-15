import type { Framework } from "../types"

export const star: Framework = {
  slug: "star",
  number: 28,
  chapter: 3,
  nameZh: "STAR 经历陈述法",
  nameEn: "STAR Method",
  difficulty: "beginner",
  estimatedMinutes: 9,
  tagline:
    "情境—任务—行动—结果：把一段经历讲成有说服力故事的结构。",
  definition: {
    tldr: "STAR 是讲述「亲身经历 / 成果」的结构化方法：交代情境（Situation）与你承担的任务（Task），重点描述你采取的行动（Action），最后用可量化的结果（Result）收尾——常用于面试、述职、复盘与个人成就汇报。",
    details: [
      "S=Situation 情境：事情发生的背景与挑战，简洁交代「当时是什么处境」。",
      "T=Task 任务：你具体要负责达成的目标或难题，明确「我的责任是什么」。",
      "A=Action 行动：你（不是「我们」）实际采取的关键步骤——这是 STAR 的主体，占最大篇幅。",
      "R=Result 结果：行动带来的可量化成果与影响，最好附上数据和复盘收获。",
      "STAR 让「经历」从流水账变成「挑战—应对—成果」的故事线，是行为面试（Behavioral Interview）的标准应答框架。",
    ],
  },
  concepts: [
    { title: "S 情境 Situation", description: "用 1-2 句交代背景和挑战，给听者一个具体的舞台。" },
    { title: "T 任务 Task", description: "你被赋予/主动承担的目标，明确个人责任边界。" },
    { title: "A 行动 Action", description: "你做的关键动作，用「我」而非「我们」，展现个人贡献与思考。" },
    { title: "R 结果 Result", description: "可量化的成果 + 影响 + 个人收获，闭环整个故事。" },
    { title: "黄金配比", description: "S+T 简短、A 最详细、R 用数据——避免把时间花在背景上。" },
  ],
  caseStudy: {
    title: "面试中用 STAR 回答「讲一次你解决冲突的经历」",
    scenario:
      "面试官问：「请讲一个你在团队中化解严重分歧、并推动事情落地的例子。」候选人用 STAR 作答。",
    analysis: [
      {
        label: "S 情境",
        content: "我在上家公司带 6 人小组做 App 改版，临近发版时设计和开发就「是否保留旧导航」吵到僵持，进度卡了一周。",
      },
      {
        label: "T 任务",
        content: "作为项目负责人，我要在不延期的前提下，让双方达成一个有依据的决定并恢复推进。",
      },
      {
        label: "A 行动",
        content: "我没有直接拍板，而是把争论转成数据问题：组织了一次 80 人灰度 A/B 测试，定义「7 日留存」为唯一判据；同时分别和设计、开发一对一沟通，确认大家都认这个标准。",
      },
      {
        label: "R 结果",
        content: "测试显示新导航 7 日留存高 4.2 个百分点，双方当场接受结论，版本按原计划上线；上线后整体留存提升约 3%。这件事让我学会用客观标准取代立场之争。",
      },
    ],
    takeaway:
      "STAR 把「我处理过冲突」这种空泛说法，变成了「具体挑战 + 我的具体做法 + 可量化结果」，可信度和说服力天差地别。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt: "在 STAR 结构中，哪一部分应当占据最大篇幅、是回答的主体？",
      options: [
        { id: "a", label: "A 行动（Action）——你具体做了什么" },
        { id: "b", label: "S 情境（Situation）——把背景讲得越细越好" },
        { id: "c", label: "T 任务（Task）" },
        { id: "d", label: "四部分应当严格平均分配时间" },
      ],
      correct: ["a"],
      explanation:
        "Action 展现的是你个人的思考与贡献，是面试官最想听的部分；情境和任务应简洁交代，把篇幅留给行动和结果。",
    },
    {
      id: "q2",
      type: "single",
      prompt: "用 STAR 讲述个人成就时，下列哪种表述最恰当？",
      options: [
        { id: "a", label: "「我们团队当时做了很多努力，最后还不错。」" },
        { id: "b", label: "「我设计了 A/B 测试并定义留存为判据，最终新方案留存高 4.2 个百分点，版本按期上线。」" },
        { id: "c", label: "「这个项目背景很复杂，我先讲十分钟前因后果。」" },
        { id: "d", label: "「反正结果挺好的，过程就不细说了。」" },
      ],
      correct: ["b"],
      explanation:
        "b 用「我」凸显个人行动，并以可量化结果收尾——正是 STAR 想要的「我做了什么、带来什么结果」。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "下列哪些是使用 STAR 的常见错误（多选）？",
      options: [
        { id: "a", label: "情境讲得过长，迟迟进入不了行动" },
        { id: "b", label: "全程用「我们」，听不出你个人到底做了什么" },
        { id: "c", label: "结果没有任何可量化的数据或影响" },
        { id: "d", label: "用具体数字说明结果与个人收获" },
      ],
      correct: ["a", "b", "c"],
      explanation:
        "STAR 的常见坑是：背景冗长、用「我们」模糊个人贡献、结果空泛无数据。用数字说明结果（d）恰恰是正确做法。",
    },
  ],
  tips: [
    "答题前先想清楚 R（结果），再倒推哪段 S/T/A 最能撑起它。",
    "行动部分多用「我」：我分析、我决定、我推动，凸显个人贡献。",
    "结果尽量量化：百分比、金额、时间、排名都比形容词有力。",
    "准备 5-6 个 STAR 故事，覆盖领导力、冲突、失败、创新等高频问题。",
  ],
  pitfalls: [
    "情境 + 任务讲太久，留给行动和结果的时间不足。",
    "通篇「我们」，听者不知道你个人到底做了什么。",
    "只讲做了什么（A），没讲带来什么结果（R），故事没有闭环。",
    "结果浮夸或无法量化，可信度下降。",
  ],
}
