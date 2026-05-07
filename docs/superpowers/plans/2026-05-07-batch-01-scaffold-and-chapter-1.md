# Batch 0 + 1: 脚手架 + 第一章战略分析工具 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立 Next.js 课件项目脚手架，完成第一章 5 个战略分析框架（SWOT / PESTEL / 波特五力 / 波特价值链 / VRIO）的完整学习页，验证可复用模板。

**Architecture:** Next.js 15 App Router + 静态导出，每个框架对应一个 `/frameworks/[slug]` 路由。共享 `<FrameworkLayout>` 组合 7 段（定义/图表/互动/案例/测验/建议/导航）。互动 widget 是独立组件，状态用 Zustand persist 到 localStorage。所有内容数据在 `content/frameworks/<slug>.ts`，与渲染逻辑分离。

**Tech Stack:** Next.js 15 / TypeScript / pnpm / Tailwind CSS v4 / shadcn/ui / Recharts / Framer Motion / Zustand / Vitest

---

## File Structure

This plan creates the following:

```
learnmba/
├── package.json, tsconfig.json, next.config.ts, postcss.config.mjs
├── components.json                                    # shadcn config
├── app/
│   ├── layout.tsx                                     # root layout + fonts
│   ├── page.tsx                                       # home: hero + chapters + grid
│   ├── globals.css                                    # tailwind + tokens
│   ├── frameworks/[slug]/page.tsx                     # framework page
│   └── not-found.tsx
├── components/
│   ├── ui/                                            # shadcn primitives
│   ├── chrome/
│   │   ├── TopBar.tsx
│   │   ├── ChapterNav.tsx
│   │   └── ProgressIndicator.tsx
│   ├── learn/
│   │   ├── FrameworkLayout.tsx
│   │   ├── DefinitionBlock.tsx
│   │   ├── QuizCard.tsx
│   │   ├── CaseStudyBlock.tsx
│   │   ├── TipsBlock.tsx
│   │   └── FrameworkNav.tsx                           # prev/next
│   └── widgets/
│       ├── swot/SwotMatrix.tsx
│       ├── pestel/PestelRadar.tsx
│       ├── porter5/FiveForcesDiagram.tsx
│       ├── valuechain/ValueChainDiagram.tsx
│       └── vrio/VrioFlow.tsx
├── content/
│   ├── types.ts
│   ├── chapters.ts
│   ├── frameworks/index.ts
│   └── frameworks/{swot,pestel,porter5,valuechain,vrio}.ts
├── lib/
│   ├── store.ts                                       # Zustand
│   ├── utils.ts                                       # cn()
│   └── score.ts                                       # 五力 / PESTEL 评分
└── lib/__tests__/score.test.ts
```

---

## Task 1: 项目初始化 (pnpm + Next.js + TS)

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `next-env.d.ts`, `.gitignore`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `postcss.config.mjs`

- [ ] **Step 1: 用 create-next-app 初始化（保留 src=否、App Router=是、Tailwind=是、TS=是、ESLint=是、Turbopack=是、import alias `@/*`）**

```bash
cd /Users/xujiajie/codes/learnmba
pnpm dlx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --turbopack --import-alias="@/*" --use-pnpm --yes
```

Expected: 创建 package.json, tsconfig.json, app/, etc. （会问是否覆盖 README — 不存在所以无需）

- [ ] **Step 2: 验证 dev server 启动**

```bash
pnpm dev
```

Expected: `Local: http://localhost:3000` 出现 Next.js 默认页

- [ ] **Step 3: 停止 dev server (Ctrl+C)，安装其他依赖**

```bash
pnpm add zustand recharts framer-motion clsx tailwind-merge class-variance-authority lucide-react
pnpm add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

Expected: 所有包加入 package.json，无 peer 警告阻塞

- [ ] **Step 4: 提交**

```bash
git add -A
git -c commit.gpgsign=false commit -m "chore: scaffold Next.js 15 + Tailwind + deps"
```

---

## Task 2: shadcn/ui 初始化与基础组件

**Files:**
- Create: `components.json`, `lib/utils.ts`, `components/ui/button.tsx`, `components/ui/card.tsx`, `components/ui/badge.tsx`, `components/ui/separator.tsx`, `components/ui/progress.tsx`, `components/ui/tooltip.tsx`, `components/ui/sheet.tsx`, `components/ui/tabs.tsx`, `components/ui/toggle.tsx`

- [ ] **Step 1: 初始化 shadcn**

```bash
pnpm dlx shadcn@latest init -d
```

回答交互式提示：style=new-york, base color=slate, css variables=yes（如非默认请覆盖为这三项）。

Expected: `components.json`, `lib/utils.ts`, 更新 `app/globals.css` 注入 CSS vars

- [ ] **Step 2: 添加常用 primitives**

```bash
pnpm dlx shadcn@latest add button card badge separator progress tooltip sheet tabs toggle scroll-area
```

Expected: 文件添加到 `components/ui/`

- [ ] **Step 3: 提交**

```bash
git add -A
git -c commit.gpgsign=false commit -m "chore: install shadcn/ui primitives"
```

---

## Task 3: 设计 tokens 与全局样式

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: 替换 `app/globals.css` 内容（保留 shadcn 注入的 CSS vars 块，新增项目主题色）**

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(0.98 0.01 80);          /* #FAF7F2 米白 */
  --foreground: oklch(0.22 0.02 250);         /* #0F172A 深海军 */
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.22 0.02 250);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.22 0.02 250);
  --primary: oklch(0.22 0.02 250);            /* 海军蓝 */
  --primary-foreground: oklch(0.98 0.01 80);
  --secondary: oklch(0.94 0.01 80);
  --secondary-foreground: oklch(0.22 0.02 250);
  --muted: oklch(0.94 0.01 80);
  --muted-foreground: oklch(0.45 0.02 250);
  --accent: oklch(0.74 0.10 80);              /* #C9A961 麦肯锡金 */
  --accent-foreground: oklch(0.22 0.02 250);
  --destructive: oklch(0.45 0.18 25);
  --border: oklch(0.88 0.01 80);
  --input: oklch(0.88 0.01 80);
  --ring: oklch(0.74 0.10 80);
  --chart-1: oklch(0.22 0.02 250);
  --chart-2: oklch(0.74 0.10 80);
  --chart-3: oklch(0.45 0.10 200);
  --chart-4: oklch(0.55 0.15 30);
  --chart-5: oklch(0.40 0.05 150);
  --radius: 0.5rem;
}

.dark {
  --background: oklch(0.18 0.02 250);
  --foreground: oklch(0.95 0.01 80);
  --card: oklch(0.22 0.02 250);
  --card-foreground: oklch(0.95 0.01 80);
  --popover: oklch(0.22 0.02 250);
  --popover-foreground: oklch(0.95 0.01 80);
  --primary: oklch(0.95 0.01 80);
  --primary-foreground: oklch(0.22 0.02 250);
  --secondary: oklch(0.28 0.02 250);
  --secondary-foreground: oklch(0.95 0.01 80);
  --muted: oklch(0.28 0.02 250);
  --muted-foreground: oklch(0.70 0.02 80);
  --accent: oklch(0.74 0.10 80);
  --accent-foreground: oklch(0.18 0.02 250);
  --destructive: oklch(0.55 0.18 25);
  --border: oklch(0.32 0.02 250);
  --input: oklch(0.32 0.02 250);
  --ring: oklch(0.74 0.10 80);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --font-sans: var(--font-noto-sans), system-ui, sans-serif;
  --font-serif: var(--font-noto-serif), Georgia, serif;
}

body {
  font-family: var(--font-sans);
  background: var(--background);
  color: var(--foreground);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 {
  font-family: var(--font-serif);
  letter-spacing: -0.01em;
}

/* Print */
@media print {
  .no-print { display: none !important; }
  body { background: white; }
}
```

- [ ] **Step 2: 替换 `app/layout.tsx` 配置中文衬线 + 无衬线字体**

```tsx
import type { Metadata } from "next"
import { Noto_Sans_SC, Noto_Serif_SC } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const notoSans = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  weight: ["400", "500", "700"],
})

const notoSerif = Noto_Serif_SC({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  weight: ["400", "700", "900"],
})

export const metadata: Metadata = {
  title: "MBA 经典分析框架 · 交互式课件",
  description: "25 个 MBA & 咨询经典分析框架的交互式学习平台",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={cn(notoSans.variable, notoSerif.variable, "min-h-screen antialiased")}>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: 启动 dev server 验证主题颜色加载**

```bash
pnpm dev
```

Expected: http://localhost:3000 背景米白、字体为思源黑/宋

- [ ] **Step 4: 停 dev、提交**

```bash
git add -A
git -c commit.gpgsign=false commit -m "feat: configure design tokens and Chinese typography"
```

---

## Task 4: 内容类型系统

**Files:**
- Create: `content/types.ts`

- [ ] **Step 1: 创建 `content/types.ts`**

```ts
export type ChapterId = 1 | 2 | 3 | 4 | 5 | 6
export type Difficulty = "beginner" | "intermediate" | "advanced"

export interface Chapter {
  id: ChapterId
  nameZh: string
  nameEn: string
  summary: string
}

export interface QuizQuestion {
  id: string
  type: "single" | "multi" | "judge"
  prompt: string
  options: { id: string; label: string }[]
  correct: string[]               // 正确答案 id 列表
  explanation: string
}

export interface CaseStudy {
  title: string
  company?: string
  scenario: string
  analysis: { label: string; content: string }[]
  takeaway: string
}

export interface Framework {
  slug: string
  number: number                  // 1-25
  chapter: ChapterId
  nameZh: string
  nameEn: string
  difficulty: Difficulty
  estimatedMinutes: number
  tagline: string                 // 一句话定位
  definition: { tldr: string; details: string[] }  // tldr=一句、details=多段
  concepts: { title: string; description: string }[]
  caseStudy: CaseStudy
  quiz: QuizQuestion[]
  tips: string[]
  pitfalls: string[]
}
```

- [ ] **Step 2: 提交**

```bash
git add content/types.ts
git -c commit.gpgsign=false commit -m "feat: define content type system"
```

---

## Task 5: 章节定义

**Files:**
- Create: `content/chapters.ts`

- [ ] **Step 1: 创建 `content/chapters.ts`**

```ts
import type { Chapter } from "./types"

export const chapters: Chapter[] = [
  {
    id: 1,
    nameZh: "战略分析工具",
    nameEn: "Strategic Analysis Tools",
    summary: "评估企业内外部环境与竞争优势的经典工具集，奠定战略思考的基础。",
  },
  {
    id: 2,
    nameZh: "市场与竞争战略",
    nameEn: "Market & Competition Strategy",
    summary: "细分、定位与增长选择的方法论，回答\"在哪里竞争、如何竞争\"。",
  },
  {
    id: 3,
    nameZh: "咨询方法论",
    nameEn: "Consulting Methodology",
    summary: "结构化思考与高效问题解决的核心工具，源自麦肯锡等顶级咨询。",
  },
  {
    id: 4,
    nameZh: "财务分析与决策",
    nameEn: "Financial Analysis & Decision Making",
    summary: "用数字理解企业，量化投资与运营决策。",
  },
  {
    id: 5,
    nameZh: "组织与变革管理",
    nameEn: "Organization & Change Management",
    summary: "把战略落地为组织行动，管理变革过程中的人与流程。",
  },
  {
    id: 6,
    nameZh: "创新与商业模式",
    nameEn: "Innovation & Business Model",
    summary: "突破现有边界、设计新价值网络与组织创新方法。",
  },
]

export function getChapter(id: number) {
  return chapters.find((c) => c.id === id)
}
```

- [ ] **Step 2: 提交**

```bash
git add content/chapters.ts
git -c commit.gpgsign=false commit -m "feat: add chapter metadata"
```

---

## Task 6: Zustand 学习状态 store

**Files:**
- Create: `lib/store.ts`

- [ ] **Step 1: 创建 `lib/store.ts`**

```ts
"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface QuizScore {
  score: number
  total: number
  lastAttemptAt: number
}

interface LearningState {
  visited: string[]                       // 已浏览的 framework slug
  completed: string[]                     // 测验通过 (>=80%) 的 slug
  scores: Record<string, QuizScore>       // 每个 framework 最近一次测验
  theme: "light" | "dark" | "system"
  markVisited: (slug: string) => void
  saveQuizScore: (slug: string, score: number, total: number) => void
  setTheme: (t: "light" | "dark" | "system") => void
  reset: () => void
}

export const useLearning = create<LearningState>()(
  persist(
    (set) => ({
      visited: [],
      completed: [],
      scores: {},
      theme: "system",
      markVisited: (slug) =>
        set((s) => ({
          visited: s.visited.includes(slug) ? s.visited : [...s.visited, slug],
        })),
      saveQuizScore: (slug, score, total) =>
        set((s) => {
          const passed = total > 0 && score / total >= 0.8
          return {
            scores: { ...s.scores, [slug]: { score, total, lastAttemptAt: Date.now() } },
            completed: passed && !s.completed.includes(slug)
              ? [...s.completed, slug]
              : s.completed,
          }
        }),
      setTheme: (theme) => set({ theme }),
      reset: () => set({ visited: [], completed: [], scores: {} }),
    }),
    {
      name: "learnmba.v1",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : (undefined as never))),
    }
  )
)
```

- [ ] **Step 2: 提交**

```bash
git add lib/store.ts
git -c commit.gpgsign=false commit -m "feat: add Zustand learning store with localStorage persistence"
```

---

## Task 7: 评分函数 + 单元测试

**Files:**
- Create: `lib/score.ts`
- Create: `lib/__tests__/score.test.ts`
- Create: `vitest.config.ts`

- [ ] **Step 1: 配置 Vitest**

`vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import path from "node:path"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
})
```

修改 `package.json` 加 script:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 2: 写失败测试 `lib/__tests__/score.test.ts`**

```ts
import { describe, it, expect } from "vitest"
import { fiveForcesScore, pestelScore, fiveForcesAttractiveness } from "@/lib/score"

