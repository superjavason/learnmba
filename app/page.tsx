"use client"

import Link from "next/link"
import { TopBar } from "@/components/chrome/TopBar"
import { chapters, CHAPTER_NUMERAL } from "@/content/chapters"
import { frameworks } from "@/content/frameworks"
import { useLearning } from "@/lib/store"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Target, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export default function HomePage() {
  const visited = useLearning((s) => s.visited)
  const completed = useLearning((s) => s.completed)
  const visitedSet = new Set(visited)
  const completedSet = new Set(completed)

  return (
    <>
      <TopBar />
      <main className="flex-1">
        {/* HERO */}
        <section className="border-b border-border bg-gradient-to-b from-background via-background to-secondary/40">
          <div className="mx-auto max-w-screen-xl px-4 py-16 lg:py-24">
            <div className="max-w-3xl space-y-6">
              <div className="text-[11px] uppercase tracking-[0.25em] text-accent font-bold">
                MBA & Consulting · 中文交互式课件
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                25 个 MBA 经典分析框架，
                <br className="hidden sm:block" />
                边学边练，一次掌握。
              </h1>
              <p className="text-base lg:text-lg leading-relaxed text-muted-foreground max-w-2xl">
                覆盖战略、营销、咨询、财务、组织变革、商业创新六大领域。每个框架都有逼真图表、可拖拽互动和案例测验——把厚厚的教材变成可上手的体验。
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild size="lg">
                  <Link href="/frameworks/swot">
                    从 SWOT 开始 <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#frameworks">浏览全部 25 个</Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border max-w-md">
                <Stat icon={BookOpen} label="经典框架" value="25" />
                <Stat icon={Target} label="互动 Widget" value="25" />
                <Stat icon={Zap} label="练习与测验" value="100+" />
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTERS */}
        <section className="mx-auto max-w-screen-xl px-4 py-16">
          <div className="flex items-baseline justify-between mb-8 flex-wrap gap-2">
            <h2 className="font-serif text-3xl font-bold">六大章节</h2>
            <span className="text-sm text-muted-foreground tabular-nums">
              已学 {visited.length} / 25 · 已通过 {completed.length}
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {chapters.map((ch) => {
              const list = frameworks.filter((f) => f.chapter === ch.id)
              const visitedCount = list.filter((f) =>
                visitedSet.has(f.slug)
              ).length
              return (
                <article
                  key={ch.id}
                  className="rounded-lg border border-border bg-card p-6 hover:border-accent/60 transition-colors"
                >
                  <div className="text-[11px] uppercase tracking-[0.2em] text-accent font-bold mb-2">
                    第 {CHAPTER_NUMERAL[ch.id]} 章
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-1">
                    {ch.nameZh}
                  </h3>
                  <div className="text-xs italic text-muted-foreground mb-3">
                    {ch.nameEn}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                    {ch.summary}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground tabular-nums">
                      {list.length} 个框架
                    </span>
                    <span className="tabular-nums text-foreground">
                      {visitedCount}/{list.length} 已学
                    </span>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* FRAMEWORK GRID */}
        <section id="frameworks" className="mx-auto max-w-screen-xl px-4 pb-24 scroll-mt-16">
          <h2 className="font-serif text-3xl font-bold mb-2">全部 25 个框架</h2>
          <p className="text-sm text-muted-foreground mb-8">
            点击进入任何一个开始学习。已浏览的标记为深色，已通过测验的标记金色 ✓。
          </p>

          {chapters.map((ch) => {
            const list = frameworks.filter((f) => f.chapter === ch.id)
            return (
              <div key={ch.id} className="mb-10">
                <h3 className="font-serif text-lg font-bold mb-4 flex items-baseline gap-3">
                  <span className="text-accent">
                    第 {CHAPTER_NUMERAL[ch.id]} 章
                  </span>
                  <span>{ch.nameZh}</span>
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((f) => {
                    const isVisited = visitedSet.has(f.slug)
                    const isCompleted = completedSet.has(f.slug)
                    const hasContent = f.definition.tldr !== ""
                    return (
                      <Link
                        key={f.slug}
                        href={`/frameworks/${f.slug}`}
                        className={cn(
                          "group rounded-lg border bg-card p-4 transition-all",
                          isCompleted
                            ? "border-accent/60"
                            : "border-border",
                          hasContent
                            ? "hover:border-accent hover:shadow-sm"
                            : "opacity-70 hover:opacity-100"
                        )}
                      >
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="tabular-nums text-xs text-muted-foreground">
                            {String(f.number).padStart(2, "0")}
                          </span>
                          {isCompleted && (
                            <Badge className="bg-accent text-accent-foreground hover:bg-accent">
                              ✓ 已通过
                            </Badge>
                          )}
                          {isVisited && !isCompleted && (
                            <Badge variant="outline">已学</Badge>
                          )}
                          {!hasContent && (
                            <Badge variant="outline" className="text-[10px]">
                              即将上线
                            </Badge>
                          )}
                        </div>
                        <div className="font-serif font-bold text-base mb-1 group-hover:text-accent transition-colors">
                          {f.nameZh}
                        </div>
                        <div className="text-xs italic text-muted-foreground mb-2">
                          {f.nameEn}
                        </div>
                        {f.tagline && (
                          <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                            {f.tagline}
                          </p>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </section>

        <footer className="border-t border-border bg-card/40 no-print">
          <div className="mx-auto max-w-screen-xl px-4 py-8 text-xs text-muted-foreground flex justify-between flex-wrap gap-4">
            <div>© 2026 MBA 经典框架交互课件 · 内容基于公开 MBA & 咨询经典模型</div>
            <div className="space-x-3">
              <Link href="/" className="hover:text-foreground">
                首页
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <div className="font-serif text-3xl font-bold tabular-nums">{value}</div>
    </div>
  )
}
