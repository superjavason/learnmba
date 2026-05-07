export interface FiveForces {
  supplier: number
  buyer: number
  entrants: number
  substitutes: number
  rivalry: number
}

export interface PestelDims {
  political: number
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
  if (score < 2.5) return "high"
  if (score < 3.5) return "medium"
  return "low"
}

export function pestelScore(p: PestelDims): number {
  for (const [k, v] of Object.entries(p)) assertRange(v, 0, 10, k)
  return (
    (p.political +
      p.economic +
      p.social +
      p.technological +
      p.environmental +
      p.legal) /
    6
  )
}