describe("fiveForcesScore", () => {
  it("averages five 1-5 force ratings", () => {
    expect(fiveForcesScore({ supplier: 3, buyer: 3, entrants: 3, substitutes: 3, rivalry: 3 })).toBe(3)
  })
  it("rejects out of range", () => {
    expect(() => fiveForcesScore({ supplier: 6, buyer: 3, entrants: 3, substitutes: 3, rivalry: 3 })).toThrow()
  })
})

describe("fiveForcesAttractiveness", () => {
  it("is high when score is low", () => {
    expect(fiveForcesAttractiveness(1)).toBe("high")
    expect(fiveForcesAttractiveness(2)).toBe("high")
  })
  it("is medium for mid", () => {
    expect(fiveForcesAttractiveness(3)).toBe("medium")
  })
  it("is low when score is high", () => {
    expect(fiveForcesAttractiveness(4)).toBe("low")
    expect(fiveForcesAttractiveness(5)).toBe("low")
  })
})

describe("pestelScore", () => {
  it("averages six 0-10 dimension ratings", () => {
    expect(pestelScore({ political: 5, economic: 5, social: 5, technological: 5, environmental: 5, legal: 5 })).toBe(5)
  })
})
```

- [ ] **Step 3: 跑测试，确认失败**

```bash
pnpm test
```

Expected: FAIL — "fiveForcesScore is not defined"

- [ ] **Step 4: 实现 `lib/score.ts`**

```ts
export interface FiveForces {
  supplier: number      // 1-5, 越高=供应商议价力越强
  buyer: number
  entrants: number
  substitutes: number
  rivalry: number
}

export interface PestelDims {
  political: number     // 0-10, 越高=该维度对企业越有利
  economic: number
  social: number
  technological: number
  environmental: number
  legal: number
}

function assertRange(v: number, min: number, max: number, name: string) {
  if (v < min || v > max || Number.isNaN(v)) {
    throw new Error(`${name} out of range [${min}, ${max}]: ${v}`)
  }
}

export function fiveForcesScore(f: FiveForces): number {
  for (const [k, v] of Object.entries(f)) assertRange(v, 1, 5, k)
  return (f.supplier + f.buyer + f.entrants + f.substitutes + f.rivalry) / 5
}

export type Attractiveness = "high" | "medium" | "low"

export function fiveForcesAttractiveness(score: number): Attractiveness {
  // 五力得分越低 → 利润潜力越高 → 行业吸引力越高
  if (score < 2.5) return "high"
  if (score < 3.5) return "medium"
  return "low"
}

export function pestelScore(p: PestelDims): number {
  for (const [k, v] of Object.entries(p)) assertRange(v, 0, 10, k)
  return (p.political + p.economic + p.social + p.technological + p.environmental + p.legal) / 6
}
```

- [ ] **Step 5: 跑测试，确认通过**

```bash
pnpm test
```

Expected: 5 tests passed

- [ ] **Step 6: 提交**

```bash
git add lib/score.ts lib/__tests__/score.test.ts vitest.config.ts package.json
git -c commit.gpgsign=false commit -m "feat: add scoring utilities with tests (five forces, PESTEL)"
```

---

## Task 8: 顶部 chrome — TopBar + ProgressIndicator + ChapterNav

**Files:**
- Create: `components/chrome/TopBar.tsx`
- Create: `components/chrome/ProgressIndicator.tsx`
- Create: `components/chrome/ChapterNav.tsx`

- [ ] **Step 1: 创建 `components/chrome/ProgressIndicator.tsx`**

```tsx
"use client"

import { useLearning } from "@/lib/store"
import { Progress } from "@/components/ui/progress"

const TOTAL = 25

export function ProgressIndicator() {
  const visited = useLearning((s) => s.visited.length)
  const pct = Math.round((visited / TOTAL) * 100)
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground tabular-nums">{visited}/{TOTAL}</span>
      <Progress value={pct} className="h-1.5 w-24" />
    </div>
  )
}
```

- [ ] **Step 2: 创建 `components/chrome/ChapterNav.tsx`**

```tsx
"use client"

