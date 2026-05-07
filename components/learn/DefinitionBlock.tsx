"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

export function DefinitionBlock({
  tldr,
  details,
}: {
  tldr: string
  details: string[]
}) {
  const [open, setOpen] = useState(false)
  return (
    <section className="space-y-3">
      <p className="text-lg leading-relaxed font-serif">{tldr}</p>
      {open && details.length > 0 && (
        <div className="space-y-3 text-base leading-relaxed text-muted-foreground border-l-2 border-accent pl-4">
          {details.map((d, i) => (
            <p key={i}>{d}</p>
          ))}
        </div>
      )}
      {details.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setOpen(!open)}
          className="-ml-2"
        >
          {open ? (
            <>
              <ChevronUp className="mr-1 h-4 w-4" /> 收起
            </>
          ) : (
            <>
              <ChevronDown className="mr-1 h-4 w-4" /> 展开详情
            </>
          )}
        </Button>
      )}
    </section>
  )
}
