"use client"

import { useLearning } from "@/lib/store"
import { Progress } from "@/components/ui/progress"

const TOTAL = 25

export function ProgressIndicator() {
  const visited = useLearning((s) => s.visited.length)
  const pct = Math.round((visited / TOTAL) * 100)
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground tabular-nums hidden sm:inline">
        {visited}/{TOTAL}
      </span>
      <Progress value={pct} className="h-1.5 w-20 sm:w-28" />
    </div>
  )
}
