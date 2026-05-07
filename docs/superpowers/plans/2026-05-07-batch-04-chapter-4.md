# Batch 4: 第四章 财务分析与决策 — Implementation Plan

**Goal:** 实现 3 个财务框架的完整学习页：杜邦分析法、盈亏平衡分析、NPV/IRR。这一章数字密集，需要严谨的计算函数 + 单元测试。

**Tech notes:** lib/finance.ts 集中放 ROE 分解 / BEP / NPV / IRR 计算，先写测试再写互动 widget。

---

## Tasks

1. **lib/finance.ts** — 纯计算函数：dupontROE / breakEven / npv / irr (Newton-Raphson)，加 vitest 测试
2. **杜邦分析法** — ROE 三层分解树 SVG + 3 杠杆滑块 + 5 个公司预设（苹果/沃尔玛/银行/SaaS/重工业）
3. **盈亏平衡分析** — Recharts 双折线（收入/总成本）+ 盈亏点标记 + 3 滑块（单价/固定/单位变动成本）
4. **NPV/IRR** — Recharts 现金流瀑布图 + NPV 随折现率曲线 + IRR 自动求解

---

## File Structure

```
lib/finance.ts (+__tests__/finance.test.ts)
content/frameworks/{dupont,breakeven,npv}.ts
components/widgets/
  ├── dupont/DupontTree.tsx + DupontIntro.tsx
  ├── breakeven/BreakEvenChart.tsx + BreakEvenIntro.tsx
  └── npv/NpvAnalysis.tsx + NpvIntro.tsx
```

---

## Verification

- 财务函数测试 4+ tests pass
- pnpm typecheck/lint/build 全绿
- 3 新页面 200 + 关键词正确
