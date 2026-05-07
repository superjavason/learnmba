import type { Framework } from "../types"

export const stp: Framework = {
  slug: "stp",
  number: 9,
  chapter: 2,
  nameZh: "STP 分析",
  nameEn: "Segmentation, Targeting, Positioning",
  difficulty: "beginner",
  estimatedMinutes: 10,
  tagline:
    "营销战略的三步曲：先把市场切开，再选要打的那块，最后告诉客户为什么选你。",
  definition: {
    tldr: "STP 是营销战略的核心方法：市场细分（Segmentation）→ 目标选择（Targeting）→ 市场定位（Positioning）。",
    details: [
      "由 Philip Kotler 在《营销管理》中系统化，是 4P/7P 之前的战略层工具。",
      "S：把整体市场按地理 / 人口 / 心理 / 行为切成有意义的子群体。",
      "T：评估每个子群体的吸引力、自身能力，选 1 个或几个为目标。",
      "P：决定在目标客户心智中占据的独特位置——通过差异化的价值主张。",
    ],
  },
  concepts: [
    {
      title: "S 市场细分 Segmentation",
      description:
        "把异质市场切成内部同质、彼此差异的子群体，常用变量：地理 / 人口 / 心理 / 行为。",
    },
    {
      title: "T 目标选择 Targeting",
      description:
        "评估细分市场吸引力（规模 / 增长 / 利润）和自身能力，选 1-N 个为目标。",
    },
    {
      title: "P 市场定位 Positioning",
      description:
        "在目标客户心智中占据的位置——差异化、可信、有吸引力。",
    },
    {
      title: "三种 Targeting 策略",
      description:
        "无差异（同一产品全市场）、差异化（不同产品不同细分）、集中（聚焦少数细分）。",
    },
  ],
  caseStudy: {
    title: "蜜雪冰城的 STP",
    company: "蜜雪冰城",
    scenario: "茶饮市场已是红海，蜜雪冰城靠极致 STP 杀出一条路。",
    analysis: [
      {
        label: "S 细分",
        content:
          "按收入 + 地理：高线城市高客单 vs 下沉市场低客单；按人群：学生 / 蓝领 / 高端白领。",
      },
      {
        label: "T 目标",
        content:
          "聚焦下沉市场（三四线及以下）+ 学生 / 蓝领群体——价格敏感但规模巨大。",
      },
      {
        label: "P 定位",
        content:
          "“便宜的快乐” — 4 元柠檬水 / 6 元奶茶。在“极致性价比”维度上拉到行业最低，让消费者“无脑买”。",
      },
      {
        label: "结果",
        content:
          "门店数全球第一（30000+），让喜茶 / 奈雪等高端品牌不敢下沉。",
      },
    ],
    takeaway:
      "好的 STP 让目标客户一句话就能描述你：“便宜”就是蜜雪冰城的 P。定位过多反而让人记不住。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt: "“按生活方式与价值观把消费者分群”属于：",
      options: [
        { id: "a", label: "地理变量" },
        { id: "b", label: "人口变量" },
        { id: "c", label: "心理变量" },
        { id: "d", label: "行为变量" },
      ],
      correct: ["c"],
      explanation:
        "心理变量（psychographic）就是按生活方式、价值观、个性、兴趣分群。a 地理 b 人口 d 行为（如使用频率、忠诚度）。",
    },
    {
      id: "q2",
      type: "single",
      prompt:
        "Tesla 早期只卖高端 Model S 给环保 / 科技尝鲜型用户。这是哪种 Targeting 策略？",
      options: [
        { id: "a", label: "无差异营销" },
        { id: "b", label: "差异化营销" },
        { id: "c", label: "集中营销" },
        { id: "d", label: "区域营销" },
      ],
      correct: ["c"],
      explanation:
        "聚焦于一个或少数细分市场（高端环保科技尝鲜者）= 集中营销。等品牌建立后再向下扩展（Model 3）。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "下列哪些是“好定位”的标志（多选）？",
      options: [
        { id: "a", label: "差异化（与竞品区别明显）" },
        { id: "b", label: "可信（企业能力支撑得起）" },
        { id: "c", label: "对客户有吸引力（解决真实痛点）" },
        { id: "d", label: "覆盖所有可能的客户群体" },
      ],
      correct: ["a", "b", "c"],
      explanation:
        "好定位是“窄而深”，不是“宽而浅”。试图覆盖所有人 = 没有定位。",
    },
  ],
  tips: [
    "细分变量要选“能解释购买行为差异”的，而不是凑数量。",
    "目标选择时画“吸引力 × 能力”二维矩阵，避免只看大不看自己合不合适。",
    "定位用“一句话描述”——讲不清就还没成型。",
    "感知图（Perceptual Map）是检验定位的好工具，画出竞品空缺。",
  ],
  pitfalls: [
    "细分太细导致每个子群体规模太小，不经济。",
    "目标客户太多 = 没有目标客户。",
    "定位贪多——“高端 + 性价比 + 创新 + 可靠”几乎是反 STP。",
    "定位与产品现实脱节——客户用了一次就识破。",
  ],
}