import Link from "next/link"
import { chapters } from "@/content/chapters"
import { frameworks } from "@/content/frameworks"
import { useLearning } from "@/lib/store"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Check, Circle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ChapterNav() {
  const visited = useLearning((s) => s.visited)
  const completed = useLearning((s) => s.completed)
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="目录">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[320px] sm:w-[380px]">
        <SheetHeader>
          <SheetTitle className="font-serif text-xl">目录</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-80px)] mt-4 pr-4">
          <ul className="space-y-6">
            {chapters.map((ch) => (
              <li key={ch.id}>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  第{["", "一", "二", "三", "四", "五", "六"][ch.id]}章
                </div>
                <h3 className="font-serif font-bold mb-3">{ch.nameZh}</h3>
                <ul className="space-y-1.5">
                  {frameworks.filter((f) => f.chapter === ch.id).map((f) => {
                    const isVisited = visited.includes(f.slug)
                    const isCompleted = completed.includes(f.slug)
                    return (
                      <li key={f.slug}>
                        <Link
                          href={`/frameworks/${f.slug}`}
                          className={cn(
                            "flex items-center gap-2 py-1.5 text-sm hover:text-accent transition-colors",
                            isVisited && "text-foreground",
                            !isVisited && "text-muted-foreground"
                          )}
                        >
                          {isCompleted ? (
                            <Check className="h-3.5 w-3.5 text-accent" />
                          ) : (
                            <Circle className={cn("h-3.5 w-3.5", isVisited ? "fill-current" : "")} />
                          )}
                          <span className="tabular-nums text-xs text-muted-foreground">{String(f.number).padStart(2, "0")}</span>
                          {f.nameZh}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
```

- [ ] **Step 3: 创建 `components/chrome/TopBar.tsx`**

```tsx
"use client"

import Link from "next/link"
import { ChapterNav } from "./ChapterNav"
import { ProgressIndicator } from "./ProgressIndicator"

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 no-print">
      <div className="mx-auto max-w-screen-2xl flex items-center gap-3 px-4 h-14">
        <ChapterNav />
        <Link href="/" className="font-serif font-bold text-base tracking-tight">
          MBA 经典框架
          <span className="ml-2 text-xs font-sans font-normal text-muted-foreground">25 Frameworks</span>
        </Link>
        <div className="flex-1" />
        <ProgressIndicator />
      </div>
    </header>
  )
}
```

- [ ] **Step 4: 提交**

```bash
git add components/chrome
git -c commit.gpgsign=false commit -m "feat: add TopBar with chapter drawer and progress indicator"
```

---

## Task 9: 通用学习组件 — DefinitionBlock / TipsBlock / CaseStudyBlock / QuizCard

**Files:**
- Create: `components/learn/DefinitionBlock.tsx`
- Create: `components/learn/TipsBlock.tsx`
- Create: `components/learn/CaseStudyBlock.tsx`
- Create: `components/learn/QuizCard.tsx`

- [ ] **Step 1: 创建 `components/learn/DefinitionBlock.tsx`**

```tsx
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

export function DefinitionBlock({ tldr, details }: { tldr: string; details: string[] }) {
  const [open, setOpen] = useState(false)
  return (
    <section className="space-y-3">
      <p className="text-lg leading-relaxed font-serif">{tldr}</p>
      {open && (
        <div className="space-y-3 text-base leading-relaxed text-muted-foreground border-l-2 border-accent pl-4">
          {details.map((d, i) => (
            <p key={i}>{d}</p>
          ))}
        </div>
      )}
      {details.length > 0 && (
        <Button variant="ghost" size="sm" onClick={() => setOpen(!open)} className="-ml-2">
          {open ? <><ChevronUp className="mr-1 h-4 w-4" /> 收起</> : <><ChevronDown className="mr-1 h-4 w-4" /> 展开详情</>}
        </Button>
      )}
    </section>
  )
}
```

- [ ] **Step 2: 创建 `components/learn/TipsBlock.tsx`**

```tsx
import { Lightbulb, AlertTriangle } from "lucide-react"

export function TipsBlock({ tips, pitfalls }: { tips: string[]; pitfalls: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="h-4 w-4 text-accent" />
          <h4 className="font-serif font-bold">应用建议</h4>
        </div>
        <ul className="space-y-2 text-sm leading-relaxed">
          {tips.map((t, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-accent">·</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <h4 className="font-serif font-bold">常见陷阱</h4>
        </div>
        <ul className="space-y-2 text-sm leading-relaxed">
          {pitfalls.map((p, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-destructive">·</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: 创建 `components/learn/CaseStudyBlock.tsx`**

```tsx
import type { CaseStudy } from "@/content/types"
import { Building2 } from "lucide-react"

export function CaseStudyBlock({ data }: { data: CaseStudy }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground mb-2">
        <Building2 className="h-3.5 w-3.5" />
        经典案例
        {data.company && <span>· {data.company}</span>}
      </div>
      <h3 className="font-serif text-xl font-bold mb-3">{data.title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground mb-4">{data.scenario}</p>
      <dl className="grid gap-3 sm:grid-cols-2 mb-4">
        {data.analysis.map((a) => (
          <div key={a.label} className="rounded border border-border/60 p-3 bg-background/40">
            <dt className="text-xs uppercase tracking-wider text-accent font-bold mb-1">{a.label}</dt>
            <dd className="text-sm leading-relaxed">{a.content}</dd>
          </div>
        ))}
      </dl>
      <div className="border-t border-border pt-4 text-sm">
        <span className="font-bold mr-2">关键启示：</span>{data.takeaway}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: 创建 `components/learn/QuizCard.tsx`**

```tsx
"use client"
import { useState } from "react"
import type { QuizQuestion } from "@/content/types"
import { Button } from "@/components/ui/button"
import { useLearning } from "@/lib/store"
import { Check, X, ListChecks } from "lucide-react"
import { cn } from "@/lib/utils"

export function QuizCard({ slug, questions }: { slug: string; questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [submitted, setSubmitted] = useState(false)
  const saveQuizScore = useLearning((s) => s.saveQuizScore)

  const toggle = (qid: string, oid: string, multi: boolean) => {
    if (submitted) return
    setAnswers((prev) => {
      const cur = prev[qid] ?? []
      if (multi) {
        return { ...prev, [qid]: cur.includes(oid) ? cur.filter((x) => x !== oid) : [...cur, oid] }
      }
      return { ...prev, [qid]: [oid] }
    })
  }

  const submit = () => {
    let correct = 0
    questions.forEach((q) => {
      const a = (answers[q.id] ?? []).slice().sort().join(",")
      const c = q.correct.slice().sort().join(",")
      if (a === c && a !== "") correct++
    })
    saveQuizScore(slug, correct, questions.length)
    setSubmitted(true)
  }

  const reset = () => {
    setAnswers({})
    setSubmitted(false)
  }

  const score = questions.reduce((acc, q) => {
    const a = (answers[q.id] ?? []).slice().sort().join(",")
    const c = q.correct.slice().sort().join(",")
    return acc + (a === c && a !== "" ? 1 : 0)
  }, 0)

  return (
    <section className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground mb-4">
        <ListChecks className="h-3.5 w-3.5" />
        知识检测 · {questions.length} 题
      </div>
      <ol className="space-y-6">
        {questions.map((q, qi) => {
          const multi = q.type === "multi"
          const userAns = answers[q.id] ?? []
          return (
            <li key={q.id} className="space-y-3">
              <p className="font-serif font-bold leading-relaxed">
                <span className="text-accent mr-2">Q{qi + 1}.</span>
                {q.prompt}
                {multi && <span className="ml-2 text-xs font-sans text-muted-foreground">（多选）</span>}
              </p>
              <ul className="space-y-2">
                {q.options.map((o) => {
                  const selected = userAns.includes(o.id)
                  const isCorrect = q.correct.includes(o.id)
                  const showCorrect = submitted && isCorrect
                  const showWrong = submitted && selected && !isCorrect
                  return (
                    <li key={o.id}>
                      <button
                        type="button"
                        onClick={() => toggle(q.id, o.id, multi)}
                        className={cn(
                          "w-full text-left flex items-start gap-3 rounded-md border p-3 text-sm transition-colors",
                          selected && !submitted && "border-accent bg-accent/5",
                          !selected && !submitted && "border-border hover:border-accent/50",
                          showCorrect && "border-green-600 bg-green-50 dark:bg-green-950/20",
                          showWrong && "border-destructive bg-destructive/5",
                          submitted && "cursor-default"
                        )}
                      >
                        <span className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs",
                          selected && "border-accent bg-accent text-accent-foreground",
                          showCorrect && "border-green-600 bg-green-600 text-white",
                          showWrong && "border-destructive bg-destructive text-destructive-foreground"
                        )}>
                          {showCorrect ? <Check className="h-3 w-3" /> : showWrong ? <X className="h-3 w-3" /> : selected ? "✓" : ""}
                        </span>
                        <span className="leading-relaxed">{o.label}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
              {submitted && (
                <div className="rounded border-l-2 border-accent bg-accent/5 p-3 text-sm leading-relaxed">
                  <span className="font-bold mr-1">解析：</span>{q.explanation}
                </div>
              )}
            </li>
          )
        })}
      </ol>
      <div className="mt-6 flex items-center gap-3">
        {!submitted ? (
          <Button onClick={submit} disabled={Object.keys(answers).length < questions.length}>
            提交答案
          </Button>
        ) : (
          <>
            <div className="flex-1 text-sm">
              <span className="font-serif text-2xl font-bold tabular-nums">
                {score}/{questions.length}
              </span>
              <span className="ml-2 text-muted-foreground">
                {score / questions.length >= 0.8 ? "🎉 已通过" : "继续努力"}
              </span>
            </div>
            <Button variant="outline" onClick={reset}>再练一次</Button>
          </>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 5: 提交**

```bash
git add components/learn
git -c commit.gpgsign=false commit -m "feat: add reusable learning components (definition, tips, case, quiz)"
```

---

## Task 10: FrameworkLayout + FrameworkNav

**Files:**
- Create: `components/learn/FrameworkLayout.tsx`
- Create: `components/learn/FrameworkNav.tsx`
- Create: `components/learn/SectionHeading.tsx`

- [ ] **Step 1: 创建 `components/learn/SectionHeading.tsx`**

```tsx
export function SectionHeading({
  number,
  title,
  subtitle,
}: {
  number: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="flex items-baseline gap-3 border-b border-border pb-3">
      <span className="font-serif text-3xl font-bold text-accent tabular-nums">{number}</span>
      <h2 className="font-serif text-2xl font-bold">{title}</h2>
      {subtitle && <span className="text-sm text-muted-foreground ml-2">{subtitle}</span>}
    </div>
  )
}
```

- [ ] **Step 2: 创建 `components/learn/FrameworkNav.tsx`**

```tsx
"use client"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { frameworks } from "@/content/frameworks"
import { Button } from "@/components/ui/button"

export function FrameworkNav({ slug }: { slug: string }) {
  const idx = frameworks.findIndex((f) => f.slug === slug)
  const prev = idx > 0 ? frameworks[idx - 1] : null
  const next = idx < frameworks.length - 1 ? frameworks[idx + 1] : null
  return (
    <nav className="flex items-center justify-between gap-4 border-t border-border pt-8">
      {prev ? (
        <Button asChild variant="ghost" className="h-auto py-3 justify-start">
          <Link href={`/frameworks/${prev.slug}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            <div className="text-left">
              <div className="text-xs text-muted-foreground">上一框架</div>
              <div className="font-serif font-bold">{prev.nameZh}</div>
            </div>
          </Link>
        </Button>
      ) : <div />}
      {next ? (
        <Button asChild variant="ghost" className="h-auto py-3 justify-end">
          <Link href={`/frameworks/${next.slug}`}>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">下一框架</div>
              <div className="font-serif font-bold">{next.nameZh}</div>
            </div>
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      ) : <div />}
    </nav>
  )
}
```

- [ ] **Step 3: 创建 `components/learn/FrameworkLayout.tsx`**

```tsx
"use client"

import { useEffect } from "react"
import type { Framework } from "@/content/types"
import { useLearning } from "@/lib/store"
import { Badge } from "@/components/ui/badge"
import { Clock, GraduationCap } from "lucide-react"
import { getChapter } from "@/content/chapters"
import { DefinitionBlock } from "./DefinitionBlock"
import { TipsBlock } from "./TipsBlock"
import { CaseStudyBlock } from "./CaseStudyBlock"
import { QuizCard } from "./QuizCard"
import { FrameworkNav } from "./FrameworkNav"
import { SectionHeading } from "./SectionHeading"

interface Props {
  framework: Framework
  visualization: React.ReactNode
  interactive: React.ReactNode
}

const difficultyLabel: Record<Framework["difficulty"], string> = {
  beginner: "入门",
  intermediate: "进阶",
  advanced: "高级",
}

export function FrameworkLayout({ framework, visualization, interactive }: Props) {
  const markVisited = useLearning((s) => s.markVisited)
  useEffect(() => {
    markVisited(framework.slug)
  }, [framework.slug, markVisited])

  const chapter = getChapter(framework.chapter)

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 lg:py-12 space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap text-xs uppercase tracking-wider text-muted-foreground">
          <span>第{["", "一", "二", "三", "四", "五", "六"][framework.chapter]}章 · {chapter?.nameZh}</span>
          <span>·</span>
          <span className="tabular-nums">框架 {String(framework.number).padStart(2, "0")}/25</span>
        </div>
        <h1 className="font-serif text-4xl font-bold leading-tight">
          {framework.nameZh}
          <span className="block mt-1 text-lg font-normal text-muted-foreground italic">{framework.nameEn}</span>
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">{framework.tagline}</p>
        <div className="flex items-center gap-3 text-xs">
          <Badge variant="outline" className="gap-1">
            <GraduationCap className="h-3 w-3" />
            {difficultyLabel[framework.difficulty]}
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" />
            约 {framework.estimatedMinutes} 分钟
          </Badge>
        </div>
      </header>

      <section className="space-y-4">
        <SectionHeading number="01" title="核心定义" subtitle="What is it?" />
        <DefinitionBlock tldr={framework.definition.tldr} details={framework.definition.details} />
      </section>

      <section className="space-y-4">
        <SectionHeading number="02" title="概念图表" subtitle="The Visualization" />
        {framework.concepts.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {framework.concepts.map((c) => (
              <div key={c.title} className="rounded-md border border-border/60 bg-card p-4">
                <div className="font-serif font-bold text-sm mb-1">{c.title}</div>
                <div className="text-sm leading-relaxed text-muted-foreground">{c.description}</div>
              </div>
            ))}
          </div>
        )}
        {visualization}
      </section>

      <section className="space-y-4">
        <SectionHeading number="03" title="互动练习" subtitle="Try it yourself" />
        {interactive}
      </section>

      <section className="space-y-4">
        <SectionHeading number="04" title="经典案例" subtitle="Case Study" />
        <CaseStudyBlock data={framework.caseStudy} />
      </section>

      <section className="space-y-4">
        <SectionHeading number="05" title="知识检测" subtitle="Quiz" />
        <QuizCard slug={framework.slug} questions={framework.quiz} />
      </section>

      <section className="space-y-4">
        <SectionHeading number="06" title="使用建议" subtitle="Tips & Pitfalls" />
        <TipsBlock tips={framework.tips} pitfalls={framework.pitfalls} />
      </section>

      <FrameworkNav slug={framework.slug} />
    </article>
  )
}
```

- [ ] **Step 4: 提交**

```bash
git add components/learn
git -c commit.gpgsign=false commit -m "feat: add FrameworkLayout 7-section template"
```

---

## Task 11: 框架数据骨架 + index 注册

**Files:**
- Create: `content/frameworks/index.ts`
- Create: `content/frameworks/swot.ts` (placeholder, 完整内容在 Task 12)

- [ ] **Step 1: 创建 `content/frameworks/swot.ts` 占位**

```ts
import type { Framework } from "../types"

export const swot: Framework = {
  slug: "swot",
  number: 1,
  chapter: 1,
  nameZh: "SWOT 分析",
  nameEn: "SWOT Analysis",
  difficulty: "beginner",
  estimatedMinutes: 8,
  tagline: "用一个 2×2 矩阵把企业的内外部环境看个清楚。",
  definition: { tldr: "", details: [] },
  concepts: [],
  caseStudy: { title: "", scenario: "", analysis: [], takeaway: "" },
  quiz: [],
  tips: [],
  pitfalls: [],
}
```

- [ ] **Step 2: 创建 `content/frameworks/index.ts`**

```ts
import type { Framework } from "../types"
import { swot } from "./swot"

// 后续 Task 会逐个加入：pestel, porter5, valuechain, vrio
const placeholder = (slug: string, n: number, ch: 1, zh: string, en: string): Framework => ({
  slug, number: n, chapter: ch, nameZh: zh, nameEn: en,
  difficulty: "beginner", estimatedMinutes: 8, tagline: "",
  definition: { tldr: "", details: [] },
  concepts: [], caseStudy: { title: "", scenario: "", analysis: [], takeaway: "" },
  quiz: [], tips: [], pitfalls: [],
})

export const frameworks: Framework[] = [
  swot,
  placeholder("pestel", 2, 1, "PESTEL 分析", "PESTEL Analysis"),
  placeholder("porter5", 3, 1, "波特五力模型", "Porter's Five Forces"),
  placeholder("valuechain", 4, 1, "波特价值链", "Porter's Value Chain"),
  placeholder("vrio", 5, 1, "VRIO 分析", "VRIO Framework"),
]

export function getFramework(slug: string) {
  return frameworks.find((f) => f.slug === slug)
}
```

- [ ] **Step 3: 提交**

```bash
git add content/frameworks
git -c commit.gpgsign=false commit -m "feat: add frameworks registry with placeholders"
```

---

## Task 12: SWOT — 内容数据 + 互动 widget

**Files:**
- Replace: `content/frameworks/swot.ts`
- Create: `components/widgets/swot/SwotMatrix.tsx`
- Create: `components/widgets/swot/SwotDragQuiz.tsx`
- Create: `app/frameworks/[slug]/page.tsx`
- Create: `app/not-found.tsx`

- [ ] **Step 1: 替换 `content/frameworks/swot.ts` 为完整内容**

```ts
import type { Framework } from "../types"

export const swot: Framework = {
  slug: "swot",
  number: 1,
  chapter: 1,
  nameZh: "SWOT 分析",
  nameEn: "SWOT Analysis",
  difficulty: "beginner",
  estimatedMinutes: 10,
  tagline: "把企业的内部能力（S/W）与外部环境（O/T）摆在一张 2×2 矩阵里，是制定战略最经典的起点。",
  definition: {
    tldr: "SWOT 是把企业放进一张 2×2 矩阵，看清自身优势、劣势、机会与威胁的战略规划工具。",
    details: [
      "S（Strengths）和 W（Weaknesses）描述的是企业的内部能力——可控、靠自身改变。",
      "O（Opportunities）和 T（Threats）描述的是外部环境——通常不可控，只能识别和应对。",
      "进一步可以做 SO/WO/ST/WT 交叉策略矩阵，把单纯的列表变成可执行的行动计划。",
    ],
  },
  concepts: [
    { title: "Strengths（优势）", description: "内部因素，组织相对竞争对手的强项，例如品牌、技术、渠道。" },
    { title: "Weaknesses（劣势）", description: "内部因素，组织相对竞争对手的弱项，例如成本结构、人才储备。" },
    { title: "Opportunities（机会）", description: "外部因素，市场或环境中可利用的有利条件，例如新兴市场、政策红利。" },
    { title: "Threats（威胁）", description: "外部因素，可能造成负面影响的力量，例如新进入者、替代品、监管变化。" },
  ],
  caseStudy: {
    title: "苹果公司 SWOT",
    company: "Apple Inc.",
    scenario: "作为全球市值最高的科技公司，苹果在硬件、软件、服务垂直整合上具备独特优势，但也面临供应链与监管多重压力。",
    analysis: [
      { label: "S 优势", content: "强品牌溢价、垂直整合生态、高利润率、忠诚用户群。" },
      { label: "W 劣势", content: "产品线相对窄、高端定价限制下沉市场、对单一爆款（iPhone）依赖高。" },
      { label: "O 机会", content: "服务与可穿戴持续增长、新兴市场用户升级、Vision 等空间计算赛道。" },
      { label: "T 威胁", content: "中国市场政策风险、供应链集中度、安卓生态竞争、欧盟反垄断。" },
    ],
    takeaway: "做 SWOT 不是为了把四象限填满，而是用 SO/ST 思考"用强项抓机会、防威胁"——苹果的服务业务正是 SO 的典型产出。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt: "下列哪一项最可能属于企业的"威胁（T）"？",
      options: [
        { id: "a", label: "公司刚获得 ISO 27001 认证" },
        { id: "b", label: "主要供应商被收购，未来可能涨价" },
        { id: "c", label: "员工平均工龄 8 年" },
        { id: "d", label: "新建成的数据中心" },
      ],
      correct: ["b"],
      explanation: "T 是外部、可能造成负面影响的因素。供应商被收购属于外部环境变化，且对企业不利。其他三项是内部资源/能力（S 或 W）。",
    },
    {
      id: "q2",
      type: "single",
      prompt: "市场份额连续两个季度下滑，最可能属于：",
      options: [
        { id: "a", label: "S 优势" },
        { id: "b", label: "W 劣势" },
        { id: "c", label: "O 机会" },
        { id: "d", label: "T 威胁" },
      ],
      correct: ["b"],
      explanation: "市场份额下滑反映企业自身竞争力相对下降，是内部表现的体现，归为劣势 W。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "下面哪些是 SWOT 分析做对的标志（多选）？",
      options: [
        { id: "a", label: "邀请跨职能团队共同列要素" },
        { id: "b", label: "每个象限尽量列得越多越好" },
        { id: "c", label: "对每条要素分析重要性与影响" },
        { id: "d", label: "形成 SO/WO/ST/WT 交叉策略" },
      ],
      correct: ["a", "c", "d"],
      explanation: "做对的 SWOT 强调多视角、有重要性排序、并产出可执行策略。盲目堆条目反而稀释焦点。",
    },
  ],
  tips: [
    "邀请跨职能团队（销售、产品、运营、财务）共同梳理，避免单一视角盲区。",
    "每条要素都标"重要性 1-5 + 影响 1-5"，按优先级聚焦真正关键的少数。",
    "至少每年回顾一次 SWOT，市场和能力都在变。",
    "把 SWOT 推到 TOWS（交叉策略）才能从描述变成行动。",
  ],
  pitfalls: [
    "把 SWOT 当 brainstorming 凑数，不区分重要性。",
    "S/W 与 O/T 混淆——记住：内部 vs 外部是核心分界。",
    "做完就归档，没产出对应策略与责任人。",
    "缺少数据支撑，全凭主观判断。",
  ],
}
```

- [ ] **Step 2: 创建 `components/widgets/swot/SwotMatrix.tsx`（静态可视化）**

```tsx
import { TrendingUp, TrendingDown, Sparkles, AlertTriangle } from "lucide-react"

const quadrants = [
  { key: "S", title: "优势 Strengths", subtitle: "内部 · 正面", icon: TrendingUp, color: "from-emerald-50 to-emerald-100/40 dark:from-emerald-950/30 dark:to-emerald-950/10 border-emerald-200 dark:border-emerald-800", iconColor: "text-emerald-600", items: ["品牌资产", "核心技术", "成本优势", "渠道网络"] },
  { key: "W", title: "劣势 Weaknesses", subtitle: "内部 · 负面", icon: TrendingDown, color: "from-amber-50 to-amber-100/40 dark:from-amber-950/30 dark:to-amber-950/10 border-amber-200 dark:border-amber-800", iconColor: "text-amber-600", items: ["人才缺口", "现金流紧", "技术债务", "品牌力弱"] },
  { key: "O", title: "机会 Opportunities", subtitle: "外部 · 正面", icon: Sparkles, color: "from-sky-50 to-sky-100/40 dark:from-sky-950/30 dark:to-sky-950/10 border-sky-200 dark:border-sky-800", iconColor: "text-sky-600", items: ["新兴市场", "政策红利", "技术突破", "消费升级"] },
  { key: "T", title: "威胁 Threats", subtitle: "外部 · 负面", icon: AlertTriangle, color: "from-rose-50 to-rose-100/40 dark:from-rose-950/30 dark:to-rose-950/10 border-rose-200 dark:border-rose-800", iconColor: "text-rose-600", items: ["新进入者", "替代品", "监管收紧", "客户流失"] },
] as const

export function SwotMatrix() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="grid grid-cols-[auto_1fr_1fr] grid-rows-[auto_1fr_1fr] gap-2">
        <div></div>
        <div className="text-center text-xs uppercase tracking-wider text-muted-foreground py-1">正面 (Helpful)</div>
        <div className="text-center text-xs uppercase tracking-wider text-muted-foreground py-1">负面 (Harmful)</div>

        <div className="flex items-center justify-center text-xs uppercase tracking-wider text-muted-foreground writing-vertical px-1" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          内部 (Internal)
        </div>
        <Quadrant q={quadrants[0]} />
        <Quadrant q={quadrants[1]} />

        <div className="flex items-center justify-center text-xs uppercase tracking-wider text-muted-foreground" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          外部 (External)
        </div>
        <Quadrant q={quadrants[2]} />
        <Quadrant q={quadrants[3]} />
      </div>
    </div>
  )
}

function Quadrant({ q }: { q: typeof quadrants[number] }) {
  const Icon = q.icon
  return (
    <div className={`rounded border bg-gradient-to-br ${q.color} p-4 min-h-[160px]`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`flex h-7 w-7 items-center justify-center rounded-full bg-background border ${q.iconColor}`}>
          <span className="font-serif font-bold text-sm">{q.key}</span>
        </div>
        <div>
          <div className="font-serif font-bold text-sm">{q.title}</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{q.subtitle}</div>
        </div>
        <Icon className={`ml-auto h-4 w-4 ${q.iconColor}`} />
      </div>
      <ul className="space-y-1 text-xs leading-relaxed">
        {q.items.map((it) => (
          <li key={it} className="flex gap-1.5">
            <span className={q.iconColor}>·</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 3: 创建 `components/widgets/swot/SwotDragQuiz.tsx`（互动拖拽）**

```tsx
"use client"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, X, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

type Quadrant = "S" | "W" | "O" | "T"

interface Item {
  id: string
  text: string
  correct: Quadrant
}

const ITEMS: Item[] = [
  { id: "1", text: "公司拥有行业领先的研发团队", correct: "S" },
  { id: "2", text: "海外市场用户对产品认知度低", correct: "W" },
  { id: "3", text: "国家出台新能源补贴政策", correct: "O" },
  { id: "4", text: "主要竞争对手发布同类新品", correct: "T" },
  { id: "5", text: "供应链严重依赖单一国家", correct: "W" },
  { id: "6", text: "Z 世代消费偏好快速升级", correct: "O" },
  { id: "7", text: "拥有 5000 万付费会员资产", correct: "S" },
  { id: "8", text: "欧盟拟出台数据出境新规", correct: "T" },
]

const QUADRANTS: { key: Quadrant; label: string; sub: string; tone: string }[] = [
  { key: "S", label: "优势 S", sub: "内部 / 正面", tone: "border-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20" },
  { key: "W", label: "劣势 W", sub: "内部 / 负面", tone: "border-amber-300 bg-amber-50/50 dark:bg-amber-950/20" },
  { key: "O", label: "机会 O", sub: "外部 / 正面", tone: "border-sky-300 bg-sky-50/50 dark:bg-sky-950/20" },
  { key: "T", label: "威胁 T", sub: "外部 / 负面", tone: "border-rose-300 bg-rose-50/50 dark:bg-rose-950/20" },
]

export function SwotDragQuiz() {
  const [placed, setPlaced] = useState<Record<string, Quadrant>>({})
  const [checked, setChecked] = useState(false)

  const remaining = useMemo(() => ITEMS.filter((i) => !placed[i.id]), [placed])

  const handleDrop = (q: Quadrant) => (e: React.DragEvent) => {
    e.preventDefault()
    const id = e.dataTransfer.getData("text/plain")
    if (!id) return
    setPlaced((p) => ({ ...p, [id]: q }))
  }

  const correctCount = ITEMS.filter((i) => placed[i.id] === i.correct).length

  const reset = () => {
    setPlaced({})
    setChecked(false)
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        拖拽下方 8 张要素卡片到对应象限。完成后点击"对答案"查看结果。
      </p>

      <div className="grid grid-cols-2 gap-3">
        {QUADRANTS.map((q) => {
          const items = ITEMS.filter((i) => placed[i.id] === q.key)
          return (
            <div
              key={q.key}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop(q.key)}
              className={cn("rounded-lg border-2 border-dashed p-3 min-h-[140px] transition-colors", q.tone)}
            >
              <div className="mb-2">
                <div className="font-serif font-bold text-sm">{q.label}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{q.sub}</div>
              </div>
              <ul className="space-y-1.5">
                {items.map((it) => {
                  const isCorrect = placed[it.id] === it.correct
                  const showStatus = checked
                  return (
                    <li
                      key={it.id}
                      draggable={!checked}
                      onDragStart={(e) => e.dataTransfer.setData("text/plain", it.id)}
                      className={cn(
                        "flex items-center gap-2 rounded border bg-background px-2 py-1.5 text-xs leading-relaxed",
                        !checked && "cursor-grab active:cursor-grabbing hover:border-accent",
                        showStatus && isCorrect && "border-emerald-500 text-emerald-700 dark:text-emerald-400",
                        showStatus && !isCorrect && "border-rose-500 text-rose-700 dark:text-rose-400"
                      )}
                    >
                      {showStatus && (isCorrect ? <Check className="h-3 w-3 shrink-0" /> : <X className="h-3 w-3 shrink-0" />)}
                      <span>{it.text}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>

      {remaining.length > 0 && (
        <div className="rounded-lg border border-border bg-muted/30 p-3">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">待分配（{remaining.length}）</div>
          <ul className="flex flex-wrap gap-2">
            {remaining.map((it) => (
              <li
                key={it.id}
                draggable={!checked}
                onDragStart={(e) => e.dataTransfer.setData("text/plain", it.id)}
                className="cursor-grab active:cursor-grabbing rounded border border-border bg-background px-2.5 py-1.5 text-xs hover:border-accent"
              >
                {it.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center gap-3">
        {!checked ? (
          <Button onClick={() => setChecked(true)} disabled={remaining.length > 0}>对答案</Button>
        ) : (
          <>
            <div className="flex-1 text-sm">
              <span className="font-serif text-xl font-bold tabular-nums">{correctCount}/{ITEMS.length}</span>
              <span className="ml-2 text-muted-foreground">分类正确</span>
            </div>
            <Button variant="outline" onClick={reset}>
              <RotateCcw className="mr-2 h-3.5 w-3.5" />
              重新尝试
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: 创建 `app/not-found.tsx`**

```tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center space-y-4">
      <h1 className="font-serif text-5xl font-bold">404</h1>
      <p className="text-muted-foreground">未找到对应的框架</p>
      <Button asChild><Link href="/">回到首页</Link></Button>
    </div>
  )
}
```

- [ ] **Step 5: 创建 `app/frameworks/[slug]/page.tsx`（动态路由）**

```tsx
import { notFound } from "next/navigation"
import { frameworks, getFramework } from "@/content/frameworks"
import { TopBar } from "@/components/chrome/TopBar"
import { FrameworkLayout } from "@/components/learn/FrameworkLayout"
import { SwotMatrix } from "@/components/widgets/swot/SwotMatrix"
import { SwotDragQuiz } from "@/components/widgets/swot/SwotDragQuiz"

export function generateStaticParams() {
  return frameworks.map((f) => ({ slug: f.slug }))
}

export default async function FrameworkPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const framework = getFramework(slug)
  if (!framework) notFound()

  const visualization = renderVisualization(slug)
  const interactive = renderInteractive(slug)

  return (
    <>
      <TopBar />
      <FrameworkLayout framework={framework} visualization={visualization} interactive={interactive} />
    </>
  )
}

function renderVisualization(slug: string) {
  switch (slug) {
    case "swot": return <SwotMatrix />
    default: return <PlaceholderViz />
  }
}

function renderInteractive(slug: string) {
  switch (slug) {
    case "swot": return <SwotDragQuiz />
    default: return <PlaceholderInteractive />
  }
}

function PlaceholderViz() {
  return <div className="rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground text-sm">该框架的可视化即将上线</div>
}

function PlaceholderInteractive() {
  return <div className="rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground text-sm">该框架的互动练习即将上线</div>
}
```

- [ ] **Step 6: 启动 dev，访问 `http://localhost:3000/frameworks/swot` 验证**

```bash
pnpm dev
```

Expected: SWOT 页完整显示 7 段，可拖拽，可答题

- [ ] **Step 7: 停 dev、提交**

```bash
git add -A
git -c commit.gpgsign=false commit -m "feat(swot): add SWOT framework page with matrix viz and drag quiz"
```

---

## Task 13: PESTEL — 雷达图 widget + 内容数据

**Files:**
- Replace: `content/frameworks/pestel.ts`
- Create: `components/widgets/pestel/PestelRadar.tsx`
- Modify: `app/frameworks/[slug]/page.tsx`
- Modify: `content/frameworks/index.ts`

- [ ] **Step 1: 替换 placeholder 为完整数据 — 创建 `content/frameworks/pestel.ts`**

```ts
import type { Framework } from "../types"

export const pestel: Framework = {
  slug: "pestel",
  number: 2,
  chapter: 1,
  nameZh: "PESTEL 分析",
  nameEn: "PESTEL Analysis",
  difficulty: "beginner",
  estimatedMinutes: 10,
  tagline: "用 6 个外部维度——政治、经济、社会、技术、环境、法律——把宏观环境扫描得明明白白。",
  definition: {
    tldr: "PESTEL 是评估宏观环境对企业影响的扫描工具，覆盖政治、经济、社会、技术、环境、法律六大外部维度。",
    details: [
      "PESTEL 关注的是企业基本无法改变、但必须识别和适应的外部因素。",
      "进入新市场、做长期战略规划、识别系统性风险时，PESTEL 是首选起点。",
      "PESTEL 不直接给出结论，它给的是结构化提问清单——避免战略团队漏看关键变量。",
    ],
  },
  concepts: [
    { title: "P 政治 Political", description: "政府政策、政治稳定性、贸易协议、监管强度。" },
    { title: "E 经济 Economic", description: "增长率、利率、汇率、通胀、失业率、消费能力。" },
    { title: "S 社会 Social", description: "人口结构、文化价值观、生活方式、教育水平、健康趋势。" },
    { title: "T 技术 Technological", description: "新技术、研发投入、数字化水平、技术过时风险。" },
    { title: "E 环境 Environmental", description: "气候变化、自然资源、环保法规、可持续要求。" },
    { title: "L 法律 Legal", description: "劳动法、知识产权、消费者保护、数据隐私。" },
  ],
  caseStudy: {
    title: "新能源车企进入欧盟",
    company: "某中国电动车品牌",
    scenario: "某中国电动车品牌评估 2026 年进入欧盟市场，需用 PESTEL 系统识别风险与机会。",
    analysis: [
      { label: "P 政治", content: "欧盟对中国电动车反补贴关税、地缘政治紧张可能加征额外限制。" },
      { label: "E 经济", content: "欧元汇率波动、欧洲消费者价格敏感度高、新能源补贴部分退坡。" },
      { label: "S 社会", content: "环保意识强、对中国品牌信任度仍在建立、电动车接受度区域差异大（北欧高、南欧低）。" },
      { label: "T 技术", content: "充电桩网络密度差异、本地化软件 OTA 法规、智能座舱本地化适配。" },
      { label: "E 环境", content: "电池碳足迹申报要求（CBAM）、回收体系合规。" },
      { label: "L 法律", content: "GDPR 数据合规、UN R155 网络安全认证、产品责任法。" },
    ],
    takeaway: "PESTEL 让团队从"出海"模糊愿景，转为 6 类具体风险清单，每类对应"应对负责人 + 时间表"，才能落地。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt: "下列哪一项最属于 PESTEL 的"E（经济）"维度？",
      options: [
        { id: "a", label: "GDPR 数据合规要求" },
        { id: "b", label: "10 年期国债收益率上行" },
        { id: "c", label: "Z 世代环保意识高涨" },
        { id: "d", label: "5G 商用普及率" },
      ],
      correct: ["b"],
      explanation: "利率/收益率属于经济维度。GDPR=L 法律，环保意识=S 社会，5G=T 技术。",
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
      explanation: "PESTEL 关注的是外部宏观环境。内部资源/能力评估属于 SWOT、VRIO、价值链等工具。",
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
      explanation: "全球化时代外部因素相互影响，只看本国是误区。其他三项都是 PESTEL 落地为决策工具的关键。",
    },
  ],
  tips: [
    "为每条因素标"影响方向 + 强度 + 时间窗"，PESTEL 才能驱动行动。",
    "不同国家/区域分别做一份，跨境业务尤其重要。",
    "至少每年回顾一次，遇到大事件（疫情、地缘冲突）即时更新。",
    "与 SWOT 的 OT 联动：PESTEL 输出的机会/威胁直接喂给 SWOT。",
  ],
  pitfalls: [
    "把 PESTEL 写成新闻摘要，没说"对我业务意味着什么"。",
    "只做政治和经济，忽略环境/法律——这两类越来越重要。",
    "罗列因素却没有人负责跟进。",
    "把短期波动当长期趋势，反之亦然。",
  ],
}
```

- [ ] **Step 2: 注册到 `content/frameworks/index.ts`**

替换为：
```ts
import type { Framework } from "../types"
import { swot } from "./swot"
import { pestel } from "./pestel"

const placeholder = (slug: string, n: number, ch: 1, zh: string, en: string): Framework => ({
  slug, number: n, chapter: ch, nameZh: zh, nameEn: en,
  difficulty: "beginner", estimatedMinutes: 8, tagline: "",
  definition: { tldr: "", details: [] },
  concepts: [], caseStudy: { title: "", scenario: "", analysis: [], takeaway: "" },
  quiz: [], tips: [], pitfalls: [],
})

export const frameworks: Framework[] = [
  swot,
  pestel,
  placeholder("porter5", 3, 1, "波特五力模型", "Porter's Five Forces"),
  placeholder("valuechain", 4, 1, "波特价值链", "Porter's Value Chain"),
  placeholder("vrio", 5, 1, "VRIO 分析", "VRIO Framework"),
]

export function getFramework(slug: string) {
  return frameworks.find((f) => f.slug === slug)
}
```

- [ ] **Step 3: 创建 `components/widgets/pestel/PestelRadar.tsx`**

```tsx
"use client"
import { useState } from "react"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import { pestelScore } from "@/lib/score"

type Dim = "P" | "E1" | "S" | "T" | "E2" | "L"
const DIMS: { key: Dim; label: string; full: string }[] = [
  { key: "P", label: "政治 P", full: "Political" },
  { key: "E1", label: "经济 E", full: "Economic" },
  { key: "S", label: "社会 S", full: "Social" },
  { key: "T", label: "技术 T", full: "Technological" },
  { key: "E2", label: "环境 E", full: "Environmental" },
  { key: "L", label: "法律 L", full: "Legal" },
]

const PRESETS: Record<string, Record<Dim, number>> = {
  "新能源车（中国）": { P: 8, E1: 7, S: 8, T: 9, E2: 9, L: 6 },
  "传统燃油车（欧洲）": { P: 3, E1: 5, S: 3, T: 5, E2: 2, L: 4 },
  "AI SaaS（美国）": { P: 5, E1: 7, S: 7, T: 9, E2: 7, L: 4 },
}

export function PestelRadar() {
  const [vals, setVals] = useState<Record<Dim, number>>({ P: 5, E1: 5, S: 5, T: 5, E2: 5, L: 5 })

  const score = pestelScore({
    political: vals.P, economic: vals.E1, social: vals.S,
    technological: vals.T, environmental: vals.E2, legal: vals.L,
  })

  const data = DIMS.map((d) => ({ dim: d.label, value: vals[d.key], full: 10 }))

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        每个维度评分 0-10（越高代表外部环境对你越有利）。试试用预设场景对比，或自己拖动滑块。
      </p>

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <ResponsiveContainer width="100%" height={360}>
            <RadarChart data={data} outerRadius="75%">
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="dim" tick={{ fontSize: 12, fill: "var(--foreground)" }} />
              <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
              <Radar dataKey="value" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.35} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-2 flex items-baseline justify-center gap-2">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">综合环境指数</span>
            <span className="font-serif text-3xl font-bold tabular-nums">{score.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">/10</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">预设场景</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(PRESETS).map(([name, p]) => (
                <Button key={name} variant="outline" size="sm" onClick={() => setVals(p)}>
                  {name}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {DIMS.map((d) => (
              <div key={d.key}>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-sm font-medium">{d.label}</span>
                  <span className="text-xs tabular-nums text-muted-foreground">{vals[d.key]} / 10</span>
                </div>
                <input
                  type="range" min={0} max={10} step={1}
                  value={vals[d.key]}
                  onChange={(e) => setVals((v) => ({ ...v, [d.key]: Number(e.target.value) }))}
                  className="w-full accent-[var(--accent)]"
                />
                <div className="text-[10px] text-muted-foreground mt-0.5">{d.full}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: 在 `app/frameworks/[slug]/page.tsx` 注册**

修改 `renderVisualization` 和 `renderInteractive`：
```tsx
import { PestelRadar } from "@/components/widgets/pestel/PestelRadar"
// ...
function renderVisualization(slug: string) {
  switch (slug) {
    case "swot": return <SwotMatrix />
    case "pestel": return <PestelStaticDiagram />
    default: return <PlaceholderViz />
  }
}

function renderInteractive(slug: string) {
  switch (slug) {
    case "swot": return <SwotDragQuiz />
    case "pestel": return <PestelRadar />
    default: return <PlaceholderInteractive />
  }
}

function PestelStaticDiagram() {
  return (
    <div className="rounded-lg border border-border bg-card p-6 text-center text-sm text-muted-foreground">
      下方互动雷达图即为 PESTEL 的核心可视化——直接进入"互动练习"开始体验。
    </div>
  )
}
```

- [ ] **Step 5: 启动 dev 验证 `/frameworks/pestel`**

```bash
pnpm dev
```

Expected: 雷达图显示六维，滑块改变 → 雷达实时更新，预设按钮切换正常

- [ ] **Step 6: 停 dev、提交**

```bash
git add -A
git -c commit.gpgsign=false commit -m "feat(pestel): add PESTEL framework with radar chart"
```

---

## Task 14: 波特五力 — 自定义 SVG 五边辐射图

**Files:**
- Create: `content/frameworks/porter5.ts`
- Create: `components/widgets/porter5/FiveForcesDiagram.tsx`
- Modify: `app/frameworks/[slug]/page.tsx`
- Modify: `content/frameworks/index.ts`

- [ ] **Step 1: 创建 `content/frameworks/porter5.ts`**

```ts
import type { Framework } from "../types"

export const porter5: Framework = {
  slug: "porter5",
  number: 3,
  chapter: 1,
  nameZh: "波特五力模型",
  nameEn: "Porter's Five Forces",
  difficulty: "intermediate",
  estimatedMinutes: 12,
  tagline: "判断一个行业值不值得进入——五个力越强，行业利润越薄。",
  definition: {
    tldr: "波特五力模型从五个竞争力量评估行业利润潜力：供应商议价力、买方议价力、新进入者威胁、替代品威胁、行业内竞争。",
    details: [
      "迈克尔·波特 1979 年提出，回答的是"为什么有些行业天然赚钱、有些天然不赚钱"。",
      "五力越强，行业整体利润空间被挤压得越厉害——所以五力分析是"挑战行业"的工具。",
      "实战中常给每力打 1-5 分，加总评估行业吸引力（分越低，吸引力越高）。",
    ],
  },
  concepts: [
    { title: "供应商议价能力", description: "供应商少、转换成本高、原材料独特 → 议价力强。" },
    { title: "买方议价能力", description: "买方集中、产品同质、转换成本低 → 买方议价力强。" },
    { title: "新进入者威胁", description: "进入壁垒（资本/品牌/规模/牌照）越低 → 威胁越大。" },
    { title: "替代品威胁", description: "替代品价格性能更优 / 用户转换倾向高 → 威胁大。" },
    { title: "行业内竞争", description: "竞争者数量多、产品同质、行业增长慢、退出壁垒高 → 竞争激烈。" },
  ],
  caseStudy: {
    title: "全球航空业",
    company: "Airline Industry",
    scenario: "航空业是 MBA 课堂经典的"五力全面恶化"案例。",
    analysis: [
      { label: "供应商议价（高）", content: "波音、空客双寡头供飞机；油价由全球能源市场决定；机场起降时刻稀缺。" },
      { label: "买方议价（高）", content: "OTA 和价格比较网站让票价完全透明；商务/休闲客户都极易切换。" },
      { label: "新进入者威胁（中）", content: "资本、牌照、机场时刻是高壁垒，但低成本航空仍持续涌现。" },
      { label: "替代品威胁（中-高）", content: "高铁、视频会议、汽车都是替代品；中短途尤其受高铁冲击。" },
      { label: "行业竞争（高）", content: "存量航司众多、产品高度同质、退出壁垒（飞机折旧、工会、政府兜底）极高。" },
    ],
    takeaway: "五力都不利 → 巴菲特名言"如果当年莱特兄弟那架飞机被打下来，所有投资人会更幸福"。航空业能赚钱的少数玩家，都靠极致成本（西南、瑞安）或高端差异化（新加坡航空）。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt: "下列哪种情况会让"新进入者威胁"显著升高？",
      options: [
        { id: "a", label: "行业品牌忠诚度极强" },
        { id: "b", label: "需要 100 亿初始资本" },
        { id: "c", label: "技术开源且边际成本极低" },
        { id: "d", label: "受严格牌照监管" },
      ],
      correct: ["c"],
      explanation: "进入壁垒越低 → 新进入威胁越高。开源技术 + 低边际成本是典型低壁垒。其他三项都是高壁垒。",
    },
    {
      id: "q2",
      type: "single",
      prompt: "可口可乐对装罐厂的关系，体现了哪种力的低强度？",
      options: [
        { id: "a", label: "供应商议价能力低" },
        { id: "b", label: "买方议价能力低" },
        { id: "c", label: "新进入者威胁低" },
        { id: "d", label: "替代品威胁低" },
      ],
      correct: ["b"],
      explanation: "可口可乐通过控制配方专利和品牌，把装罐厂（其买方/合作伙伴）置于弱议价地位，是典型买方议价低的案例。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "下列哪些是"行业内竞争激烈"的标志（多选）？",
      options: [
        { id: "a", label: "竞争者数量多且实力相当" },
        { id: "b", label: "产品高度同质" },
        { id: "c", label: "行业增长缓慢" },
        { id: "d", label: "退出壁垒高" },
      ],
      correct: ["a", "b", "c", "d"],
      explanation: "这四项都会加剧竞争——蛋糕不长但分蛋糕的人多、产品同质化逼大家拼价格、退不出去只能死磕。",
    },
  ],
  tips: [
    "做五力分析前先界定清楚"行业边界"——汽车业、新能源车、城市内出行是三个不同行业。",
    "每力评分时举具体证据（数据/事件），避免主观打分。",
    "五力是行业层面工具，不替代企业层面战略——结合 VRIO、价值链使用。",
    "动态看：今天的进入壁垒可能因技术突破（如 AI）半年内瓦解。",
  ],
  pitfalls: [
    "把"竞争对手数量多"等同于"行业不赚钱"——还要看差异化与退出壁垒。",
    "忽略互补品（如游戏机与游戏）——后人补充的"第六力"。",
    "只做静态分析，不预测五力未来 3-5 年走向。",
    "把五力当 SWOT 用——五力是行业层面，SWOT 是企业层面。",
  ],
}
```

- [ ] **Step 2: 在 `content/frameworks/index.ts` 用真实数据替换 `porter5` placeholder**

```ts
import { porter5 } from "./porter5"
// ... 在数组中
[swot, pestel, porter5, placeholder("valuechain", ...), placeholder("vrio", ...)]
```

- [ ] **Step 3: 创建 `components/widgets/porter5/FiveForcesDiagram.tsx`**

```tsx
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { fiveForcesScore, fiveForcesAttractiveness, type FiveForces } from "@/lib/score"
import { cn } from "@/lib/utils"

interface ForceConfig {
  key: keyof FiveForces
  label: string
  short: string
  position: { x: number; y: number; labelOffset: { dx: number; dy: number } }
}

const FORCES: ForceConfig[] = [
  { key: "entrants",    label: "新进入者威胁",    short: "新进入者",   position: { x: 300, y: 60,  labelOffset: { dx: 0, dy: -10 } } },
  { key: "supplier",    label: "供应商议价能力",  short: "供应商",     position: { x: 90,  y: 200, labelOffset: { dx: -10, dy: 0 } } },
  { key: "buyer",       label: "买方议价能力",    short: "买方",       position: { x: 510, y: 200, labelOffset: { dx: 10, dy: 0 } } },
  { key: "substitutes", label: "替代品威胁",      short: "替代品",     position: { x: 170, y: 380, labelOffset: { dx: 0, dy: 20 } } },
  { key: "rivalry",     label: "行业内竞争",      short: "行业竞争",   position: { x: 430, y: 380, labelOffset: { dx: 0, dy: 20 } } },
]

const PRESETS: Record<string, FiveForces> = {
  "航空业": { supplier: 5, buyer: 5, entrants: 3, substitutes: 4, rivalry: 5 },
  "云 SaaS": { supplier: 2, buyer: 3, entrants: 4, substitutes: 2, rivalry: 4 },
  "奶茶店": { supplier: 2, buyer: 4, entrants: 5, substitutes: 4, rivalry: 5 },
  "晶圆代工": { supplier: 4, buyer: 2, entrants: 1, substitutes: 1, rivalry: 2 },
}

const STRENGTH_LABEL = ["", "极弱", "弱", "中等", "强", "极强"]
const STRENGTH_COLOR = ["", "var(--chart-5)", "var(--chart-3)", "var(--accent)", "var(--chart-4)", "var(--destructive)"]

export function FiveForcesDiagram() {
  const [forces, setForces] = useState<FiveForces>({ supplier: 3, buyer: 3, entrants: 3, substitutes: 3, rivalry: 3 })
  const score = fiveForcesScore(forces)
  const attr = fiveForcesAttractiveness(score)
  const attrLabel = { high: "高", medium: "中", low: "低" }[attr]
  const attrColor = { high: "text-emerald-600", medium: "text-amber-600", low: "text-rose-600" }[attr]

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        给五个力打分（1=极弱，5=极强）。五力得分越低 → 行业利润空间越大 → 吸引力越高。
      </p>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <svg viewBox="0 0 600 460" className="w-full h-auto" role="img" aria-label="波特五力辐射图">
            {/* 中心 */}
            <circle cx="300" cy="220" r="58" fill="var(--primary)" />
            <text x="300" y="216" textAnchor="middle" fill="var(--primary-foreground)" className="font-serif" fontSize="13" fontWeight="700">行业内</text>
            <text x="300" y="232" textAnchor="middle" fill="var(--primary-foreground)" className="font-serif" fontSize="13" fontWeight="700">竞争强度</text>
            <text x="300" y="252" textAnchor="middle" fill="var(--primary-foreground)" fontSize="10" opacity="0.8">Industry Rivalry</text>

            {/* 箭头 + 周边节点 */}
            {FORCES.map((f) => {
              const v = forces[f.key]
              const color = STRENGTH_COLOR[v]
              const r = 50
              const isCenter = f.key === "rivalry"
              if (isCenter) return null  // rivalry 表示在中心圆

              // 计算指向中心的箭头
              const cx = 300, cy = 220
              const dx = cx - f.position.x
              const dy = cy - f.position.y
              const len = Math.sqrt(dx * dx + dy * dy)
              const ux = dx / len, uy = dy / len
              const startX = f.position.x + ux * r
              const startY = f.position.y + uy * r
              const endX = cx - ux * 60
              const endY = cy - uy * 60
              const strokeWidth = 1 + v * 0.8

              return (
                <g key={f.key}>
                  <defs>
                    <marker id={`arrow-${f.key}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
                    </marker>
                  </defs>
                  <line x1={startX} y1={startY} x2={endX} y2={endY} stroke={color} strokeWidth={strokeWidth} markerEnd={`url(#arrow-${f.key})`} opacity="0.85" />
                  <circle cx={f.position.x} cy={f.position.y} r={r} fill="var(--card)" stroke={color} strokeWidth="2" />
                  <text x={f.position.x} y={f.position.y - 4} textAnchor="middle" className="font-serif" fontSize="12" fontWeight="700" fill="var(--foreground)">{f.short}</text>
                  <text x={f.position.x} y={f.position.y + 12} textAnchor="middle" fontSize="10" fill="var(--muted-foreground)">{STRENGTH_LABEL[v]}</text>
                  <text x={f.position.x} y={f.position.y + 26} textAnchor="middle" fontSize="13" fontWeight="700" fill={color}>{v}/5</text>
                </g>
              )
            })}

            {/* 行业内竞争自身强度环 */}
            <circle cx="300" cy="220" r={66 + forces.rivalry * 4} fill="none" stroke={STRENGTH_COLOR[forces.rivalry]} strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
          </svg>

          <div className="grid grid-cols-3 gap-4 border-t border-border pt-3 mt-2">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">五力得分</div>
              <div className="font-serif text-2xl font-bold tabular-nums">{score.toFixed(1)}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">行业吸引力</div>
              <div className={cn("font-serif text-2xl font-bold", attrColor)}>{attrLabel}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">建议</div>
              <div className="text-sm leading-snug pt-1">
                {attr === "high" && "可重点投入"}
                {attr === "medium" && "需差异化策略"}
                {attr === "low" && "谨慎进入或寻找蓝海"}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">预设行业</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(PRESETS).map(([name, p]) => (
                <Button key={name} variant="outline" size="sm" onClick={() => setForces(p)}>{name}</Button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {FORCES.map((f) => (
              <div key={f.key}>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-sm font-medium">{f.label}</span>
                  <span className="text-xs tabular-nums text-muted-foreground">{forces[f.key]} / 5 · {STRENGTH_LABEL[forces[f.key]]}</span>
                </div>
                <input
                  type="range" min={1} max={5} step={1}
                  value={forces[f.key]}
                  onChange={(e) => setForces((v) => ({ ...v, [f.key]: Number(e.target.value) }))}
                  className="w-full accent-[var(--accent)]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: 在 `app/frameworks/[slug]/page.tsx` 注册**

```tsx
import { FiveForcesDiagram } from "@/components/widgets/porter5/FiveForcesDiagram"
// ... 修改 renderInteractive
case "porter5": return <FiveForcesDiagram />
// renderVisualization 用同一个简短引导
case "porter5": return <Porter5Intro />
// 加 helper:
function Porter5Intro() {
  return (
    <div className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground text-center">
      下方互动五力辐射图为核心可视化——评分越高的力箭头越粗。
    </div>
  )
}
```

- [ ] **Step 5: 启动 dev 验证**

```bash
pnpm dev
```

Expected: 五力图显示 4 个外围节点 + 中心，滑块调节箭头粗细 + 颜色，预设切换正常

- [ ] **Step 6: 停 dev、提交**

```bash
git add -A
git -c commit.gpgsign=false commit -m "feat(porter5): add Five Forces with custom SVG radial diagram"
```

---

## Task 15: 波特价值链 — 自定义 SVG 价值链图

**Files:**
- Create: `content/frameworks/valuechain.ts`
- Create: `components/widgets/valuechain/ValueChainDiagram.tsx`
- Modify: `app/frameworks/[slug]/page.tsx`
- Modify: `content/frameworks/index.ts`

- [ ] **Step 1: 创建 `content/frameworks/valuechain.ts`**

```ts
import type { Framework } from "../types"

export const valuechain: Framework = {
  slug: "valuechain",
  number: 4,
  chapter: 1,
  nameZh: "波特价值链",
  nameEn: "Porter's Value Chain",
  difficulty: "intermediate",
  estimatedMinutes: 12,
  tagline: "把企业活动拆成 5 主 + 4 支持，看清谁在创造价值、谁在吃成本。",
  definition: {
    tldr: "价值链模型把企业拆解为五项基本活动 + 四项支持活动，识别每个环节的价值创造与成本来源。",
    details: [
      "波特 1985 年在《竞争优势》提出。背后的思想是：企业不是一个黑盒，而是一系列环环相扣的活动。",
      "五项主活动按物流逻辑串起来：入库物流 → 生产 → 出库物流 → 营销与销售 → 服务。",
      "四项支持活动横跨所有主活动：基础设施、人力资源、技术开发、采购。",
      "右端的"利润"不是凭空而来——它是各活动加成（增值）减去成本后的剩余。",
    ],
  },
  concepts: [
    { title: "入库物流 Inbound Logistics", description: "原材料接收、存储、仓储、库存管理。" },
    { title: "生产 Operations", description: "原材料 → 成品的全部转化活动，含质量控制。" },
    { title: "出库物流 Outbound Logistics", description: "成品仓储、订单处理、配送给客户。" },
    { title: "营销与销售 Marketing & Sales", description: "品牌、广告、定价、销售队伍、渠道。" },
    { title: "服务 Service", description: "安装、维修、培训、退换、客户支持。" },
    { title: "基础设施", description: "管理、财务、法务、规划——支撑全企业运转。" },
    { title: "人力资源", description: "招聘、培训、薪酬、文化。" },
    { title: "技术开发", description: "研发、流程创新、信息系统。" },
    { title: "采购", description: "供应商管理、采购战略——影响所有主活动的投入。" },
  ],
  caseStudy: {
    title: "苹果 vs 沃尔玛 — 同样的价值链，不同的赢法",
    scenario: "两家世界级公司用截然不同的价值链配置赢得各自市场。",
    analysis: [
      { label: "苹果·重营销与服务", content: "营销与销售（直营 Apple Store、品牌溢价）+ 服务（生态绑定）创造大部分价值；生产环节外包给富士康。" },
      { label: "苹果·技术开发是核心", content: "M 系列芯片、操作系统是支持活动里的最大投入，赋能全主活动。" },
      { label: "沃尔玛·重物流与采购", content: "全球最大私营物流网 + 极致采购议价能力把成本压到最低，再回馈低价。" },
      { label: "沃尔玛·营销不重要", content: "靠"低价"本身做营销，广告投入相对收入很低。" },
    ],
    takeaway: "价值链分析的关键不是"哪些活动多"，而是"哪些活动是你区别于对手的关键"——苹果靠营销+技术，沃尔玛靠物流+采购，活动配置决定竞争优势。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt: "下列哪一项属于"支持活动"？",
      options: [
        { id: "a", label: "原材料入库" },
        { id: "b", label: "终端配送给消费者" },
        { id: "c", label: "招聘工程师" },
        { id: "d", label: "品牌广告投放" },
      ],
      correct: ["c"],
      explanation: "招聘属于人力资源，是横跨所有主活动的支持活动。a 是入库物流（主），b 是出库物流（主），d 是营销（主）。",
    },
    {
      id: "q2",
      type: "judge",
      prompt: "采购属于主活动。",
      options: [
        { id: "t", label: "正确" },
        { id: "f", label: "错误" },
      ],
      correct: ["f"],
      explanation: "采购在波特原模型里属于支持活动，因为它服务于所有主活动的投入需求，不只是入库物流。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "如果你想分析某公司"成本优势"来源，应当重点分析（多选）：",
      options: [
        { id: "a", label: "采购成本（议价、规模）" },
        { id: "b", label: "生产效率（自动化、规模经济）" },
        { id: "c", label: "物流成本（配送密度、距离）" },
        { id: "d", label: "客户净推荐值" },
      ],
      correct: ["a", "b", "c"],
      explanation: "成本优势来自高成本活动的优化。客户 NPS 反映服务/营销效果，与成本关系间接。",
    },
  ],
  tips: [
    "先标出每项活动的成本占比，再问"这项活动我比对手强/弱多少？"",
    "做"活动地图"——把活动间的依赖与信息流画出来，找瓶颈。",
    "用价值链找差异化，而不是平均用力——大部分活动只需做到行业平均。",
    "结合 VRIO：价值链识别活动，VRIO 评估这些活动是否构成持续优势。",
  ],
  pitfalls: [
    "把价值链画成流程图，忘记"每项活动应创造的价值"分析。",
    "只看主活动，忘了 4 个支持活动也消耗大量成本（尤其 IT 与基础设施）。",
    "孤立看每个活动，忽略活动间的协同（如出库物流与服务的耦合）。",
    "把价值链当一次性的咨询交付物，不持续更新。",
  ],
}
```

- [ ] **Step 2: 创建 `components/widgets/valuechain/ValueChainDiagram.tsx`**

```tsx
"use client"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface Activity {
  key: string
  label: string
  short: string
  description: string
  type: "support" | "primary"
  presetCost: { apple: number; walmart: number }
  presetValue: { apple: number; walmart: number }
}

const PRIMARY: Activity[] = [
  { key: "inbound",   label: "入库物流", short: "Inbound",   description: "原材料接收、存储、仓储、库存管理", type: "primary", presetCost: { apple: 8, walmart: 18 }, presetValue: { apple: 5, walmart: 25 } },
  { key: "ops",       label: "生产",     short: "Operations", description: "把投入转化为成品的核心制造活动", type: "primary", presetCost: { apple: 35, walmart: 5 }, presetValue: { apple: 20, walmart: 5 } },
  { key: "outbound",  label: "出库物流", short: "Outbound",  description: "成品仓储、订单处理、配送给客户",   type: "primary", presetCost: { apple: 5, walmart: 22 }, presetValue: { apple: 5, walmart: 25 } },
  { key: "marketing", label: "营销与销售", short: "Marketing", description: "品牌、广告、定价、渠道、销售队伍", type: "primary", presetCost: { apple: 18, walmart: 6 }, presetValue: { apple: 35, walmart: 10 } },
  { key: "service",   label: "服务",     short: "Service",   description: "安装、维修、培训、退换、客户支持", type: "primary", presetCost: { apple: 8, walmart: 4 }, presetValue: { apple: 20, walmart: 8 } },
]

const SUPPORT: Activity[] = [
  { key: "infra",  label: "企业基础设施", short: "Infrastructure", description: "管理、财务、法务、规划",         type: "support", presetCost: { apple: 6, walmart: 8 }, presetValue: { apple: 3, walmart: 5 } },
  { key: "hr",     label: "人力资源",     short: "HR",             description: "招聘、培训、薪酬、文化",         type: "support", presetCost: { apple: 8, walmart: 12 }, presetValue: { apple: 5, walmart: 8 } },
  { key: "tech",   label: "技术开发",     short: "R&D",            description: "研发、流程创新、信息系统",       type: "support", presetCost: { apple: 12, walmart: 5 }, presetValue: { apple: 7, walmart: 4 } },
  { key: "procure",label: "采购",         short: "Procurement",    description: "供应商管理、采购战略",           type: "support", presetCost: { apple: 0, walmart: 20 }, presetValue: { apple: 0, walmart: 10 } },
]

type Preset = "apple" | "walmart" | "custom"

export function ValueChainDiagram() {
  const [preset, setPreset] = useState<Preset>("apple")
  const [hovered, setHovered] = useState<string | null>(null)

  const activities = [...PRIMARY, ...SUPPORT]
  const get = (a: Activity) => preset === "custom"
    ? { cost: 10, value: 10 }
    : { cost: a.presetCost[preset], value: a.presetValue[preset] }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground mr-1">公司预设：</span>
        {(["apple", "walmart"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPreset(p)}
            className={cn(
              "rounded border px-3 py-1 text-xs transition-colors",
              preset === p ? "border-accent bg-accent/10 text-accent-foreground" : "border-border hover:border-accent/50"
            )}
          >
            {p === "apple" ? "苹果" : "沃尔玛"}
          </button>
        ))}
        <span className="text-xs text-muted-foreground ml-2">点击任意活动查看详情</span>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 overflow-x-auto">
        <svg viewBox="0 0 880 360" className="w-full h-auto min-w-[720px]" role="img" aria-label="波特价值链">
          <defs>
            <linearGradient id="vc-arrow-grad" x1="0" x2="1">
              <stop offset="0" stopColor="var(--primary)" stopOpacity="0.85" />
              <stop offset="1" stopColor="var(--accent)" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* 支持活动 — 4 横条在上方 */}
          {SUPPORT.map((a, i) => {
            const y = 20 + i * 38
            const v = get(a)
            const isHov = hovered === a.key
            return (
              <g key={a.key} onMouseEnter={() => setHovered(a.key)} onMouseLeave={() => setHovered(null)} style={{ cursor: "pointer" }}>
                <rect x="20" y={y} width="840" height="32" fill={isHov ? "var(--accent)" : "var(--secondary)"} fillOpacity={isHov ? 0.2 : 1} stroke="var(--border)" />
                <text x="32" y={y + 21} fill="var(--foreground)" className="font-serif" fontSize="13" fontWeight="700">{a.label}</text>
                <text x="180" y={y + 21} fill="var(--muted-foreground)" fontSize="11">{a.description}</text>
                <text x="850" y={y + 21} textAnchor="end" fill="var(--accent)" fontSize="12" fontWeight="700">¥成本 {v.cost}%</text>
              </g>
            )
          })}

          {/* 主活动 — 5 个箭头形状 */}
          {PRIMARY.map((a, i) => {
            const w = 156
            const x = 20 + i * w
            const y = 200
            const tip = 20  // 箭头尖
            const v = get(a)
            const isHov = hovered === a.key
            const fill = isHov ? "var(--accent)" : "var(--primary)"
            const fillOpacity = isHov ? 0.85 : 1

            // arrow shape
            const path = `M ${x} ${y} L ${x + w - tip} ${y} L ${x + w} ${y + 50} L ${x + w - tip} ${y + 100} L ${x} ${y + 100} L ${x + tip} ${y + 50} Z`
            return (
              <g key={a.key} onMouseEnter={() => setHovered(a.key)} onMouseLeave={() => setHovered(null)} style={{ cursor: "pointer" }}>
                <path d={path} fill={fill} fillOpacity={fillOpacity} stroke="var(--border)" />
                <text x={x + w / 2} y={y + 38} textAnchor="middle" fill={isHov ? "var(--accent-foreground)" : "var(--primary-foreground)"} className="font-serif" fontSize="14" fontWeight="700">{a.label}</text>
                <text x={x + w / 2} y={y + 56} textAnchor="middle" fill={isHov ? "var(--accent-foreground)" : "var(--primary-foreground)"} fontSize="10" opacity="0.7">{a.short}</text>
                <text x={x + w / 2} y={y + 78} textAnchor="middle" fill={isHov ? "var(--accent-foreground)" : "var(--primary-foreground)"} fontSize="11" fontWeight="700">价值 {v.value}%</text>
              </g>
            )
          })}

          {/* 利润标签 */}
          <g>
            <rect x="20" y="320" width="840" height="28" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="6 4" rx="2" />
            <text x="440" y="340" textAnchor="middle" fill="var(--accent)" className="font-serif" fontSize="14" fontWeight="700">总价值 = 各活动价值之和 → 减去成本 → 利润 Margin</text>
          </g>
        </svg>
      </div>

      {hovered && (
        <div className="rounded-lg border border-accent/40 bg-accent/5 p-4">
          {(() => {
            const a = activities.find((x) => x.key === hovered)
            if (!a) return null
            const v = get(a)
            return (
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">{a.type === "primary" ? "主活动" : "支持活动"}</span>
                  <h4 className="font-serif font-bold">{a.label}</h4>
                  <span className="text-xs text-muted-foreground italic">{a.short}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{a.description}</p>
                <div className="flex gap-6 text-sm">
                  <div>成本占比 <span className="font-bold tabular-nums text-foreground">{v.cost}%</span></div>
                  <div>价值贡献 <span className="font-bold tabular-nums text-foreground">{v.value}%</span></div>
                </div>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: 注册到 index 与 page**

`content/frameworks/index.ts` 中：
```ts
import { valuechain } from "./valuechain"
// 数组中替换 placeholder("valuechain", ...) 为 valuechain
```

`app/frameworks/[slug]/page.tsx`：
```tsx
import { ValueChainDiagram } from "@/components/widgets/valuechain/ValueChainDiagram"
// renderInteractive
case "valuechain": return <ValueChainDiagram />
case "valuechain": return <ValueChainIntro />
// helper
function ValueChainIntro() {
  return <div className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground text-center">下方互动价值链图即为核心可视化——切换公司预设观察活动配置差异。</div>
}
```

- [ ] **Step 4: dev 验证**

```bash
pnpm dev
```

Expected: 价值链图显示 4 支持横条 + 5 主活动箭头，hover 高亮且显示详情，预设切换数字变化

- [ ] **Step 5: 停 dev、提交**

```bash
git add -A
git -c commit.gpgsign=false commit -m "feat(valuechain): add Porter Value Chain with interactive SVG"
```

---

## Task 16: VRIO — 决策流程图 widget

**Files:**
- Create: `content/frameworks/vrio.ts`
- Create: `components/widgets/vrio/VrioFlow.tsx`
- Modify: `content/frameworks/index.ts` 与 `app/frameworks/[slug]/page.tsx`

- [ ] **Step 1: 创建 `content/frameworks/vrio.ts`**

```ts
import type { Framework } from "../types"

export const vrio: Framework = {
  slug: "vrio",
  number: 5,
  chapter: 1,
  nameZh: "VRIO 分析",
  nameEn: "VRIO Framework",
  difficulty: "intermediate",
  estimatedMinutes: 10,
  tagline: "评估一项资源能不能给企业带来"持续"竞争优势——四道关卡逐一过。",
  definition: {
    tldr: "VRIO 通过四个连续问题判断资源/能力的竞争意义：是否有价值（V）、是否稀缺（R）、是否难以模仿（I）、组织是否能利用（O）。",
    details: [
      "VRIO 由 Jay Barney 在资源基础观（RBV）上发展，回答"什么样的资源能带来长期赚钱能力"。",
      "四问串行：任何一问是"否"，资源的竞争意义就到此为止。",
      "全部"是" → 持续竞争优势；前三是、O 否 → 暂时优势；只有 V → 均势；V 否 → 劣势。",
      "实战中，"组织是否能利用"经常被忽视——很多公司有好资源但组织能力跟不上，最后浪费。",
    ],
  },
  concepts: [
    { title: "Valuable 有价值", description: "能否帮企业利用机会或抵御威胁？产生效益吗？" },
    { title: "Rare 稀缺", description: "竞争对手是否拥有？少数公司拥有才稀缺。" },
    { title: "Inimitable 难以模仿", description: "复制需要多高的成本/时间？历史路径、复杂因果、社会复杂性是常见护城河。" },
    { title: "Organized 组织化", description: "公司流程、文化、激励机制是否能让这项资源真正发挥作用？" },
  ],
  caseStudy: {
    title: "可口可乐配方 vs 苹果生态",
    scenario: "用 VRIO 对比两家公司的"传奇资源"是否真的构成持续优势。",
    analysis: [
      { label: "可口可乐配方", content: "V 是（有价值）、R 是（稀缺，业内独有）、I 是（专利+秘方传统极难复制）、O 是（百年组织能力支撑分销 + 营销） → 持续优势。" },
      { label: "苹果生态", content: "V 是（高粘性）、R 是（生态完整度独一无二）、I 是（硬件 + 软件 + 服务 + 用户基数 + 开发者飞轮 = 极难复制）、O 是（组织围绕生态构建的运营能力）→ 持续优势。" },
      { label: "对照：某 SaaS 的"AI 大模型"", content: "V 是、R 否（人人都能调用 GPT-4） → 至多带来均势，光有大模型不够。" },
    ],
    takeaway: "时代变了，"是否稀缺"和"是否难以模仿"快速贬值——AI、云、数据这些当年的护城河，今天可能 6 个月就被填平。VRIO 不是一次性结论，而是常态化的诊断。",
  },
  quiz: [
    {
      id: "q1",
      type: "single",
      prompt: "某公司有先进的 ERP 系统（V 是），但行业内绝大多数公司也都用类似的（R 否）。这项资源给公司带来：",
      options: [
        { id: "a", label: "持续竞争优势" },
        { id: "b", label: "暂时竞争优势" },
        { id: "c", label: "竞争均势" },
        { id: "d", label: "竞争劣势" },
      ],
      correct: ["c"],
      explanation: "V 是、R 否（人人都有）→ 不可能成为差异化武器，只能保持竞争均势（不掉队但也不领先）。",
    },
    {
      id: "q2",
      type: "single",
      prompt: "某药企研发出新药专利（V/R/I 都是），但商业化团队薄弱、推广乏力（O 否）。结果是：",
      options: [
        { id: "a", label: "持续竞争优势" },
        { id: "b", label: "暂时竞争优势" },
        { id: "c", label: "竞争均势" },
        { id: "d", label: "竞争劣势" },
      ],
      correct: ["b"],
      explanation: "VRI 都满足只缺 O → 暂时优势。专利期内还能赚钱，但因为组织无法充分利用，赚得不充分；专利到期后优势消失。",
    },
    {
      id: "q3",
      type: "multi",
      prompt: "下列哪些常见因素让一项资源"难以模仿（I）"？",
      options: [
        { id: "a", label: "历史路径依赖（如长期积累的品牌）" },
        { id: "b", label: "因果模糊（说不清为什么有效）" },
        { id: "c", label: "社会复杂性（文化、关系网络）" },
        { id: "d", label: "纯靠资金堆出来的设备" },
      ],
      correct: ["a", "b", "c"],
      explanation: "纯靠资金的资产是最容易被复制的——别人也能花钱买。a/b/c 是经典的"难以模仿"机制。",
    },
  ],
  tips: [
    "做 VRIO 时一项一项资源/能力分别评估，不要一锅炖。",
    "把 VRIO 与价值链结合：先用价值链找出关键活动 → 再用 VRIO 评估每个活动的资源。",
    "动态视角：今天的"稀缺"明年可能就普及，定期重评。",
    "O（组织）是最容易被忽视也最容易被低估的护城河——文化、流程、激励机制极难复制。",
  ],
  pitfalls: [
    "只看资源不看活动——"专利"本身不创造价值，使用专利的活动才创造价值。",
    "把规模/资金本身当持续优势——这两项最容易被有钱的对手追平。",
    "忽视 O，只盯着 V/R/I，结果"好资源用不出来"。",
    "把 VRIO 当四象限工具，混淆顺序——它是串行四问，不是平行评估。",
  ],
}
```

- [ ] **Step 2: 创建 `components/widgets/vrio/VrioFlow.tsx`**

```tsx
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, X, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

const QUESTIONS = [
  { key: "V", label: "有价值 Valuable", question: "这项资源能帮你利用机会或抵御威胁、创造经济价值吗？" },
  { key: "R", label: "稀缺 Rare", question: "在你的行业里，是少数公司才拥有这项资源吗？" },
  { key: "I", label: "难以模仿 Inimitable", question: "竞争对手要复制这项资源会面临极高的成本或时间障碍吗？" },
  { key: "O", label: "组织化 Organized", question: "你的公司有适合的流程、文化、激励来真正利用这项资源吗？" },
] as const

type Answer = "yes" | "no" | null
type Answers = Record<"V" | "R" | "I" | "O", Answer>

interface ResourceCase {
  name: string
  hint: string
  answers: Answers
  conclusion: string
}

const PRESETS: ResourceCase[] = [
  { name: "可口可乐秘方", hint: "百年专利+保密", answers: { V: "yes", R: "yes", I: "yes", O: "yes" }, conclusion: "持续竞争优势" },
  { name: "某 SaaS 接的 GPT-4 API", hint: "通用大模型能力", answers: { V: "yes", R: "no", I: "no", O: "yes" }, conclusion: "竞争均势" },
  { name: "重金购买的高端设备", hint: "竞争对手也能买", answers: { V: "yes", R: "no", I: "no", O: "yes" }, conclusion: "竞争均势" },
  { name: "新药专利+弱商业化团队", hint: "好资源用不出来", answers: { V: "yes", R: "yes", I: "yes", O: "no" }, conclusion: "暂时竞争优势" },
]

function evaluate(a: Answers): { tier: string; color: string; explanation: string } {
  if (a.V === "no") return { tier: "竞争劣势 Disadvantage", color: "text-rose-600 bg-rose-50 dark:bg-rose-950/30 border-rose-300", explanation: "资源没有价值，反而消耗成本——重新审视是否值得保留。" }
  if (a.R === "no") return { tier: "竞争均势 Parity", color: "text-slate-600 bg-slate-50 dark:bg-slate-900/40 border-slate-300", explanation: "有价值但不稀缺——可以维持业务正常运转，但无法形成差异化。" }
  if (a.I === "no") return { tier: "暂时竞争优势 Temporary", color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30 border-amber-300", explanation: "短期能赚到钱，但对手很快会复制——抓紧把暂时优势转化为别的护城河。" }
  if (a.O === "no") return { tier: "暂时竞争优势 Temporary", color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30 border-amber-300", explanation: "好资源但组织没用好——立刻补强组织能力（流程、文化、激励），否则浪费。" }
  return { tier: "持续竞争优势 Sustained", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300", explanation: "四问全是——这是真正的护城河。但仍需动态监控，今天的护城河明天可能贬值。" }
}

export function VrioFlow() {
  const [answers, setAnswers] = useState<Answers>({ V: null, R: null, I: null, O: null })
  const [resourceName, setResourceName] = useState("")

  const allAnswered = Object.values(answers).every((a) => a !== null)
  const result = allAnswered ? evaluate(answers) : null

  const setAt = (k: keyof Answers, v: Answer) => setAnswers((p) => ({ ...p, [k]: v }))
  const reset = () => { setAnswers({ V: null, R: null, I: null, O: null }); setResourceName("") }
  const apply = (p: ResourceCase) => { setResourceName(p.name); setAnswers(p.answers) }

  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-medium block mb-2">想评估的资源/能力</label>
        <input
          type="text"
          value={resourceName}
          onChange={(e) => setResourceName(e.target.value)}
          placeholder="例：我们公司的客户数据资产"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">或试试预设：</span>
          {PRESETS.map((p) => (
            <button key={p.name} onClick={() => apply(p)} className="text-xs underline-offset-4 hover:underline text-accent">{p.name}</button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <ol className="space-y-4">
          {QUESTIONS.map((q, i) => {
            const v = answers[q.key as "V" | "R" | "I" | "O"]
            const prevKeys = QUESTIONS.slice(0, i).map((x) => x.key as keyof Answers)
            const prevAllYes = prevKeys.every((k) => answers[k] === "yes")
            const blocked = i > 0 && !prevAllYes
            return (
              <li key={q.key}>
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-serif font-bold border",
                    v === "yes" && "bg-emerald-500 text-white border-emerald-500",
                    v === "no" && "bg-rose-500 text-white border-rose-500",
                    v === null && !blocked && "border-border bg-background",
                    v === null && blocked && "border-border bg-muted/50 text-muted-foreground"
                  )}>{q.key}</div>
                  <div className="flex-1 space-y-2">
                    <div>
                      <div className="font-serif font-bold text-sm">{q.label}</div>
                      <div className="text-sm text-muted-foreground">{q.question}</div>
                    </div>
                    {!blocked && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setAt(q.key as keyof Answers, "yes")}
                          className={cn("rounded border px-3 py-1 text-xs flex items-center gap-1",
                            v === "yes" ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40" : "border-border hover:border-emerald-400")}
                        >
                          <Check className="h-3 w-3" /> 是
                        </button>
                        <button
                          onClick={() => setAt(q.key as keyof Answers, "no")}
                          className={cn("rounded border px-3 py-1 text-xs flex items-center gap-1",
                            v === "no" ? "border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/40" : "border-border hover:border-rose-400")}
                        >
                          <X className="h-3 w-3" /> 否
                        </button>
                      </div>
                    )}
                    {blocked && (
                      <div className="text-xs text-muted-foreground italic">前一问答"否"已得出结论 — 此问无需评估</div>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      {result && (
        <div className={cn("rounded-lg border-2 p-5", result.color)}>
          <div className="text-xs uppercase tracking-wider opacity-70 mb-1">评估结论</div>
          <div className="font-serif text-2xl font-bold mb-2">{result.tier}</div>
          <p className="text-sm leading-relaxed">{result.explanation}</p>
          {resourceName && <div className="mt-3 text-xs italic">针对资源：{resourceName}</div>}
          <Button variant="outline" size="sm" onClick={reset} className="mt-4">
            <RotateCcw className="mr-2 h-3 w-3" />
            评估另一项资源
          </Button>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: 注册**

`content/frameworks/index.ts`：替换 `placeholder("vrio", ...)` 为 `vrio`。
`app/frameworks/[slug]/page.tsx`：
```tsx
import { VrioFlow } from "@/components/widgets/vrio/VrioFlow"
case "vrio": return <VrioFlow />
case "vrio": return <VrioIntro />
function VrioIntro() {
  return <div className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground text-center">VRIO 是一个串行四问的决策流程——直接进入下方互动开始评估你的资源。</div>
}
```

- [ ] **Step 4: dev 验证**

```bash
pnpm dev
```

Expected: VRIO 四问串行；点"否"后续问题置灰；可应用 4 个预设；结论卡片正确分类

- [ ] **Step 5: 停 dev、提交**

```bash
git add -A
git -c commit.gpgsign=false commit -m "feat(vrio): add VRIO sequential decision flow widget"
```

---

## Task 17: 首页 — Hero + 章节总览 + 25 框架网格

**Files:**
- Replace: `app/page.tsx`

- [ ] **Step 1: 替换 `app/page.tsx`**

```tsx
"use client"

import Link from "next/link"
import { TopBar } from "@/components/chrome/TopBar"
import { chapters } from "@/content/chapters"
import { frameworks } from "@/content/frameworks"
import { useLearning } from "@/lib/store"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Target, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export default function HomePage() {
  const visited = useLearning((s) => s.visited)
  const completed = useLearning((s) => s.completed)
  const visitedSet = new Set(visited)
  const completedSet = new Set(completed)

  return (
    <>
      <TopBar />
      <main>
        {/* HERO */}
        <section className="border-b border-border bg-gradient-to-b from-background to-secondary/30">
          <div className="mx-auto max-w-screen-xl px-4 py-16 lg:py-24">
            <div className="max-w-3xl space-y-6">
              <div className="text-xs uppercase tracking-[0.2em] text-accent font-bold">MBA & Consulting · 中文交互式课件</div>
              <h1 className="font-serif text-5xl lg:text-6xl font-bold leading-tight">
                25 个 MBA 经典分析框架，<br />
                边学边练，一次掌握。
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl">
                覆盖战略、营销、咨询、财务、组织变革、商业创新六大领域。
                每个框架都有逼真图表、可拖拽互动和案例测验——把厚厚的教材变成可上手的体验。
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild size="lg">
                  <Link href="/frameworks/swot">从 SWOT 开始 <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#frameworks">浏览全部 25 个</Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border max-w-md">
                <Stat icon={BookOpen} label="经典框架" value="25" />
                <Stat icon={Target} label="实战案例" value="25+" />
                <Stat icon={Zap} label="互动玩法" value="100+" />
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTERS */}
        <section className="mx-auto max-w-screen-xl px-4 py-16">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-serif text-3xl font-bold">六大章节</h2>
            <span className="text-sm text-muted-foreground tabular-nums">{visited.length}/25 已学</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {chapters.map((ch) => {
              const list = frameworks.filter((f) => f.chapter === ch.id)
              const visitedCount = list.filter((f) => visitedSet.has(f.slug)).length
              return (
                <article key={ch.id} className="rounded-lg border border-border bg-card p-6 hover:border-accent/50 transition-colors">
                  <div className="text-xs uppercase tracking-wider text-accent font-bold mb-2">第{["", "一", "二", "三", "四", "五", "六"][ch.id]}章</div>
                  <h3 className="font-serif text-xl font-bold mb-2">{ch.nameZh}</h3>
                  <div className="text-xs italic text-muted-foreground mb-3">{ch.nameEn}</div>
                  <p className="text-sm leading-relaxed text-muted-foreground mb-4">{ch.summary}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{list.length} 个框架</span>
                    <span className="tabular-nums text-foreground">{visitedCount}/{list.length} 已学</span>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* FRAMEWORK GRID */}
        <section id="frameworks" className="mx-auto max-w-screen-xl px-4 pb-24">
          <h2 className="font-serif text-3xl font-bold mb-2">全部 25 个框架</h2>
          <p className="text-sm text-muted-foreground mb-8">点击进入任何一个开始学习。已浏览的标记为深色，已通过测验的标记金色 ✓。</p>

          {chapters.map((ch) => {
            const list = frameworks.filter((f) => f.chapter === ch.id)
            return (
              <div key={ch.id} className="mb-10">
                <h3 className="font-serif text-lg font-bold mb-4 flex items-baseline gap-3">
                  <span className="text-accent">第{["", "一", "二", "三", "四", "五", "六"][ch.id]}章</span>
                  <span>{ch.nameZh}</span>
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((f) => {
                    const isVisited = visitedSet.has(f.slug)
                    const isCompleted = completedSet.has(f.slug)
                    const hasContent = f.definition.tldr !== ""  // 已实现内容
                    return (
                      <Link
                        key={f.slug}
                        href={`/frameworks/${f.slug}`}
                        className={cn(
                          "group rounded-lg border bg-card p-4 transition-all",
                          isCompleted ? "border-accent/60" : "border-border",
                          hasContent ? "hover:border-accent hover:shadow-sm" : "opacity-60"
                        )}
                      >
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="tabular-nums text-xs text-muted-foreground">{String(f.number).padStart(2, "0")}</span>
                          {isCompleted && <Badge className="bg-accent text-accent-foreground hover:bg-accent">✓ 已通过</Badge>}
                          {isVisited && !isCompleted && <Badge variant="outline">已学</Badge>}
                          {!hasContent && <Badge variant="outline">即将上线</Badge>}
                        </div>
                        <div className="font-serif font-bold text-base mb-1">{f.nameZh}</div>
                        <div className="text-xs italic text-muted-foreground mb-2">{f.nameEn}</div>
                        {f.tagline && <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">{f.tagline}</p>}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </section>

        <footer className="border-t border-border bg-card/40 no-print">
          <div className="mx-auto max-w-screen-xl px-4 py-8 text-xs text-muted-foreground flex justify-between flex-wrap gap-4">
            <div>© 2026 MBA 经典框架交互课件 · 内容基于公开 MBA & 咨询经典模型</div>
            <div className="space-x-3">
              <Link href="/" className="hover:text-foreground">首页</Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <div className="font-serif text-3xl font-bold tabular-nums">{value}</div>
    </div>
  )
}
```

- [ ] **Step 2: dev 验证**

```bash
pnpm dev
```

访问 `http://localhost:3000`：
- Hero 显示
- 6 章节卡片
- 25 框架网格（前 5 个有内容、后 20 个标"即将上线"）

- [ ] **Step 3: 停 dev、提交**

```bash
git add app/page.tsx
git -c commit.gpgsign=false commit -m "feat: home page with hero, chapter overview, framework grid"
```

---

## Task 18: 静态导出配置 + build 验证

**Files:**
- Modify: `next.config.ts`
- Modify: `package.json`

- [ ] **Step 1: 修改 `next.config.ts` 启用静态导出**

```ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
}

export default nextConfig
```

- [ ] **Step 2: 运行 build**

```bash
pnpm build
```

Expected: 输出 `Route (app)` 表，包含 `/frameworks/swot`, `/frameworks/pestel`, `/frameworks/porter5`, `/frameworks/valuechain`, `/frameworks/vrio`, `/`，无错误。生成 `out/` 目录。

- [ ] **Step 3: 本地预览静态产物**

```bash
pnpm dlx serve out -p 3000
```

打开 http://localhost:3000 确认 5 个框架页都能直接访问。

- [ ] **Step 4: 跑测试**

```bash
pnpm test
```

Expected: 5 tests passed

- [ ] **Step 5: 提交**

```bash
git add next.config.ts
git -c commit.gpgsign=false commit -m "feat: enable static export and verify build"
```

---

## Task 19: 收尾验证清单

- [ ] **Step 1: 跑完整 lint**

```bash
pnpm lint
```

Expected: 无 error（warnings 可接受）

- [ ] **Step 2: 类型检查**

```bash
pnpm dlx tsc --noEmit
```

Expected: 无错误

- [ ] **Step 3: 跑测试**

```bash
pnpm test
```

Expected: 全绿

- [ ] **Step 4: 手动验证清单**

逐一访问并确认：
- [ ] `/` 首页加载，hero 字体正确（思源宋）
- [ ] `/frameworks/swot` 7 段都显示，拖拽工作，测验工作
- [ ] `/frameworks/pestel` 雷达图渲染，滑块/预设工作
- [ ] `/frameworks/porter5` 五力 SVG 渲染，滑块改变箭头
- [ ] `/frameworks/valuechain` 价值链 SVG 渲染，hover 详情
- [ ] `/frameworks/vrio` 四问流程，预设工作，结论分类正确
- [ ] 顶部目录抽屉打开，6 章节正确，前 5 个框架可点
- [ ] 进度条随访问页面增长

- [ ] **Step 5: 最后一次提交**

```bash
git add -A
git -c commit.gpgsign=false commit --allow-empty -m "chore: verify batch 1 (chapter 1) complete and ready for batch 2"
```

---

## Self-Review

**Spec coverage:**
- ✓ 技术栈（任务 1-2）
- ✓ 设计 tokens（任务 3）
- ✓ 7 段模板（任务 10）
- ✓ Zustand 进度持久化（任务 6）
- ✓ 评分函数测试（任务 7）
- ✓ 5 个 chapter-1 框架完整内容 + 互动（任务 12-16）
- ✓ 首页（任务 17）
- ✓ 静态导出（任务 18）
- 待后续 batch：Dashboard、Glossary、暗色模式 toggle UI、键盘快捷键、移动端适配

**Placeholder scan:** 无 TBD/TODO/"implement later"。每个 step 都有完整代码或精确命令。

**Type consistency:**
- `Framework` 类型 (Task 4) 在所有 framework data file 中一致使用
- `LearningState.markVisited`、`saveQuizScore` 在 Task 6 定义，在 Task 9 (QuizCard) 和 Task 10 (FrameworkLayout) 一致使用
- `FiveForces` 类型在 Task 7 定义，在 Task 14 widget 中使用（key 一致：supplier/buyer/entrants/substitutes/rivalry）
- `QuizQuestion.type` enum 在 Task 4 定义，在 framework data 与 QuizCard 中一致

**Scope:** 本 plan 聚焦"脚手架 + 第一章"——可独立交付（含 5 个完整框架 + 首页 + build），下一个 plan 文件会处理 Batch 2（第二章 5 个市场战略框架）。
