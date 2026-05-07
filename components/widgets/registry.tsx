import { SwotMatrix } from "./swot/SwotMatrix"
import { SwotDragQuiz } from "./swot/SwotDragQuiz"
import { PestelRadar } from "./pestel/PestelRadar"
import { PestelIntro } from "./pestel/PestelIntro"
import { FiveForcesDiagram } from "./porter5/FiveForcesDiagram"
import { Porter5Intro } from "./porter5/Porter5Intro"

interface WidgetSet {
  visualization?: React.ReactNode
  interactive?: React.ReactNode
}

export const widgetRegistry: Record<string, WidgetSet> = {
  swot: {
    visualization: <SwotMatrix />,
    interactive: <SwotDragQuiz />,
  },
  pestel: {
    visualization: <PestelIntro />,
    interactive: <PestelRadar />,
  },
  porter5: {
    visualization: <Porter5Intro />,
    interactive: <FiveForcesDiagram />,
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
