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
    summary: "细分、定位与增长选择的方法论，回答“在哪里竞争、如何竞争”。",
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

export const CHAPTER_NUMERAL: Record<number, string> = {
  1: "一",
  2: "二",
  3: "三",
  4: "四",
  5: "五",
  6: "六",
}
