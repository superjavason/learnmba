export type ChapterId = 1 | 2 | 3 | 4 | 5 | 6
export type Difficulty = "beginner" | "intermediate" | "advanced"

export interface Chapter {
  id: ChapterId
  nameZh: string
  nameEn: string
  summary: string
}

export interface QuizOption {
  id: string
  label: string
}

export interface QuizQuestion {
  id: string
  type: "single" | "multi" | "judge"
  prompt: string
  options: QuizOption[]
  correct: string[]
  explanation: string
}

export interface CaseStudy {
  title: string
  company?: string
  scenario: string
  analysis: { label: string; content: string }[]
  takeaway: string
}

export interface Concept {
  title: string
  description: string
}

export interface Framework {
  slug: string
  number: number
  chapter: ChapterId
  nameZh: string
  nameEn: string
  difficulty: Difficulty
  estimatedMinutes: number
  tagline: string
  definition: { tldr: string; details: string[] }
  concepts: Concept[]
  caseStudy: CaseStudy
  quiz: QuizQuestion[]
  tips: string[]
  pitfalls: string[]
}
