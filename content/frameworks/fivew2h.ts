import type { Framework } from "../types"

export const fivew2h: Framework = {
  slug: "fivew2h",
  number: 29,
  chapter: 3,
  nameZh: "5W2H 分析法",
  nameEn: "5W2H Method",
  difficulty: "beginner",
  estimatedMinutes: 9,
  tagline:
    "七问定全局：What/Why/Where/When/Who/How/How much，一张清单想清楚说明白。",
  definition: {
    tldr: "5W2H 用七个问题——是什么、为什么、在哪、何时、谁、怎么做、多少成本——系统地拆解一件事或一个方案。它既是「检查清单」防止遗漏，也是把复杂事情讲清楚的结构化表达模板。",
    details: [
      "5 个 W：What（做什么）、Why（为什么做）、Where（在哪做）、When（何时做）、Who（谁来做）。",
      "2 个 H：How（怎么做）、How much（成本 / 数量是多少）。",
      "起源于二战军工与质量管理，是 PDCA、工作计划、需求澄清的通用结构。",
      "用于「想清楚」：逐项发问，避免计划遗漏关键维度。",
      "用于「讲清楚」：按七问组织汇报，让方案、通知、需求一次说全，减少来回追问。",
    ],
  },
  concepts: [
    { title: "What 做什么", description: "事情/任务/产品的核心内容与目标，先界定清楚对象。" },
    { title: "Why 为什么", description: "目的、动机、必要性——最容易被跳过、却最该先问的一项。" },
    { title: "Where / When", description: "地点/场景 与 时间/节点，划定空间与时间边界。" },
    { title: "Who 谁", description: "责任人、参与者、对象——明确「谁负责、对谁做」。" },
    { title: "How / How much", description: "实施方法与步骤；以及成本、数量、预算等可量化投入。" },
  ],
  caseStudy: {
    title: "用 5W2H 写一份清晰的活动方案通知",
    company: "某公司市场部",
    scenario:
      "市场部要在公司内部发起「新产品体验官招募」活动，负责人用 5W2H 把通知一次写全，避免同事反复来问。",
    analysis: [
      {
        label: "What 做什么",
        content: "招募 50 名内部员工作为新版 App 的「体验官」，提前试用并提交反馈。",
      },
      {
        label: "Why 为什么",
        content: "在公开发布前用真实用户视角发现致命体验问题，降低上线后的差评与返工风险。",
      },
      {
        label: "Where / When 在哪 / 何时",
        content: "线上参与（企业微信群 + 内测包）；报名截止 6/20，试用期 6/23–7/4，反馈会 7/5。",
      },
      {
        label: "Who 谁",
        content: "面向全体员工自愿报名，市场部小李统筹，产品经理负责答疑与收集反馈。",
      },
      {
        label: "How / How much 怎么做 / 多少",
        content: "扫码报名→发放内测包→按问卷模板提交反馈；预算 1 万元（50 份体验官礼品 + 1 次抽奖）。",
      },
    ],
    takeaway:
      "一份覆盖 5W2H 的通知，把「做什么、为什么、在哪、何时、谁、怎么做、花多少」一次讲全——同事看完就能行动，几乎不用再来回追问。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt: "5W2H 中，最容易被忽略、却决定一件事「该不该做」的是哪一项？",
      options: [
        { id: "a", label: "Why（为什么做）——目的与必要性" },
        { id: "b", label: "When（何时做）" },
        { id: "c", label: "Where（在哪做）" },
        { id: "d", label: "How much（花多少）" },
      ],
      correct: ["a"],
      explanation:
        "人们常常直接跳到 What 和 How，却忘了先问 Why。目的不清，后面的执行细节再完善也可能是「把错的事做对」。",
    },
    {
      id: "q2",
      type: "single",
      prompt: "下列哪个选项正确列出了 5W2H 中的「2H」？",
      options: [
        { id: "a", label: "How（怎么做）与 How much（多少成本/数量）" },
        { id: "b", label: "How（怎么做）与 Who（谁来做）" },
        { id: "c", label: "How（怎么做）与 When（何时）" },
        { id: "d", label: "How much（多少）与 Why（为什么）" },
      ],
      correct: ["a"],
      explanation:
        "2H 指 How（方法/步骤）和 How much（成本、数量、预算）；Who/When/Why 属于 5W。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "关于 5W2H 的用途，下列哪些说法正确（多选）？",
      options: [
        { id: "a", label: "作为检查清单，防止计划遗漏关键维度" },
        { id: "b", label: "作为表达模板，让通知/需求/方案一次讲全" },
        { id: "c", label: "可用于工作计划、需求澄清、问题分析等多种场景" },
        { id: "d", label: "七个维度必须每次都长篇展开，缺一不可" },
      ],
      correct: ["a", "b", "c"],
      explanation:
        "5W2H 既能查漏（清单）又能表达（模板），适用场景广泛；但应按需取舍，无关维度可一笔带过，不必为凑齐而硬写。",
    },
  ],
  tips: [
    "先问 Why，再问 What/How——目的清楚了，方法才有方向。",
    "写通知/派活时按 5W2H 过一遍，能大幅减少「这个谁负责？什么时候？」的追问。",
    "How much 不只是钱，也包括人力、时间、数量等可量化投入。",
    "维度可裁剪：与本事无关的 W/H 一句带过即可，别为凑齐而注水。",
  ],
  pitfalls: [
    "只答 What 和 How，跳过 Why，做了「正确地做错事」。",
    "Who 含糊（「相关同事」），导致没人真正负责。",
    "When 没有明确节点，计划变成没有截止日的愿望。",
    "把 5W2H 当僵化公式，每项都强行展开，反而冗长。",
  ],
}
