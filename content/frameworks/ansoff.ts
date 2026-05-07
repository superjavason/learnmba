import type { Framework } from "../types"

export const ansoff: Framework = {
  slug: "ansoff",
  number: 7,
  chapter: 2,
  nameZh: "安索夫矩阵",
  nameEn: "Ansoff Matrix",
  difficulty: "beginner",
  estimatedMinutes: 9,
  tagline:
    "用“产品×市场”的新与旧组合，给企业增长决策一张风险地图。",
  definition: {
    tldr: "安索夫矩阵描述四种增长战略——市场渗透、市场开发、产品开发、多元化——并由低到高排出风险等级。",
    details: [
      "Igor Ansoff 1957 年提出，是增长战略选择的经典工具。",
      "横轴是产品（现有/新），纵轴是市场（现有/新），形成 2×2。",
      "风险递增：市场渗透 < 市场开发 ≈ 产品开发 < 多元化。",
      "公司应根据自身能力、资源和风险偏好，循序渐进选择增长方向。",
    ],
  },
  concepts: [
    {
      title: "市场渗透 Market Penetration",
      description:
        "现有产品 + 现有市场。靠促销、提份额、增加使用频次。风险最低。",
    },
    {
      title: "市场开发 Market Development",
      description:
        "现有产品 + 新市场。靠新地区、新人群、新渠道。中等风险。",
    },
    {
      title: "产品开发 Product Development",
      description: "新产品 + 现有市场。靠创新、产品线扩展。中等风险。",
    },
    {
      title: "多元化 Diversification",
      description:
        "新产品 + 新市场。最激进、风险最高，常通过并购或新业务部门实现。",
    },
  ],
  caseStudy: {
    title: "星巴克的增长路径",
    company: "Starbucks",
    scenario: "用安索夫矩阵审视星巴克过去十年的关键增长动作。",
    analysis: [
      {
        label: "市场渗透",
        content: "星享卡 / 移动 App 点单，把存量用户的购买频次拉高。",
      },
      {
        label: "市场开发",
        content: "原有咖啡产品进入印度、越南、东欧等新地理市场。",
      },
      {
        label: "产品开发",
        content:
          "向同一群高粘性用户推出茶饮 Teavana、咖啡机 Verismo、Reserve 烘焙坊精品系列。",
      },
      {
        label: "多元化",
        content:
          "投资 Princi 烘焙、收购 Tata 茶叶（合资进印度）——新品类 + 新市场，风险最高。",
      },
    ],
    takeaway:
      "成功的多元化往往是“用现有能力撬动新市场”——星巴克借门店运营 + 高端品牌力进入烘焙与茶饮，比纯粹跨界（如做手机）成功率高。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt:
        "瑞幸把咖啡店开到马来西亚，是哪种增长战略？",
      options: [
        { id: "a", label: "市场渗透" },
        { id: "b", label: "市场开发" },
        { id: "c", label: "产品开发" },
        { id: "d", label: "多元化" },
      ],
      correct: ["b"],
      explanation:
        "现有产品（咖啡）进入新地理市场（马来西亚）——典型的市场开发，中等风险。",
    },
    {
      id: "q2",
      type: "single",
      prompt: "苹果发布 Vision Pro 进入空间计算市场，最贴近：",
      options: [
        { id: "a", label: "市场渗透" },
        { id: "b", label: "市场开发" },
        { id: "c", label: "产品开发（向现有用户推新品类）" },
        { id: "d", label: "多元化（新产品 + 新市场）" },
      ],
      correct: ["d"],
      explanation:
        "Vision Pro 是新品类（不是 iPhone/Mac 的延伸），瞄准空间计算这个新市场——属于多元化，风险最高。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "下列哪些是降低多元化风险的有效做法（多选）？",
      options: [
        { id: "a", label: "并购已有相关业务的成熟玩家" },
        { id: "b", label: "用与原业务共享的核心能力（如品牌、渠道）" },
        { id: "c", label: "完全独立运营，不与原业务联动" },
        { id: "d", label: "小规模试点 + 阶段性追加投资" },
      ],
      correct: ["a", "b", "d"],
      explanation:
        "完全独立反而失去协同优势。其他三种都是稳健多元化的常见做法。",
    },
  ],
  tips: [
    "增长不是越激进越好——多数公司应优先做市场渗透。",
    "用核心能力跨界：能复用品牌、渠道、客户关系的多元化更易成功。",
    "把每个象限分配预算 / KPI / 责任人，避免“四象限都要”导致资源稀释。",
    "结合 BCG 矩阵：明星和金牛优先做渗透；问题产品考虑产品开发或退出。",
  ],
  pitfalls: [
    "把“新产品”理解为微小升级——同质化的“新”不构成产品开发。",
    "盲目多元化（“风险高，但赢了赚大钱”）——多数案例最终亏损。",
    "把市场开发等同于“出海”——下沉市场、新渠道、新人群也是市场开发。",
    "忽略竞争对手的反应——你做渗透对手会反击。",
  ],
}
