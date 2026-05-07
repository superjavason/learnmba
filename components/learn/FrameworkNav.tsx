"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { frameworks } from "@/content/frameworks"
import { Button } from "@/components/ui/button"

export function FrameworkNav({ slug }: { slug: string }) {
  const idx = frameworks.findIndex((f) => f.slug === slug)
  const prev = idx > 0 ? frameworks[idx - 1] : null
  const next = idx >= 0 && idx < frameworks.length - 1 ? frameworks[idx + 1] : null
  return (
    <nav className="flex items-stretch justify-between gap-4 border-t border-border pt-8 no-print">
      {prev ? (
        <Button asChild variant="ghost" className="h-auto py-3 justify-start text-left">
          <Link href={`/frameworks/${prev.slug}`}>
            <ChevronLeft className="mr-2 h-4 w-4 shrink-0" />
            <span>
              <span className="block text-[11px] text-muted-foreground">
                上一框架 · {String(prev.number).padStart(2, "0")}
              </span>
              <span className="block font-serif font-bold">{prev.nameZh}</span>
            </span>
          </Link>
        </Button>
      ) : (
        <div />
      )}
      {next ? (
        <Button asChild variant="ghost" className="h-auto py-3 justify-end text-right">
          <Link href={`/frameworks/${next.slug}`}>
            <span>
              <span className="block text-[11px] text-muted-foreground">
                下一框架 · {String(next.number).padStart(2, "0")}
              </span>
              <span className="block font-serif font-bold">{next.nameZh}</span>
            </span>
            <ChevronRight className="ml-2 h-4 w-4 shrink-0" />
          </Link>
        </Button>
      ) : (
        <div />
      )}
    </nav>
  )
}
