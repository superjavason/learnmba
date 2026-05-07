# MBA 25 经典框架交互式课件 — 设计方案

日期：2026-05-07
作者：Jason Xu (with Claude)
状态：Draft v1

## 1. 目标与范围

### 1.1 业务目标
基于《MBA经典分析框架培训手册》的 25 个框架，构建一个 **网页版交互式 MBA 培训课件**，要求：

- 内容**丰富有趣**，对零基础学员也**易懂**
- **边学边练**：每个框架都包含可视化 + 互动练习 + 知识检测
- 图表展示**准确、逼真**（不能是模糊示意图，要还原经典原图）
- 视觉风格：**麦肯锡/BCG 咨询报告风**（专业、克制、深静色调）

### 1.2 范围
**全部 25 个框架** 都按统一模板交付。覆盖六大章节：

1. 战略分析工具：SWOT、PESTEL、波特五力、波特价值链、VRIO
2. 市场与竞争战略：BCG、安索夫、蓝海、STP、4P/7P
3. 咨询方法论：金字塔原理、MECE、假设驱动法、问题树、80/20、麦肯锡 7S
4. 财务分析与决策：杜邦、盈亏平衡、NPV/IRR
5. 组织与变革管理：平衡计分卡、科特八步、RACI
6. 创新与商业模式：商业模式画布、颠覆性创新、设计思维

### 1.3 非目标 (Non-Goals)
- 不做用户账号系统（仅 localStorage 持久化）
- 不做后端 API（纯静态内容 + 客户端状态）
- 不做 SSR 数据请求（所有数据嵌入 bundle）
- 不做 E2E 测试，仅对核心计算函数做单测
- 不做多语言切换 UI（中文为主，关键术语括号附英文）
- 不做付费 / 内容墙

---

## 2. 技术栈

| 层 | 选型 | 理由 |
|---|---|---|
| 框架 | Next.js 15 (App Router) | 文件路由 + 静态导出友好 + RSC 减少客户端 JS |
| 语言 | TypeScript (strict) | 内容数据有强类型约束 |
| 包管理 | pnpm | 用户全局规则 |
| 样式 | Tailwind CSS v4 | 快速、与 shadcn 兼容 |
| UI 基础 | shadcn/ui | 组件可控、可改、深色模式开箱 |
| 通用图表 | Recharts | 帕累托、盈亏平衡、NPV、雷达等标准图 |
| 自定义图 | 原生 SVG / D3 (按需) | 价值链、五力图、商业模式画布等异形图 |
| 动画 | Framer Motion | 微动画、状态过渡 |
| 客户端状态 | Zustand + persist | 进度、答题、错题 |
| 内容 | TS 数据文件 | 题库/案例与渲染分离，易维护 |
| 测试 | Vitest | 仅核心计算函数（NPV、ROE、BEP 等） |

不使用：MDX（用 TS 数据 + 组件足够）、tRPC、Prisma、auth、CMS。

---

## 3. 信息架构

### 3.1 路由

| 路由 | 内容 |
|---|---|
| `/` | 首页：Hero + 6 章总览 + 25 框架卡片网格 + 进度条 |
| `/frameworks/[slug]` | 单框架学习页（25 个） |
| `/dashboard` | 学习进度 + 错题集 |
| `/glossary` | 中英术语对照表 |

### 3.2 框架页统一模板（7 段式）

```
┌─ Hero ────────────────────────────────────────┐
│ 中文名 / English Name                          │
│ [章节徽章] [难度] [预计 8 分钟]                 │
└────────────────────────────────────────────────┘

1. 核心定义       —— 一句话定义 + 渐进披露细节
2. 概念图表       —— 准确还原的经典图（重点）
3. 互动练习       —— 4 类玩法之一或组合
4. 经典案例       —— 拆解一个真实案例
5. 知识检测       —— 3-5 题，即时解析
6. 应用建议       —— 何时用、常见陷阱
7. 上一框架 / 下一框架
```

### 3.3 全局功能

- **左侧抽屉导航**：章节 → 框架两级，标记 ✓ 已学完 / ◐ 测验通过
- **顶部进度条**：全局完成度 0-100%
- **暗色模式**：跟随系统 + 手动切换
- **键盘快捷键**：`←/→` 上下框架、`/` 搜索、`?` 帮助、`g h` 回首页
- **打印 CSS**：每个框架页支持 PDF 导出（含图表 + 案例）

