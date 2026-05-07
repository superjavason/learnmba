import type { Framework } from "../types"

export const blueocean: Framework = {
  slug: "blueocean",
  number: 8,
  chapter: 2,
  nameZh: "蓝海战略",
  nameEn: "Blue Ocean Strategy",
  difficulty: "intermediate",
  estimatedMinutes: 12,
  tagline:
    "不在血腥的红海里跟人拼刺刀，而是创造一片没人竞争的新市场。",
  definition: {
    tldr: "蓝海战略主张通过价值创新——同时降低成本与提升价值——开辟未竞争的市场空间，而不是在已有红海中肉搏。",
    details: [
      "金伟灿与莫博涅 2005 年在《蓝海战略》中提出，已研究 30+ 行业 100+ 案例。",
      "核心是“价值创新”——不要把差异化和低成本看作非此即彼，要同时实现。",
      "ERRC 四步动作框架：消除（Eliminate）、减少（Reduce）、增加（Raise）、创造（Create）。",
      "用“价值曲线”可视化你与行业平均的差异：相同 → 红海；不同 → 蓝海。",
    ],
  },
  concepts: [
    {
      title: "红海 Red Ocean",
      description:
        "现有市场，既定边界与规则，企业靠比拼份额、价格、效率求生存。",
    },
    {
      title: "蓝海 Blue Ocean",
      description:
        "未竞争的市场空间，通过价值创新创造新需求，竞争变得无关紧要。",
    },
    {
      title: "ERRC · 消除",
      description: "去除行业中被视为理所当然但其实无价值的因素。",
    },
    {
      title: "ERRC · 减少",
      description: "降低行业标准水平以下、过度供给的因素。",
    },
    {
      title: "ERRC · 增加",
      description: "提升明显高于行业标准的因素。",
    },
    {
      title: "ERRC · 创造",
      description: "提供行业从未有过的因素，创造新需求。",
    },
  ],
  caseStudy: {
    title: "太阳马戏团 Cirque du Soleil",
    company: "Cirque du Soleil",
    scenario:
      "传统马戏行业自 70 年代起持续衰退（动物保护、儿童娱乐替代品涌现）。太阳马戏团重新定义了马戏。",
    analysis: [
      {
        label: "消除",
        content:
          "明星演员（不依赖知名马戏明星压阵）、动物（避开高昂训养成本和动物保护舆论）、多舞台 / 中场销售。",
      },
      {
        label: "减少",
        content:
          "过度的杂技危险性（不再玩命比拼难度）、马戏团的喧闹氛围。",
      },
      {
        label: "增加",
        content:
          "艺术性（与现代舞、戏剧融合）、现场音乐配置、场地与道具的视觉设计水准。",
      },
      {
        label: "创造",
        content:
          "故事情节、主题表演、剧院氛围——把马戏与百老汇融合，吸引高消费的成人观众。",
      },
    ],
    takeaway:
      "蓝海不是“做不一样的产品”，而是“同时大幅减少和大幅增加价值要素”——既降低了动物 / 明星等高成本，又把单价从马戏（$20）拉到剧院（$80+）。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt:
        "蓝海战略最核心的主张是：",
      options: [
        { id: "a", label: "在已有市场内做到极致差异化" },
        { id: "b", label: "靠规模经济压低成本，赢得价格战" },
        { id: "c", label: "同时降低成本 + 提升价值，开辟新市场空间" },
        { id: "d", label: "并购竞争对手以降低竞争强度" },
      ],
      correct: ["c"],
      explanation:
        "蓝海战略的精髓是“价值创新”——把差异化和低成本同时实现，跳出非此即彼的传统选择。",
    },
    {
      id: "q2",
      type: "judge",
      prompt: "ERRC 四个动作中，“消除”和“减少”都是为了降低成本。",
      options: [
        { id: "t", label: "正确" },
        { id: "f", label: "错误" },
      ],
      correct: ["t"],
      explanation:
        "正确。消除和减少都直接降低成本结构，与“增加”和“创造”（提升价值）配合，实现价值创新。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "下列哪些产品/品牌属于蓝海战略的经典案例（多选）？",
      options: [
        { id: "a", label: "Nintendo Wii（创造体感游戏新人群）" },
        { id: "b", label: "Yellow Tail 红酒（去掉葡萄酒的复杂术语，增加易饮性）" },
        { id: "c", label: "可口可乐发布更多口味的可乐" },
        { id: "d", label: "宜家（自助物流 + 平板包装 + 便宜设计感）" },
      ],
      correct: ["a", "b", "d"],
      explanation:
        "可口可乐多口味属于产品延伸，仍在红海。其他三个都通过同时降低成本 + 创造新价值开辟了蓝海。",
    },
  ],
  tips: [
    "先画出你和主要对手在 8-10 个关键因素上的“价值曲线”，重叠部分越多越说明你在红海。",
    "ERRC 四问要平衡——光“增加 / 创造”会失控成本，光“消除 / 减少”会失去价值。",
    "蓝海不是永久的——成功的蓝海最终会有跟随者，要持续做新的价值创新。",
    "小心“可见的蓝海陷阱”——市场未开发可能是因为根本没有需求。",
  ],
  pitfalls: [
    "把蓝海理解为“小众市场”——蓝海应该是“未竞争的大市场”。",
    "ERRC 只做加法（增加 / 创造），结果成本失控，无法盈利。",
    "误把渐进改良当蓝海——价值曲线必须显著区别于行业平均。",
    "忽略可行性测试，盲目追求“前所未有”导致产品脱离用户需求。",
  ],
}
