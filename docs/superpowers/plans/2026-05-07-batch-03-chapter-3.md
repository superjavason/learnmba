# Batch 3: 第三章 咨询方法论 — Implementation Plan

**Goal:** 实现 6 个咨询方法论框架的完整学习页：金字塔原理、MECE、假设驱动法、问题树、80/20 法则、麦肯锡 7S。

**Architecture:** 复用 FrameworkLayout / QuizCard 等组件。每个框架新增内容数据 + 可视化 + 互动 widget。

---

## Tasks

1. **金字塔原理** — 金字塔层级图 + 拖拽构建金字塔（顶层中心思想 / 中层论点 / 底层事实）
2. **MECE** — 树形图（好分类 vs 坏分类对比）+ 5 题判断分类是否 MECE
3. **假设驱动法** — 4 步循环图 + 案例迷你流程（连锁咖啡销量下滑诊断）
4. **问题树（利润树）** — 利润分解树 SVG + 调销量/单价/成本看节点实时变化
5. **80/20 法则** — Recharts 帕累托图 + 切换数据集（客户营收 / SKU 销量 / 问题原因）
6. **麦肯锡 7S** — 7 节点星形网络 SVG + 调单元素强度看其他元素一致性提示

---

## File Structure

```
content/frameworks/{pyramid,mece,hypothesis,issuetree,pareto,sevens}.ts
components/widgets/
  ├── pyramid/PyramidDiagram.tsx + PyramidBuilder.tsx
  ├── mece/MeceTree.tsx + MeceJudgeQuiz.tsx
  ├── hypothesis/HypothesisCycle.tsx + HypothesisCase.tsx
  ├── issuetree/ProfitTree.tsx + ProfitTreeIntro.tsx
  ├── pareto/ParetoChart.tsx + ParetoIntro.tsx
  └── sevens/SevenSNetwork.tsx + SevenSIntro.tsx
```

---

## Verification

- pnpm typecheck / lint / test / build 全绿
- 6 新页面均可访问（HTTP 200，含完整内容）
- 已存在 10 个页面无回归
