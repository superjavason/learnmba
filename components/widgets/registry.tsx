import { SwotMatrix } from "./swot/SwotMatrix"
import { SwotDragQuiz } from "./swot/SwotDragQuiz"

interface WidgetSet {
  visualization?: React.ReactNode
  interactive?: React.ReactNode
}

export const widgetRegistry: Record<string, WidgetSet> = {
  swot: {
    visualization: <SwotMatrix />,
    interactive: <SwotDragQuiz />,
  },
}

export function PlaceholderViz() {
  return (
    <div className="rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground text-sm">
      该框架的可视化即将上线
    </div>
  )
}

export function PlaceholderInteractive() {
  return (
    <div className="rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground text-sm">
      该框架的互动练习即将上线
    </div>
  )
}

export function getWidgets(slug: string): {
  visualization: React.ReactNode
  interactive: React.ReactNode
} {
  const w = widgetRegistry[slug]
  return {
    visualization: w?.visualization ?? <PlaceholderViz />,
    interactive: w?.interactive ?? <PlaceholderInteractive />,
  }
}
