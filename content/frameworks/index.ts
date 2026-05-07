import type { Framework, ChapterId } from "../types"
import { swot } from "./swot"
import { pestel } from "./pestel"
import { porter5 } from "./porter5"

const placeholder = (
  slug: string,
  n: number,
  ch: ChapterId,
  zh: string,
  en: string,
  tagline = "",
): Framework => ({
  slug,
  number: n,
  chapter: ch,
  nameZh: zh,
  nameEn: en,
  difficulty: "beginner",
  estimatedMinutes: 8,
  tagline,
  definition: { tldr: "", details: [] },
  concepts: [],
  caseStudy: { title: "", scenario: "", analysis: [], takeaway: "" },
  quiz: [],
  tips: [],
  pitfalls: [],
})

export const frameworks: Framework[] = [
  swot,
  pestel,
  porter5,
  placeholder("valuechain", 4, 1, "波特价值链", "Porter's Value Chain", "企业活动哪儿创造价值。"),
  placeholder("vrio", 5, 1, "VRIO 分析", "VRIO Framework", "资源能否带来持续优势。"),
  placeholder("bcg", 6, 2, "BCG 矩阵", "BCG Growth-Share Matrix", "产品组合的资源配置。"),
  placeholder("ansoff", 7, 2, "安索夫矩阵", "Ansoff Matrix", "四种增长战略与风险。"),
  placeholder("blueocean", 8, 2, "蓝海战略", "Blue Ocean Strategy", "跳出红海、创造新需求。"),
  placeholder("stp", 9, 2, "STP 分析", "Segmentation, Targeting, Positioning", "细分、目标、定位三步法。"),
  placeholder("marketingmix", 10, 2, "4P/7P 营销组合", "Marketing Mix", "营销活动的可控变量。"),
  placeholder("pyramid", 11, 3, "金字塔原理", "Pyramid Principle", "结论先行的麦肯锡式表达。"),
  placeholder("mece", 12, 3, "MECE 原则", "Mutually Exclusive, Collectively Exhaustive", "结构化分解的基本功。"),
  placeholder("hypothesis", 13, 3, "假设驱动法", "Hypothesis-Driven Approach", "高效解决复杂问题。"),
  placeholder("issuetree", 14, 3, "问题树", "Issue Tree", "把大问题切到能直接分析。"),
  placeholder("pareto", 15, 3, "80/20 法则", "Pareto Principle", "抓住关键的少数。"),
  placeholder("sevens", 16, 3, "麦肯锡 7S 模型", "McKinsey 7S Framework", "组织变革的七个一致要素。"),
  placeholder("dupont", 17, 4, "杜邦分析法", "DuPont Analysis", "ROE 三层分解看盈利驱动。"),
  placeholder("breakeven", 18, 4, "盈亏平衡分析", "Break-Even Analysis", "找出收支相当的销售点。"),
  placeholder("npv", 19, 4, "NPV/IRR 投资决策", "Investment Decision Methods", "未来现金流贴现做决策。"),
  placeholder("bsc", 20, 5, "平衡计分卡", "Balanced Scorecard", "四维度平衡组织绩效。"),
  placeholder("kotter", 21, 5, "科特变革八步法", "Kotter's 8 Steps of Change", "组织变革的八步路径。"),
  placeholder("raci", 22, 5, "RACI 矩阵", "Responsibility Assignment Matrix", "项目角色与责任分配。"),
  placeholder("canvas", 23, 6, "商业模式画布", "Business Model Canvas", "九块画清商业模式。"),
  placeholder("disruptive", 24, 6, "颠覆性创新", "Disruptive Innovation", "低端切入逆袭主流。"),
  placeholder("designthinking", 25, 6, "设计思维", "Design Thinking", "以用户为中心的创新流程。"),
]

export function getFramework(slug: string): Framework | undefined {
  return frameworks.find((f) => f.slug === slug)
}

export function getFrameworksByChapter(chapter: ChapterId): Framework[] {
  return frameworks.filter((f) => f.chapter === chapter)
}
