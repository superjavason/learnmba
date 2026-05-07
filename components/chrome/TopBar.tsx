"use client"

import Link from "next/link"
import { ChapterNav } from "./ChapterNav"
import { ProgressIndicator } from "./ProgressIndicator"

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70 no-print">
      <div className="mx-auto max-w-screen-2xl flex items-center gap-2 px-4 h-14">
        <ChapterNav />
        <Link
          href="/"
          className="font-serif font-bold text-base tracking-tight"
        >
          MBA 经典框架
          <span className="ml-2 text-[11px] font-sans font-normal text-muted-foreground hidden sm:inline">
            25 Frameworks
          </span>
        </Link>
        <div className="flex-1" />
        <ProgressIndicator />
      </div>
    </header>
  )
}
