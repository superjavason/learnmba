import { SwotMatrix } from "./swot/SwotMatrix"
import { SwotDragQuiz } from "./swot/SwotDragQuiz"
import { PestelRadar } from "./pestel/PestelRadar"
import { PestelIntro } from "./pestel/PestelIntro"
import { FiveForcesDiagram } from "./porter5/FiveForcesDiagram"
import { Porter5Intro } from "./porter5/Porter5Intro"
import { ValueChainDiagram } from "./valuechain/ValueChainDiagram"
import { ValueChainIntro } from "./valuechain/ValueChainIntro"
import { VrioFlow } from "./vrio/VrioFlow"
import { VrioIntro } from "./vrio/VrioIntro"
import { BcgBubbleChart } from "./bcg/BcgBubbleChart"
import { BcgIntro } from "./bcg/BcgIntro"
import { AnsoffMatrix } from "./ansoff/AnsoffMatrix"
import { AnsoffScenarioQuiz } from "./ansoff/AnsoffScenarioQuiz"
import { ErrcCanvas } from "./blueocean/ErrcCanvas"
import { ErrcIntro } from "./blueocean/ErrcIntro"
import { StpFlow } from "./stp/StpFlow"
import { PerceptualMap } from "./stp/PerceptualMap"
import { SevenPFlower } from "./marketingmix/SevenPFlower"
import { MarketingMixConfig } from "./marketingmix/MarketingMixConfig"

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
  valuechain: {
    visualization: <ValueChainIntro />,
    interactive: <ValueChainDiagram />,
  },
  vrio: {
    visualization: <VrioIntro />,
    interactive: <VrioFlow />,
  },
  bcg: {
    visualization: <BcgIntro />,
    interactive: <BcgBubbleChart />,
  },
  ansoff: {
    visualization: <AnsoffMatrix />,
    interactive: <AnsoffScenarioQuiz />,
  },
  blueocean: {
    visualization: <ErrcIntro />,
    interactive: <ErrcCanvas />,
  },
  stp: {
    visualization: <StpFlow />,
    interactive: <PerceptualMap />,
  },
  marketingmix: {
    visualization: <SevenPFlower />,
    interactive: <MarketingMixConfig />,
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