---

## 4. 视觉系统

### 4.1 调色板

```
背景  #FAF7F2 米白              暗模式 #0F172A
主色  #0F172A 深海军蓝           
强调  #C9A961 麦肯锡金 (准确还原咨询报告色)
辅助  #475569 灰岩
成功  #2D6A4F 深绿
警示  #B45309 琥珀
错误  #991B1B 深红
图表中性 #94A3B8 / #CBD5E1 / #E2E8F0
```

### 4.2 字体

- 中文标题：思源宋体 (Source Han Serif) — 体现专业、稳重
- 中文正文：思源黑体 (Source Han Sans Regular)
- 英文：Inter (UI) + Source Serif 4 (标题)
- 数字：Inter Tabular Nums（财务图表对齐）

### 4.3 数据图风格（重要）
- Tufte 数据墨水比原则：去除多余网格、阴影、3D
- 单图单色，最多两色对比
- 直接在数据点旁标注数值，少用 legend
- 字号：图表标注 11-12px，标题 14-16px

---

## 5. 25 框架的可视化与互动设计

每个框架的"准确还原图 + 互动玩法"如下：

### 第一章：战略分析工具

**1. SWOT**
- 视觉：2×2 象限矩阵（左上 S、右上 O、左下 W、右下 T），每象限色卡区分
- 互动：拖拽 12 个要素到正确象限；之后给苹果公司打 SWOT
- 题：3 题判断（如"市场份额下滑属于 W 还是 T？"）

**2. PESTEL**
- 视觉：六维雷达图（Recharts RadarChart）
- 互动：6 个滑块（P/E/S/T/E/L 各 0-10），实时更新雷达 + 综合环境评分
- 案例：分析新能源汽车进入欧盟的 PESTEL

**3. 波特五力**
- 视觉：经典五边辐射图——中央是"行业竞争"，四周是供应商/买方/新进入者/替代品，箭头指向中心
- 互动：5 个评分滑块（1-5），实时计算行业吸引力分；切换"航空业 / SaaS / 奶茶店"预设
- 题：3 题情景判断

**4. 波特价值链**
- 视觉：经典价值链图——下方 5 主活动（入库→生产→出库→营销→服务）+ 上方 4 支持活动横跨；右端尖角"利润"
- 互动：点击每个活动看说明；用拖拽给某公司（如苹果 vs 沃尔玛）分配活动权重
- 题：分类题"采购属于主活动还是支持活动？"

**5. VRIO**
- 视觉：4 步决策流程图（V→R→I→O 横向流），每步分支 Yes/No
- 互动：输入资源描述，依次回答 V/R/I/O，输出竞争地位（持续优势 / 暂时优势 / 均势 / 劣势）
- 案例：用 VRIO 评估可口可乐配方、苹果生态

### 第二章：市场与竞争战略

**6. BCG 矩阵**
- 视觉：2×2 气泡图（横轴相对市场份额、纵轴市场增长率，气泡大小=营收）
- 互动：拖拽 6 个产品到象限；调"市场增长率"和"份额"滑块看产品移动；出建议（投资/挤奶/谨慎/退出）
- 案例：给 Apple 产品组合（iPhone/iPad/Mac/Watch/Vision Pro/HomePod）做 BCG

**7. 安索夫矩阵**
- 视觉：2×2 战略矩阵 + 风险等级颜色（市场渗透绿、市场开发黄、产品开发橙、多元化红）
- 互动：给 6 个真实场景选战略 + 风险柱状对比图
- 案例：星巴克进入中国茶饮市场属于哪种？

**8. 蓝海战略**
- 视觉：ERRC 价值曲线图（横轴是竞争因素列表，纵轴是表现水平，画行业平均线 + 你的曲线）
- 互动：调整每个因素的"消除/减少/增加/创造"，看曲线变化（实时 vs 行业基准）
- 案例：太阳马戏团完整还原

