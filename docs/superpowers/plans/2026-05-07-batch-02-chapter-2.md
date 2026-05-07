# Batch 2: 第二章 市场与竞争战略 — Implementation Plan

**Goal:** 实现 5 个市场与竞争战略框架的完整学习页：BCG 矩阵、安索夫矩阵、蓝海战略、STP、4P/7P。

**Architecture:** 复用 Batch 1 已建立的 FrameworkLayout / QuizCard / CaseStudy / DefinitionBlock 等组件。每个框架新增内容数据 + 可视化 widget + 互动 widget，注册到 `widgetRegistry`。

**Tech Stack:** Next.js 15 / TypeScript / Recharts / 自定义 SVG / Tailwind / shadcn/ui

---

## File Structure

```
content/frameworks/{bcg,ansoff,blueocean,stp,marketingmix}.ts
components/widgets/
  ├── bcg/BcgBubbleChart.tsx + BcgIntro.tsx
  ├── ansoff/AnsoffMatrix.tsx + AnsoffScenarioQuiz.tsx
  ├── blueocean/ErrcCanvas.tsx + ErrcIntro.tsx
  ├── stp/PerceptualMap.tsx + StpFlow.tsx
  └── marketingmix/SevenPFlower.tsx + MarketingMixIntro.tsx
```

---

## Tasks

### Task 1: BCG Matrix
- 内容数据：定义 + 四象限（明星/金牛/问题/瘦狗）+ 苹果产品组合案例 + 3 题
- BcgBubbleChart：2×2 散点图（横轴=相对市场份额对数刻度、纵轴=市场增长率），气泡=营收
- 互动：拖拽 6 个 Apple 产品（iPhone/iPad/Mac/Watch/Vision Pro/HomePod）；每个气泡可调"市场份额/增长率"看象限变化；显示推荐策略
- 注册到 widgetRegistry

### Task 2: 安索夫矩阵
- 内容数据：四种增长战略（市场渗透/市场开发/产品开发/多元化）+ 风险等级 + 星巴克进中国茶饮市场案例 + 3 题
- AnsoffMatrix：2×2 矩阵图，颜色按风险（绿黄橙红）
- 互动：给 6 个真实场景选战略（瑞幸开马来西亚 / 苹果做汽车 / 海底捞推预制菜 / 等等）+ 实时风险柱状对比 + 解析
- 注册

### Task 3: 蓝海战略 (ERRC)
- 内容数据：红海 vs 蓝海 + ERRC 四步动作 + 太阳马戏团完整案例 + 3 题
- ErrcCanvas：折线图（Recharts），横轴=竞争因素、纵轴=表现水平、画行业基准线 + "你的"曲线
- 互动：调每个因素的值（0-10）可看曲线；切换"传统马戏 / 太阳马戏团 / Netflix vs 传统电视"预设
- 注册

### Task 4: STP
- 内容数据：三步流程（细分/目标/定位）+ 细分变量分类 + 3 题
- StpFlow：三步水平流程图
- PerceptualMap：感知图（汽车品牌按"价格/性能"定位），可拖拽品牌 logo / 标签
- 互动：拖动定位点观察坐标变化 + 切换不同行业（汽车 / 咖啡 / 智能手机）
- 注册（visualization=StpFlow，interactive=PerceptualMap）

### Task 5: 4P/7P
- 内容数据：4P 核心 + 7P 扩展 + 瑞幸咖啡案例 + 3 题
- SevenPFlower：7 瓣环形图（4P 内圈 + 3P 外圈），SVG
- 互动：选择产品（瑞幸/海底捞/Tesla Model Y），给每个 P 字段填配置（下拉），完成后查看参考答案对比
- 注册

### Task 6: 验证
- pnpm typecheck / lint / test / build
- 浏览器手动验证 5 个新页面 + 首页 + 目录抽屉

---

## Self-Review

- 内容数据：每个框架都有 tldr/details/concepts/case/quiz/tips/pitfalls，结构与 Batch 1 一致
- 视觉风格：复用色板（深海军 + 麦肯锡金 + 米白），不同框架用不同色彩区分语义（如安索夫用绿→红表示风险）
- 互动覆盖 4 类玩法：拖拽（BCG / STP）、场景选择题（安索夫）、参数调节看曲线（蓝海）、配置填空（4P）
- 类型一致性：所有 widget 通过 `widgetRegistry` 注册，类型签名一致
