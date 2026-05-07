"use client"

import { useEffect } from "react"
import type { Framework } from "@/content/types"
import { useLearning } from "@/lib/store"
import { Badge } from "@/components/ui/badge"
import { Clock, GraduationCap } from "lucide-react"
import { getChapter, CHAPTER_NUMERAL } from "@/content/chapters"
import { DefinitionBlock } from "./DefinitionBlock"
import { TipsBlock } from "./TipsBlock"
import { CaseStudyBlock } from "./CaseStudyBlock"
import { QuizCard } from "./QuizCard"
import { FrameworkNav } from "./FrameworkNav"
import { SectionHeading } from "./SectionHeading"

interface Props {
  framework: Framework
  visualization: React.ReactNode
  interactive: React.ReactNode
}

const difficultyLabel: Record<Framework["difficulty"], string> = {
  beginner: "入门",
  intermediate: "进阶",
  advanced: "高级",
}

export function FrameworkLayout({
  framework,
  visualization,
  interactive,
}: Props) {
  const markVisited = useLearning((s) => s.markVisited)
  useEffect(() => {
    markVisited(framework.slug)
  }, [framework.slug, markVisited])

  const chapter = getChapter(framework.chapter)

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 lg:py-14 space-y-14">
      <header className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>
            第 {CHAPTER_NUMERAL[framework.chapter]} 章 · {chapter?.nameZh}
          </span>
          <span aria-hidden>·</span>
          <span className="tabular-nums">
            框架 {String(framework.number).padStart(2, "0")}/25
          </span>
        </div>
        <h1 className="font-serif text-4xl lg:text-5xl font-bold leading-tight">
          {framework.nameZh}
          <span className="block mt-2 text-base lg:text-lg font-normal text-muted-foreground italic font-sans">
            {framework.nameEn}
          </span>
        </h1>
        {framework.tagline && (
          <p className="text-lg leading-relaxed text-muted-foreground max-w-3xl">
            {framework.tagline}
          </p>
        )}
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <Badge variant="outline" className="gap-1">
            <GraduationCap className="h-3 w-3" />
            {difficultyLabel[framework.difficulty]}
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" />
            约 {framework.estimatedMinutes} 分钟
          </Badge>
        </div>
      </header>

      {framework.definition.tldr && (
        <section className="space-y-4">
          <SectionHeading number="01" title="核心定义" subtitle="What is it?" />
          <DefinitionBlock
            tldr={framework.definition.tldr}
            details={framework.definition.details}
          />
        </section>
      )}

      <section className="space-y-4">
        <SectionHeading
          number="02"
          title="概念图表"
          subtitle="The Visualization"
        />
        {framework.concepts.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {framework.concepts.map((c) => (
              <div
                key={c.title}
                className="rounded-md border border-border/60 bg-card p-4"
              >
                <div className="font-serif font-bold text-sm mb-1">
                  {c.title}
                </div>
                <div className="text-sm leading-relaxed text-muted-foreground">
                  {c.description}
                </div>
              </div>
            ))}
          </div>
        )}
        {visualization}
      </section>

      <section className="space-y-4">
        <SectionHeading
          number="03"
          title="互动练习"
          subtitle="Try it yourself"
        />
        {interactive}
      </section>

      {framework.caseStudy.title && (
        <section className="space-y-4">
          <SectionHeading number="04" title="经典案例" subtitle="Case Study" />
          <CaseStudyBlock data={framework.caseStudy} />
        </section>
      )}

      <section className="space-y-4">
        <SectionHeading number="05" title="知识检测" subtitle="Quiz" />
        <QuizCard slug={framework.slug} questions={framework.quiz} />
      </section>

      {(framework.tips.length > 0 || framework.pitfalls.length > 0) && (
        <section className="space-y-4">
          <SectionHeading
            number="06"
            title="使用建议"
            subtitle="Tips & Pitfalls"
          />
          <TipsBlock
            tips={framework.tips}
            pitfalls={framework.pitfalls}
          />
        </section>
      )}

      <FrameworkNav slug={framework.slug} />
    </article>
  )
}
