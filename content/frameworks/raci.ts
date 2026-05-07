import type { Framework } from "../types"

export const raci: Framework = {
  slug: "raci",
  number: 22,
  chapter: 5,
  nameZh: "RACI 矩阵",
  nameEn: "RACI Matrix",
  difficulty: "beginner",
  estimatedMinutes: 8,
  tagline:
    "项目里“谁干、谁负责、谁建议、谁知会”——RACI 把责任分工清清楚楚。",
  definition: {
    tldr: "RACI 矩阵是项目管理中明确角色与责任的工具，把每个任务分配 4 类角色：Responsible（执行）、Accountable（问责）、Consulted（咨询）、Informed（知情）。",
    details: [
      "用一张表格：行是任务、列是角色，单元格填 R/A/C/I。",
      "每个任务必须只有 1 个 A（避免“无人最终负责”）。",
      "每个任务至少 1 个 R（避免“没人执行”）。",
      "C/I 数量不限——但太多 C 会拖慢决策。",
      "RACI 是跨部门协作和项目启动的标配工具。",
    ],
  },
  concepts: [
    {
      title: "R · Responsible 责任人",
      description: "实际执行任务的人，可以多人。",
    },
    {
      title: "A · Accountable 问责人",
      description: "最终承担成败的人，必须只有 1 个。",
    },
    {
      title: "C · Consulted 咨询人",
      description: "提供专业意见、双向沟通的人。",
    },
    {
      title: "I · Informed 知情人",
      description: "需要了解结果但不参与决策的人，单向通知。",
    },
  ],
  caseStudy: {
    title: "新产品上市的 RACI",
    scenario: "公司要推出新一代旗舰产品，涉及产品 / 工程 / 营销 / 销售 / 法务多部门。",
    analysis: [
      {
        label: "“产品定义”",
        content:
          "产品经理 R+A，工程师 C，营销 C，销售 I，法务 I。一个 A、明确 R 与建议方。",
      },
      {
        label: "“市场推广方案”",
        content:
          "营销 R+A，产品经理 C，销售 C，工程师 I，法务 C（合规审核）。",
      },
      {
        label: "“产品发布会”",
        content:
          "营销 + 产品经理 R，营销总监 A（最终拍板），销售 C，工程师 I。",
      },
    ],
    takeaway:
      "RACI 用一次开会就能把所有跨部门冲突预先暴露——“谁说了算”这个看似简单的问题，其实是项目失败的最大原因。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt: "下列哪一项是 RACI 的硬规则？",
      options: [
        { id: "a", label: "每个任务必须只有 1 个 A" },
        { id: "b", label: "C 和 I 必须各 1 个" },
        { id: "c", label: "R 不能多于 3 个" },
        { id: "d", label: "项目经理一定是 A" },
      ],
      correct: ["a"],
      explanation:
        "“每任务只有 1 个 A”是 RACI 的核心硬规则——避免责任分散。其他三项都不是规则。",
    },
    {
      id: "q2",
      type: "judge",
      prompt: "RACI 中，A 和 R 可以是同一个人。",
      options: [
        { id: "t", label: "正确" },
        { id: "f", label: "错误" },
      ],
      correct: ["t"],
      explanation:
        "可以。在小项目或单人任务中，执行人和问责人常是同一人，标记为 R+A 或 A/R。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "下列哪些是 RACI 矩阵设计的常见错误（多选）？",
      options: [
        { id: "a", label: "一个任务有 2 个 A" },
        { id: "b", label: "任务全表都标 C，导致每次都开十方会议" },
        { id: "c", label: "重要任务只有 I 没有 R" },
        { id: "d", label: "矩阵做完后从不更新" },
      ],
      correct: ["a", "b", "c", "d"],
      explanation:
        "这四种都是 RACI 设计的常见错误。RACI 不是“一次性表格”——项目变化时要更新。",
    },
  ],
  tips: [
    "项目启动会上花 30 分钟做 RACI，省 30 天后续扯皮。",
    "把 A 写在所有人都看得到的地方（项目首页 / 周报）。",
    "每完成一个里程碑回头校准——发现 RACI 与现实脱节立刻调整。",
    "C 和 I 区别：C 是“双向，需要建议”，I 是“单向，仅通知”。",
  ],
  pitfalls: [
    "一个任务两个 A——决策时永远扯皮。",
    "全员都是 C——表面尊重所有人，实际拖死决策。",
    "RACI 写完不沟通——只有项目经理一个人知道。",
    "把 RACI 当“岗位说明书”而非“项目执行工具”——颗粒度搞错。",
  ],
}