**9. STP**
- 视觉：3 步流程图 + 二维感知图（perceptual map）
- 互动：拖拽品牌 logo 到感知图（如汽车品牌按"价格/性能"定位）
- 题：选择题"特斯拉 vs 比亚迪 vs 丰田定位差异"

**10. 4P/7P 营销组合**
- 视觉：7 瓣环形图（4P 内圈 + 3P 外圈）
- 互动：给一个产品（瑞幸咖啡）配置 4P 字段（产品定位、价格策略、渠道、促销）
- 题：判断"会员积分制属于 P 中哪一项？"

### 第三章：咨询方法论

**11. 金字塔原理**
- 视觉：3 层金字塔结构图（顶层中心思想 → 中层 3-4 论点 → 底层支撑事实）
- 互动：给 8 张论点卡片，构建合理金字塔；SCQA 案例练习
- 题：判断"哪个开头符合 SCQA 顺序？"

**12. MECE**
- 视觉：树形分类图（好例子 vs 坏例子对比）
- 互动：给定分类方案，判断是否 MECE（如把客户分为 "20-30 岁" / "30-40 岁" / "高净值" → 不 MECE）
- 题：5 题判断

**13. 假设驱动法**
- 视觉：4 步循环图（形成假设→设计分析→收集数据→验证修正）
- 互动：迷你案例 — 某连锁咖啡店销量下滑，走完 4 步
- 题：选最优假设

**14. 问题树**
- 视觉：利润分解树（利润=收入-成本，收入=销量×单价，成本=固定+变动…）
- 互动：调销量/单价/成本滑块，实时看树各节点数字 + 利润变化
- 题：诊断"利润下降 15% 最可能的根因"

**15. 80/20 法则**
- 视觉：帕累托图（柱状 + 累计百分比折线）
- 互动：拖拽客户/产品排序，自动计算 80/20 阈值；切换"客户营收 / 产品销量 / 问题原因"数据集
- 题：判断"哪些场景适用 80/20"

**16. 麦肯锡 7S**
- 视觉：7 节点星形网络图（结构/战略/系统硬件 vs 共同价值/技能/员工/风格软件，相互连线）
- 互动：调整某个 S 的强度，其他 S 显示一致性预警（如战略变激进但结构科层化 → 红色警告）
- 案例：诺基亚 vs 苹果 7S 对比

### 第四章：财务分析与决策

**17. 杜邦分析**
- 视觉：ROE 三层分解树（ROE = 净利率 × 总资产周转率 × 权益乘数，再下一层细分）
- 互动：3 个杠杆滑块，实时看 ROE 数字 + 三层树更新；可对比沃尔玛（高周转）vs 苹果（高利润率）vs 银行（高杠杆）
- 题：根据 ROE 拆解判断企业类型

**18. 盈亏平衡分析**
- 视觉：双线折线图（总收入线 vs 总成本线）+ 盈亏点标记 + 盈利/亏损区域填色
- 互动：滑块调单价、固定成本、单位变动成本，看盈亏点变化；显示 BEP 公式动态计算
- 题：3 题计算"想盈利 100 万需要卖多少？"

**19. NPV/IRR 投资决策**
- 视觉：现金流瀑布图（年份 vs 净现金流）+ NPV 随折现率变化曲线（IRR = 与 0 交点）
- 互动：编辑各年现金流（5-10 年）+ 折现率滑块；自动求解 IRR；显示决策结论
- 题：两个项目对比"哪个更值得投资？"

### 第五章：组织与变革管理

**20. 平衡计分卡**
- 视觉：四象限战略图（财务/客户/流程/学习），象限内显示 KPI 卡片
- 互动：拖 12 个 KPI 到对应维度；自动评估"是否平衡"
- 题：判断"客户净推荐值"属于哪个维度

**21. 科特变革八步法**
- 视觉：水平 8 步流程图（每步图标 + 描述）+ 进度推进
- 互动：迷你案例（公司数字化转型），每步选择关键决策；最后看变革成功率评分
- 题：排序题"打乱后的 8 步重新排列"

**22. RACI 矩阵**
- 视觉：矩阵表格（行=任务、列=角色），单元格 R/A/C/I
- 互动：给 5 个项目任务分配 RACI；规则校验（每任务必须只有 1 个 A、至少 1 个 R）
- 题：3 题"哪种 RACI 分配错误？"

