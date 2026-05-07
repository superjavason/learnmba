import { describe, it, expect } from "vitest"
import {
  dupontROE,
  breakEvenUnits,
  breakEvenRevenue,
  npv,
  irr,
} from "@/lib/finance"

describe("dupontROE", () => {
  it("computes ROE = profitMargin × assetTurnover × equityMultiplier", () => {
    // 净利润 100, 收入 1000, 总资产 2000, 净资产 500
    // ProfitMargin = 0.1, Turnover = 0.5, EquityMult = 4 → ROE = 0.2
    const r = dupontROE({
      netIncome: 100,
      revenue: 1000,
      totalAssets: 2000,
      equity: 500,
    })
    expect(r.profitMargin).toBeCloseTo(0.1, 4)
    expect(r.assetTurnover).toBeCloseTo(0.5, 4)
    expect(r.equityMultiplier).toBeCloseTo(4, 4)
    expect(r.roe).toBeCloseTo(0.2, 4)
  })
  it("throws on zero revenue or zero equity", () => {
    expect(() =>
      dupontROE({ netIncome: 100, revenue: 0, totalAssets: 1000, equity: 500 })
    ).toThrow()
    expect(() =>
      dupontROE({ netIncome: 100, revenue: 1000, totalAssets: 1000, equity: 0 })
    ).toThrow()
  })
})

describe("breakEven", () => {
  it("breakEvenUnits = fixedCost / (price - unitVarCost)", () => {
    expect(breakEvenUnits({ fixedCost: 1000, price: 50, unitVarCost: 30 })).toBe(
      50
    )
  })
  it("breakEvenRevenue = breakEvenUnits × price", () => {
    expect(
      breakEvenRevenue({ fixedCost: 1000, price: 50, unitVarCost: 30 })
    ).toBe(2500)
  })
  it("returns Infinity if contribution margin <= 0", () => {
    expect(
      breakEvenUnits({ fixedCost: 1000, price: 30, unitVarCost: 30 })
    ).toBe(Infinity)
    expect(
      breakEvenUnits({ fixedCost: 1000, price: 20, unitVarCost: 30 })
    ).toBe(Infinity)
  })
})

describe("npv", () => {
  it("returns sum of discounted cashflows minus initial investment", () => {
    // Initial -100, then [50, 50, 50] at rate 0
    expect(npv(0, [-100, 50, 50, 50])).toBe(50)
  })
  it("discounts at given rate", () => {
    // [-100, 110] at 10% = -100 + 110/1.1 = 0
    expect(npv(0.1, [-100, 110])).toBeCloseTo(0, 6)
  })
  it("handles longer streams", () => {
    // [-1000, 300, 300, 300, 300] at 10%
    // = -1000 + 300/(1.1) + 300/(1.21) + 300/(1.331) + 300/(1.4641)
    const v = npv(0.1, [-1000, 300, 300, 300, 300])
    expect(v).toBeCloseTo(-49.04, 1) // ~-49
  })
})

describe("irr", () => {
  it("solves [-100, 110] → 10%", () => {
    expect(irr([-100, 110])).toBeCloseTo(0.1, 4)
  })
  it("solves [-1000, 500, 500, 500] → ~23.38%", () => {
    expect(irr([-1000, 500, 500, 500])).toBeCloseTo(0.2338, 3)
  })
  it("returns null for sign-only-positive streams", () => {
    expect(irr([100, 200, 300])).toBeNull()
  })
  it("returns null for sign-only-negative streams", () => {
    expect(irr([-100, -200, -300])).toBeNull()
  })
})
