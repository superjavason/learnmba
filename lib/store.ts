"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export interface QuizScore {
  score: number
  total: number
  lastAttemptAt: number
}

interface LearningState {
  visited: string[]
  completed: string[]
  scores: Record<string, QuizScore>
  theme: "light" | "dark" | "system"
  hydrated: boolean
  markVisited: (slug: string) => void
  saveQuizScore: (slug: string, score: number, total: number) => void
  setTheme: (t: "light" | "dark" | "system") => void
  reset: () => void
  setHydrated: (h: boolean) => void
}

export const useLearning = create<LearningState>()(
  persist(
    (set) => ({
      visited: [],
      completed: [],
      scores: {},
      theme: "system",
      hydrated: false,
      markVisited: (slug) =>
        set((s) => ({
          visited: s.visited.includes(slug) ? s.visited : [...s.visited, slug],
        })),
      saveQuizScore: (slug, score, total) =>
        set((s) => {
          const passed = total > 0 && score / total >= 0.8
          return {
            scores: {
              ...s.scores,
              [slug]: { score, total, lastAttemptAt: Date.now() },
            },
            completed:
              passed && !s.completed.includes(slug)
                ? [...s.completed, slug]
                : s.completed,
          }
        }),
      setTheme: (theme) => set({ theme }),
      reset: () => set({ visited: [], completed: [], scores: {} }),
      setHydrated: (hydrated) => set({ hydrated }),
    }),
    {
      name: "learnmba.v1",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : (undefined as never)
      ),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true)
      },
    }
  )
)
