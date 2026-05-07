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
import { canvas } from "./canvas"
import { disruptive } from "./disruptive"
import { designthinking } from "./designthinking"

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
  canvas,
  disruptive,
  designthinking,
]

export function getFramework(slug: string): Framework | undefined {
  return frameworks.find((f) => f.slug === slug)
}

export function getFrameworksByChapter(chapter: ChapterId): Framework[] {
  return frameworks.filter((f) => f.chapter === chapter)
}
