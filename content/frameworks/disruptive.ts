import type { Framework } from "../types"

export const disruptive: Framework = {
  slug: "disruptive",
  number: 24,
  chapter: 6,
  nameZh: "颠覆性创新",
  nameEn: "Disruptive Innovation",
  difficulty: "advanced",
  estimatedMinutes: 13,
  tagline:
    "今天瞄准低端的简单产品，明年可能就是巨头的掘墓人——这是颠覆者最隐蔽的进攻路径。",
  definition: {
    tldr: "颠覆性创新（Christensen 1997）描述：起初性能低于主流的“简单廉价产品”进入被巨头忽视的低端或新市场，随时间快速改进性能，最终颠覆既有领导者。",
    details: [
      "Clayton Christensen 在《创新者的窘境》中提出，是过去 30 年最有影响力的战略洞察之一。",
      "核心机制：颠覆者起步性能不如主流，但成本结构低 + 性能改进速度快 → 在主流公司“向上”追求高利润时被反超。",
      "两种颠覆类型：低端颠覆（先卖给“被过度服务”的低端客户）+ 新市场颠覆（创造原本不存在的需求）。",
      "“创新者的窘境”：成熟公司的“好”管理（听最赚钱客户、追高利润、用现有指标）反而让它们对颠覆视而不见。",
      "经典案例：硬盘（5.25 寸 → 3.5 寸 → 2.5 寸）、个人电脑（DEC 小型机 → IBM PC）、智能手机（Nokia → iPhone）、电动车（Tesla 入门款）。",
    ],
  },
  concepts: [
    {
      title: "维持性创新 Sustaining",
      description: "现有领导者向高端客户提供更好性能/利润——是常规迭代，不是颠覆。",
    },
    {
      title: "低端颠覆 Low-end Disruption",
      description: "进入“被过度服务”的低端，性价比高 → 逐步上行。如 Walmart vs 百货公司。",
    },
    {
      title: "新市场颠覆 New-Market Disruption",
      description: "创造主流原本不服务的市场——非消费者变消费者。如 Sony 收音机、Vanguard 指数基金。",
    },
    {
      title: "性能轨迹 Performance Trajectory",
      description: "颠覆者性能改进速度 > 主流客户需求增长速度时，颠覆发生。",
    },
  ],
  caseStudy: {
    title: "Tesla 与传统车企",
    company: "Tesla 2008-2024",
    scenario:
      "Tesla 2008 年发布 Roadster（高端跑车）→ Model S → Model 3 → Model Y → 实现“向下”+“向上”双向冲击。这究竟算颠覆吗？",
    analysis: [
      {
        label: "起步：高端切入",
        content:
          "与 Christensen 经典“低端颠覆”相反——Tesla 从最高端 Roadster 起步，避开传统车企竞争最强的中端。",
      },
      {
        label: "新市场颠覆",
        content:
          "把“电动车”变成主流——把不愿买当时丑陋低续航电动车的消费者变成 Tesla 用户，更接近“新市场颠覆”。",
      },
      {
        label: "性能轨迹反转",
        content:
          "续航 / 智能 / 自动驾驶等维度，Tesla 改进速度（每年大版本 OTA）远超传统车企（5 年大改款）。",
      },
      {
        label: "传统车企的窘境",
        content:
          "Toyota / VW 已有强大燃油车业务（最赚钱客户在那），转向电车意味着自我同类相残——典型“创新者窘境”。",
      },
    ],
    takeaway:
      "Tesla 案例提示：颠覆未必都从低端开始，但“性能轨迹快 + 既有玩家被自己最赚钱业务困住”是不变的颠覆条件。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt: "下列哪种最符合 Christensen 定义的“颠覆性创新”？",
      options: [
        { id: "a", label: "苹果向 iPhone 用户推出更高分辨率的 Pro 版" },
        { id: "b", label: "蜜雪冰城用 4 元柠檬水切入价格敏感的下沉市场" },
        { id: "c", label: "iPhone 16 比 iPhone 15 性能提升 20%" },
        { id: "d", label: "新一代 GPU 比上一代快 30%" },
      ],
      correct: ["b"],
      explanation:
        "蜜雪冰城用低端简单产品切入被忽视的低端市场，逐步成为门店数全球第一——典型低端颠覆。其他三项都是维持性创新。",
    },
    {
      id: "q2",
      type: "judge",
      prompt: "颠覆性创新的关键不是产品起步性能更好，而是改进速度更快 + 成本结构更优。",
      options: [
        { id: "t", label: "正确" },
        { id: "f", label: "错误" },
      ],
      correct: ["t"],
      explanation:
        "正确。这是 Christensen 理论的核心——颠覆者起步性能往往不如主流，但成本和改进速度让它能“向上”追赶并最终超越。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "成熟企业为什么对颠覆视而不见（多选）？",
      options: [
        { id: "a", label: "听最赚钱客户的需求 → 这些客户不喜欢颠覆者的产品" },
        { id: "b", label: "用现有 KPI（利润率、客户满意度）评估，颠覆产品都“看起来很差”" },
        { id: "c", label: "颠覆者起步规模太小，不值得分配资源关注" },
        { id: "d", label: "现有产品在自家产品线中是“最赚钱”，不愿同类相残" },
      ],
      correct: ["a", "b", "c", "d"],
      explanation:
        "这四种全是 Christensen 提出的“好管理者反而被颠覆”的根源。要破解，需要单独的创新组织 + 不同的评估指标。",
    },
  ],
  tips: [
    "成熟公司想自我颠覆，最有效是“独立创新部门 + 独立 KPI”——别让主业用同一套指标杀掉颠覆产品。",
    "判断是不是真的颠覆：起步性能低 + 改进速度快 + 成本显著低 + 主流玩家“看不上”这三点同时具备。",
    "新进入者：先服务被忽视的低端 / 非消费者，避开正面交锋。",
    "用“性能轨迹图”把你和主流玩家与客户需求增长速度画在一起，看交点位置。",
  ],
  pitfalls: [
    "把任何新技术都叫“颠覆”——多数是维持性创新（如手机摄像头每代提升）。",
    "成熟公司试图用主流业务部门做颠覆——必然被主流 KPI 杀死。",
    "颠覆者贪图高端利润 → 性能轨迹放缓 → 反被新颠覆者颠覆。",
    "忽视客户需求轨迹——颠覆条件是“你比客户进化更快”，不是绝对性能。",
  ],
}
