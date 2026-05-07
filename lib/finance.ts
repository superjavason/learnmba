// ============== DuPont ==============

export interface DupontInput {
  netIncome: number
  revenue: number
  totalAssets: number
  equity: number
}

export interface DupontResult {
  profitMargin: number // 净利率
  assetTurnover: number // 总资产周转率
  equityMultiplier: number // 权益乘数
  roe: number
}

export function dupontROE(input: DupontInput): DupontResult {
  if (input.revenue === 0) throw new Error("revenue must not be zero")
  if (input.equity === 0) throw new Error("equity must not be zero")

  const profitMargin = input.netIncome / input.revenue
  const assetTurnover = input.revenue / input.totalAssets
  const equityMultiplier = input.totalAssets / input.equity
  const roe = profitMargin * assetTurnover * equityMultiplier
  return { profitMargin, assetTurnover, equityMultiplier, roe }
}

// ============== Break-Even ==============

export interface BreakEvenInput {
  fixedCost: number
  price: number
  unitVarCost: number
}

export function breakEvenUnits(b: BreakEvenInput): number {
  const cm = b.price - b.unitVarCost
  if (cm <= 0) return Infinity
  return b.fixedCost / cm
}

export function breakEvenRevenue(b: BreakEvenInput): number {
  const units = breakEvenUnits(b)
  if (!isFinite(units)) return Infinity
  return units * b.price
}

// ============== NPV / IRR ==============

/**
 * Net Present Value.
 * cashflows[0] is the time-0 cashflow (typically negative initial investment).
 * cashflows[i] is at end of year i.
 */
export function npv(rate: number, cashflows: number[]): number {
  return cashflows.reduce(
    (acc, cf, i) => acc + cf / Math.pow(1 + rate, i),
    0
  )
}

/**
 * Internal Rate of Return — finds rate r where npv(r, cashflows) = 0.
 * Uses bisection between -0.99 and 10.0 for robustness.
 * Returns null if no sign change in cashflows (no IRR exists).
 */
export function irr(cashflows: number[]): number | null {
  // Need at least one positive and one negative cashflow
  const hasPos = cashflows.some((c) => c > 0)
  const hasNeg = cashflows.some((c) => c < 0)
  if (!hasPos || !hasNeg) return null

  let lo = -0.99
  let hi = 10
  let fLo = npv(lo, cashflows)
  let fHi = npv(hi, cashflows)

  // If signs match, expand or fail
  if (fLo * fHi > 0) {
    // Try wider range
    hi = 100
    fHi = npv(hi, cashflows)
    if (fLo * fHi > 0) return null
  }

  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2
    const fMid = npv(mid, cashflows)
    if (Math.abs(fMid) < 1e-7) return mid
    if (fLo * fMid < 0) {
      hi = mid
      fHi = fMid
    } else {
      lo = mid
      fLo = fMid
    }
  }
  return (lo + hi) / 2
}
