import type { Framework } from "../types"

export const pestel: Framework = {
  slug: "pestel",
  number: 2,
  chapter: 1,
  nameZh: "PESTEL 分析",
  nameEn: "PESTEL Analysis",
  difficulty: "beginner",
  estimatedMinutes: 10,
  tagline:
    "用 6 个外部维度——政治、经济、社会、技术、环境、法律——把宏观环境扫描得明明白白。",
  definition: {
    tldr: "PESTEL 是评估宏观环境对企业影响的扫描工具，覆盖政治、经济、社会、技术、环境、法律六大外部维度。",
    details: [
      "PESTEL 关注的是企业基本无法改变、但必须识别和适应的外部因素。",
      "进入新市场、做长期战略规划、识别系统性风险时，PESTEL 是首选起点。",
      "PESTEL 不直接给出结论，它给的是结构化提问清单——避免战略团队漏看关键变量。",
    ],
  },
  concepts: [
    {
      title: "P 政治 Political",
      description: "政府政策、政治稳定性、贸易协议、监管强度。",
    },
    {
      title: "E 经济 Economic",
      description: "增长率、利率、汇率、通胀、失业率、消费能力。",
    },
    {
      title: "S 社会 Social",
      description: "人口结构、文化价值观、生活方式、教育水平、健康趋势。",
    },
    {
      title: "T 技术 Technological",
      description: "新技术、研发投入、数字化水平、技术过时风险。",
    },
    {
      title: "E 环境 Environmental",
      description: "气候变化、自然资源、环保法规、可持续要求。",
    },
    {
      title: "L 法律 Legal",
      description: "劳动法、知识产权、消费者保护、数据隐私。",
    },
  ],
  caseStudy: {
    title: "新能源车企进入欧盟",
    company: "某中国电动车品牌",
    scenario:
      "某中国电动车品牌评估 2026 年进入欧盟市场，需用 PESTEL 系统识别风险与机会。",
    analysis: [
      {
        label: "P 政治",
        content: "欧盟对中国电动车反补贴关税、地缘政治紧张可能加征额外限制。",
      },
      {
        label: "E 经济",
        content: "欧元汇率波动、欧洲消费者价格敏感度高、新能源补贴部分退坡。",
      },
      {
        label: "S 社会",
        content: "环保意识强、对中国品牌信任度仍在建立、电动车接受度区域差异大（北欧高、南欧低）。",
      },
      {
        label: "T 技术",
        content: "充电桩网络密度差异、本地化软件 OTA 法规、智能座舱本地化适配。",
      },
      {
        label: "E 环境",
        content: "电池碳足迹申报要求（CBAM）、回收体系合规。",
      },
      {
        label: "L 法律",
        content: "GDPR 数据合规、UN R155 网络安全认证、产品责任法。",
      },
    ],
    takeaway:
      "PESTEL 让团队从“出海”模糊愿景，转为 6 类具体风险清单，每类对应“应对负责人 + 时间表”，才能落地。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt: "下列哪一项最属于 PESTEL 的“E（经济）”维度？",
      options: [
        { id: "a", label: "GDPR 数据合规要求" },
        { id: "b", label: "10 年期国债收益率上行" },
        { id: "c", label: "Z 世代环保意识高涨" },
        { id: "d", label: "5G 商用普及率" },
      ],
      correct: ["b"],
      explanation:
        "利率/收益率属于经济维度。GDPR=L 法律，环保意识=S 社会，5G=T 技术。",
    },
    {
      id: "q2",
      type: "judge",
      prompt: "PESTEL 主要关注企业内部资源与能力。",
      options: [
        { id: "t", label: "正确" },
        { id: "f", label: "错误" },
      ],
      correct: ["f"],
      explanation:
        "PESTEL 关注的是外部宏观环境。内部资源/能力评估属于 SWOT、VRIO、价值链等工具。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "做 PESTEL 时，下列哪些做法是好习惯（多选）？",
      options: [
        { id: "a", label: "为每个因素标注影响方向（机会/威胁）和强度" },
        { id: "b", label: "覆盖所有 6 个维度，避免遗漏" },
        { id: "c", label: "只看本国，无需考虑全球趋势" },
        { id: "d", label: "定期更新，不当一次性产物" },
      ],
      correct: ["a", "b", "d"],
      explanation:
        "全球化时代外部因素相互影响，只看本国是误区。其他三项都是 PESTEL 落地为决策工具的关键。",
    },
  ],
  tips: [
    "为每条因素标“影响方向 + 强度 + 时间窗”，PESTEL 才能驱动行动。",
    "不同国家/区域分别做一份，跨境业务尤其重要。",
    "至少每年回顾一次，遇到大事件（疫情、地缘冲突）即时更新。",
    "与 SWOT 的 OT 联动：PESTEL 输出的机会/威胁直接喂给 SWOT。",
  ],
  pitfalls: [
    "把 PESTEL 写成新闻摘要，没说“对我业务意味着什么”。",
    "只做政治和经济，忽略环境/法律——这两类越来越重要。",
    "罗列因素却没有人负责跟进。",
    "把短期波动当长期趋势，反之亦然。",
  ],
}
