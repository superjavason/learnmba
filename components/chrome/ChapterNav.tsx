"use client"

import Link from "next/link"
import { chapters, CHAPTER_NUMERAL } from "@/content/chapters"
import { frameworks } from "@/content/frameworks"
import { useLearning } from "@/lib/store"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Check, Circle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ChapterNav() {
  const visited = useLearning((s) => s.visited)
  const completed = useLearning((s) => s.completed)
  const visitedSet = new Set(visited)
  const completedSet = new Set(completed)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="目录">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[320px] sm:w-[380px] p-0">
        <SheetHeader className="px-6 pt-6 pb-2">
          <SheetTitle className="font-serif text-xl">课件目录</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-72px)] px-6 pb-8">
          <ul className="space-y-7">
            {chapters.map((ch) => (
              <li key={ch.id}>
                <div className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-1">
                  第 {CHAPTER_NUMERAL[ch.id]} 章
                </div>
                <h3 className="font-serif font-bold mb-3 text-base">{ch.nameZh}</h3>
                <ul className="space-y-1">
                  {frameworks
                    .filter((f) => f.chapter === ch.id)
                    .map((f) => {
                      const isVisited = visitedSet.has(f.slug)
                      const isCompleted = completedSet.has(f.slug)
                      return (
                        <li key={f.slug}>
                          <Link
                            href={`/frameworks/${f.slug}`}
                            className={cn(
                              "flex items-center gap-2.5 py-1.5 text-sm rounded-md hover:text-accent transition-colors",
                              isVisited
                                ? "text-foreground"
                                : "text-muted-foreground"
                            )}
                          >
                            {isCompleted ? (
                              <Check className="h-3.5 w-3.5 text-accent shrink-0" />
                            ) : (
                              <Circle
                                className={cn(
                                  "h-3 w-3 shrink-0",
                                  isVisited
                                    ? "fill-current text-foreground/60"
                                    : "text-muted-foreground/40"
                                )}
                              />
                            )}
                            <span className="tabular-nums text-[11px] text-muted-foreground/70 w-6 shrink-0">
                              {String(f.number).padStart(2, "0")}
                            </span>
                            <span className="leading-tight">{f.nameZh}</span>
                          </Link>
                        </li>
                      )
                    })}
                </ul>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
