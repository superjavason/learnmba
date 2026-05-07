# Batch 5: 第五章 组织与变革管理 — Implementation Plan

**Goal:** 3 个组织变革框架完整学习页：平衡计分卡 / 科特变革八步法 / RACI 矩阵。

## Tasks
1. **平衡计分卡 BSC** — 四象限战略地图 SVG + 拖拽 KPI 到正确维度
2. **科特八步法** — 8 步水平流程 SVG + 公司数字化转型多步决策案例
3. **RACI 矩阵** — 表格交互 + 给项目任务分配 R/A/C/I（带规则校验：每任务必须只有 1 个 A、至少 1 个 R）

## Files
```
content/frameworks/{bsc,kotter,raci}.ts
components/widgets/
  ├── bsc/BalancedScorecard.tsx + BscDragQuiz.tsx
  ├── kotter/KotterFlow.tsx + KotterCase.tsx
  └── raci/RaciMatrix.tsx + RaciIntro.tsx
```
