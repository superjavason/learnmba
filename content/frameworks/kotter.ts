import type { Framework } from "../types"

export const kotter: Framework = {
  slug: "kotter",
  number: 21,
  chapter: 5,
  nameZh: "科特变革八步法",
  nameEn: "Kotter's 8 Steps of Change",
  difficulty: "intermediate",
  estimatedMinutes: 12,
  tagline:
    "组织变革成功率不到 30%——科特八步是把这个比例提升到 70% 的标准路径。",
  definition: {
    tldr: "科特八步法（John Kotter, 1996）描述组织成功变革必须依次走完的八个步骤：从“建立紧迫感”到“融入企业文化”。",
    details: [
      "Harvard 商学院 John Kotter 教授研究 100+ 公司变革案例总结而成。",
      "前 3 步：建立变革氛围（紧迫感、领导联盟、愿景）。",
      "中 3 步：让全员参与变革（沟通、赋权、短期成就）。",
      "后 2 步：固化变革成果（巩固、文化融合）。",
      "跳过任何一步都极大降低成功率——尤其是“紧迫感”和“短期成就”。",
    ],
  },
  concepts: [
    { title: "1. 建立紧迫感 Create Urgency", description: "用数据 + 故事让组织意识到“不变就死”。" },
    { title: "2. 建立领导联盟 Build Coalition", description: "组织有影响力的高层 + 中层 + 关键人推动变革。" },
    { title: "3. 制定愿景 Form Vision", description: "用一句话能描述变革的未来形态与路径。" },
    { title: "4. 沟通愿景 Communicate Vision", description: "通过多渠道、反复（10x）传达愿景。" },
    { title: "5. 赋权行动 Empower Action", description: "移除障碍、授权员工，让他们能行动。" },
    { title: "6. 创造短期成就 Short-term Wins", description: "6-18 月内拿出可见成果，建立信心。" },
    { title: "7. 巩固成果 Consolidate Gains", description: "不松懈，把短期成果转化为持续动能。" },
    { title: "8. 融入文化 Anchor in Culture", description: "把新做法制度化、流程化，写进 DNA。" },
  ],
  caseStudy: {
    title: "传统零售企业数字化转型",
    company: "某 30 年传统零售商",
    scenario:
      "某零售连锁年营收 200 亿但线上仅占 12%，CEO 用科特八步推动全面数字化。",
    analysis: [
      {
        label: "1. 紧迫感",
        content:
          "公开 PK 内部数据：电商占比 12% vs 同行 28%，按当前轨迹 3 年内现金流转负。",
      },
      {
        label: "2. 联盟",
        content:
          "成立由 CEO + COO + CTO + 3 位区域总裁组成的“数字化指挥部”。",
      },
      {
        label: "3-4. 愿景 + 沟通",
        content:
          "口号“全员上线、全场景在线”——通过年会、月度 Town Hall、内部周报反复传达。",
      },
      {
        label: "5. 赋权",
        content:
          "授予门店店长“可以拒绝不利于线上化的总部要求”的权力——打破传统科层障碍。",
      },
      {
        label: "6. 短期成就",
        content:
          "选 50 家试点门店，3 个月内线上销售占比从 12% 升到 35%，全员发奖金，案例上头版。",
      },
      {
        label: "7-8. 巩固 + 文化",
        content:
          "把数字化指标纳入所有人的 KPI；把试点经验制定为公司“数字门店标准”；半年一次复盘。",
      },
    ],
    takeaway:
      "变革失败常因为跳过 1（不够紧迫）或 6（没短期成就）。前者让员工不动，后者让员工放弃——两个都是科特八步的命门。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt: "科特八步中，最容易被跳过且代价最高的两步是：",
      options: [
        { id: "a", label: "1. 紧迫感 + 6. 短期成就" },
        { id: "b", label: "2. 联盟 + 4. 沟通愿景" },
        { id: "c", label: "5. 赋权 + 8. 文化融合" },
        { id: "d", label: "3. 愿景 + 7. 巩固" },
      ],
      correct: ["a"],
      explanation:
        "“紧迫感”不到位，员工根本不动；“短期成就”缺失，员工失去信心放弃。这两步是科特强调最多的关键。",
    },
    {
      id: "q2",
      type: "judge",
      prompt: "建立变革紧迫感时，越制造危机感越好。",
      options: [
        { id: "t", label: "正确" },
        { id: "f", label: "错误" },
      ],
      correct: ["f"],
      explanation:
        "错。过度危机感会让员工陷入恐慌、自保。Kotter 强调要“真实的紧迫感”——用客观数据让员工自己得出“必须变”的结论。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "下列哪些是科特八步常见的实施错误（多选）？",
      options: [
        { id: "a", label: "跳过紧迫感直接谈愿景" },
        { id: "b", label: "联盟成员都是 C 级高管，缺少中层和一线" },
        { id: "c", label: "短期成就来得过早，把侥幸当能力" },
        { id: "d", label: "宣布胜利过早，未完成第 7-8 步" },
      ],
      correct: ["a", "b", "c", "d"],
      explanation: "这四种全是 Kotter 在书中强调的常见错误。变革像马拉松，前面 6 步只是起跑——真正的固化在 7-8。",
    },
  ],
  tips: [
    "前 3 步打基础，慢就是快——别急着跳到行动。",
    "联盟里至少有 1 个反对派——能听到不同声音的变革才稳。",
    "愿景写完“能否一句话讲清楚”是检验标准。",
    "短期成就选 6-12 月可见的、可量化的、与战略相关的。",
  ],
  pitfalls: [
    "把紧迫感等同于威胁——员工被吓跑而不是主动改变。",
    "联盟全是高管，中层和一线游离在外。",
    "宣布“胜利”过早，第 7-8 步没做完，半年后回到原点。",
    "把变革当一次性项目——其实是持续运营。",
  ],
}
