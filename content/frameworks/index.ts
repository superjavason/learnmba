import type { Framework, ChapterId } from "../types"
import { swot } from "./swot"
import { pestel } from "./pestel"
import { porter5 } from "./porter5"
import { valuechain } from "./valuechain"
import { vrio } from "./vrio"
import { bcg } from "./bcg"
import { ansoff } from "./ansoff"
import { blueocean } from "./blueocean"
import { stp } from "./stp"
import { marketingmix } from "./marketingmix"
import { pyramid } from "./pyramid"
import { mece } from "./mece"
import { hypothesis } from "./hypothesis"
import { issuetree } from "./issuetree"
import { pareto } from "./pareto"
import { sevens } from "./sevens"
import { dupont } from "./dupont"
import { breakeven } from "./breakeven"
import { npvFramework } from "./npv"
import { bsc } from "./bsc"
import { kotter } from "./kotter"
import { raci } from "./raci"

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
  valuechain,
  vrio,
  bcg,
  ansoff,
  blueocean,
  stp,
  marketingmix,
  pyramid,
  mece,
  hypothesis,
  issuetree,
  pareto,
  sevens,
  dupont,
  breakeven,
  npvFramework,
  bsc,
  kotter,
  raci,
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