### 第六章：创新与商业模式

**23. 商业模式画布**
- 视觉：经典 9 宫格画布（KP/KA/KR | VP | CR/CH/CS | C$ | R$）严格还原 Osterwalder 原图布局
- 互动：给空白画布填 Airbnb / Netflix / 瑞幸（三选一）；与参考答案对比
- 题：根据片段定位属于哪个模块

**24. 颠覆性创新**
- 视觉：性能轨迹双线图（横轴时间、纵轴性能；现有产品 vs 颠覆者 vs 主流客户需求线）
- 互动：调"颠覆者起步性能"、"性能改进速度"，看是否、何时颠覆主流；切换"硬盘/手机/电动车"案例
- 题：判断"哪类创新属于颠覆性？"

**25. 设计思维**
- 视觉：5 步过程图（共情→定义→构思→原型→测试），可前后迭代回退
- 互动：迷你案例"老年人手机难用" — 走完 5 步，每步做选择
- 题：判断"用户调研属于哪一步"

---

## 6. 状态与数据模型

### 6.1 内容数据结构

```ts
// content/types.ts
type Framework = {
  slug: string                    // 'swot'
  number: number                  // 1-25
  chapter: 1 | 2 | 3 | 4 | 5 | 6
  nameZh: string                  // 'SWOT 分析'
  nameEn: string                  // 'SWOT Analysis'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedMinutes: number
  definition: { tldr: string; details: string }
  concepts: ConceptItem[]
  caseStudy: CaseStudy
  quiz: QuizQuestion[]
  tips: string[]
  pitfalls: string[]
}
```

### 6.2 学习状态（Zustand + localStorage）

```ts
type LearningState = {
  visited: Set<string>            // 已浏览的 slug
  completed: Set<string>          // 测验通过的 slug
  quizScores: Record<string, { score: number; total: number; lastAttempt: Date }>
  wrongQuestions: WrongQuestion[] // 错题集
  preferences: { theme: 'light' | 'dark' | 'system' }
}
```

---

## 7. 文件结构

```
learnmba/
├── app/
│   ├── (root)/page.tsx                        # 首页
│   ├── frameworks/[slug]/page.tsx             # 单框架页
│   ├── dashboard/page.tsx                     # 进度
│   ├── glossary/page.tsx                      # 术语表
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                                    # shadcn/ui
│   ├── learn/
│   │   ├── FrameworkLayout.tsx
│   │   ├── DefinitionBlock.tsx
│   │   ├── QuizCard.tsx
│   │   ├── CaseStudy.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── ChapterNav.tsx
│   │   └── KeyboardHints.tsx
│   ├── widgets/
│   │   ├── swot/SwotMatrix.tsx + DragQuiz.tsx
│   │   ├── pestel/PestelRadar.tsx
│   │   ├── porter5/FiveForcesDiagram.tsx
│   │   ├── valuechain/ValueChainDiagram.tsx
│   │   ├── vrio/VrioFlow.tsx
│   │   ├── bcg/BcgBubble.tsx
│   │   ├── ansoff/AnsoffMatrix.tsx
│   │   ├── blueocean/ErrcCanvas.tsx
│   │   ├── stp/PerceptualMap.tsx
│   │   ├── marketingmix/SevenPFlower.tsx
│   │   ├── pyramid/PyramidBuilder.tsx
│   │   ├── mece/MeceTree.tsx
│   │   ├── hypothesis/HypothesisCycle.tsx
│   │   ├── issuetree/ProfitTree.tsx
│   │   ├── pareto/ParetoChart.tsx
│   │   ├── sevens/SevenSNetwork.tsx           # mckinsey-7s
│   │   ├── dupont/DupontTree.tsx
│   │   ├── breakeven/BreakEvenChart.tsx
│   │   ├── npv/NpvWaterfall.tsx
│   │   ├── bsc/BalancedScorecard.tsx
│   │   ├── kotter/KotterFlow.tsx
│   │   ├── raci/RaciMatrix.tsx
│   │   ├── canvas/BusinessModelCanvas.tsx
│   │   ├── disruptive/DisruptiveTrajectory.tsx
│   │   └── designthinking/DesignThinkingFlow.tsx
│   └── chrome/                                # 顶/侧栏
├── content/
│   ├── frameworks/
│   │   ├── swot.ts
│   │   ├── ... (25 个)
│   │   └── index.ts
│   ├── glossary.ts
│   └── types.ts
├── lib/
│   ├── store.ts                               # Zustand
│   ├── finance.ts                             # NPV/IRR/ROE/BEP 计算
│   ├── score.ts                               # 五力/PESTEL 评分
│   └── utils.ts
├── lib/__tests__/
│   ├── finance.test.ts
│   └── score.test.ts
├── public/
└── docs/superpowers/specs/
    └── 2026-05-07-mba-frameworks-courseware-design.md
```

