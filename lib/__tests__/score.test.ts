import { describe, it, expect } from "vitest"
import {
  fiveForcesScore,
  pestelScore,
  fiveForcesAttractiveness,
} from "@/lib/score"

describe("fiveForcesScore", () => {
  it("averages five 1-5 force ratings", () => {
    expect(
      fiveForcesScore({
        supplier: 3,
        buyer: 3,
        entrants: 3,
        substitutes: 3,
        rivalry: 3,
      })
    ).toBe(3)
  })
  it("rejects out of range", () => {
    expect(() =>
      fiveForcesScore({
        supplier: 6,
        buyer: 3,
        entrants: 3,
        substitutes: 3,
        rivalry: 3,
      })
    ).toThrow()
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
    expect(
      pestelScore({
        political: 5,
        economic: 5,
        social: 5,
        technological: 5,
        environmental: 5,
        legal: 5,
      })
    ).toBe(5)
  })
})