---

## 8. 关键决策与权衡

### 8.1 为什么 25 个全做（不挑重点）
理由：用户明确选择"全部 25 个（推荐）"。半成品手册的体验落差比少几个框架更糟。

### 8.2 为什么不用 MDX
内容数据 + 渲染组件分离更利于：(1) 题库统一管理 (2) i18n 未来扩展 (3) widget 复用。MDX 在内容偏数据型场景反而拖累。

### 8.3 自定义 SVG vs 库
波特价值链、商业模式画布、五力辐射图、价值链图——库无法准确还原经典原图布局。这些用原生 SVG + 数据驱动；标准统计图（雷达、柱、折线、瀑布）用 Recharts。

### 8.4 静态导出 vs SSR
全静态。无需后端、可托管 GitHub Pages / Vercel 静态。`output: 'export'`.

### 8.5 测试范围
仅核心计算函数（财务公式）做单测，UI 不做 E2E。理由：(1) 内容稳定性主要在数据 (2) 视觉/交互更适合人工抽检 (3) 时间预算。

---

## 9. 交付与验收标准

### 9.1 完成定义
- 25 个框架页全部上线，每页 7 段完整
- 每个框架的可视化图表准确还原经典原图
- 每个框架至少 1 个互动 widget + 3 题测验
- 首页 / 进度页 / 术语表 三个辅助页可用
- 暗色模式正常
- 移动端可读（不要求互动 widget 全部移动适配，复杂 widget 可降级为只读图）
- 核心财务函数测试通过（NPV/IRR/ROE/BEP）
- `pnpm build` 无错误，Lighthouse 性能 > 85

### 9.2 不在本次范围
- 用户登录、社区、评论
- 多语言切换 UI
- 视频/语音内容
- AI 答疑

---

## 10. 风险与对策

| 风险 | 影响 | 对策 |
|---|---|---|
| 25 个 widget 工作量大 | 进度滑坡 | 分批：先 6 个章节首框架打模板，再批量复用结构 |
| 复杂 widget 移动端体验差 | 学员流失 | 移动端 widget 降级为只读图 + 提示"建议桌面端" |
| 图表库不够准确 | 视觉走样 | 关键异形图用原生 SVG 自己画，确保还原经典图 |
| 内容深度争议 | 学员觉得太浅/太深 | 渐进披露：默认看摘要，"展开详情"看更多 |

---

## 11. 参考实现顺序（writing-plans 阶段细化）

为了快速看到效果，建议这样的批次：

- **Batch 0（脚手架 1 天）**：Next.js + Tailwind + shadcn + 基础布局 + Zustand store + 路由
- **Batch 1（模板 + 第一章 5 个 2-3 天）**：FrameworkLayout、QuizCard、CaseStudy 通用组件 + SWOT/PESTEL/五力/价值链/VRIO 完整 5 个
- **Batch 2（第二章 5 个 2-3 天）**：BCG/安索夫/蓝海/STP/4P
- **Batch 3（第三章 6 个 2-3 天）**：金字塔/MECE/假设/问题树/80-20/7S
- **Batch 4（第四章 3 个 1-2 天）**：杜邦/盈亏/NPV
- **Batch 5（第五章 3 个 1-2 天）**：BSC/科特/RACI
- **Batch 6（第六章 3 个 2 天）**：商业模式画布/颠覆/设计思维
- **Batch 7（润色 1-2 天）**：首页/Dashboard/Glossary、暗色模式打磨、性能优化

writing-plans 阶段会把每批拆为可执行任务清单。
