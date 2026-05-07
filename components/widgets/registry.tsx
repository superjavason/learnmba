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
import { PyramidDiagram } from "./pyramid/PyramidDiagram"
import { PyramidBuilder } from "./pyramid/PyramidBuilder"
import { MeceTree } from "./mece/MeceTree"
import { MeceJudgeQuiz } from "./mece/MeceJudgeQuiz"
import { HypothesisCycle } from "./hypothesis/HypothesisCycle"
import { HypothesisCase } from "./hypothesis/HypothesisCase"
import { ProfitTree } from "./issuetree/ProfitTree"
import { ProfitTreeIntro } from "./issuetree/ProfitTreeIntro"
import { ParetoChart } from "./pareto/ParetoChart"
import { ParetoIntro } from "./pareto/ParetoIntro"
import { SevenSNetwork } from "./sevens/SevenSNetwork"
import { SevenSIntro } from "./sevens/SevenSIntro"
import { DupontTree } from "./dupont/DupontTree"
import { DupontIntro } from "./dupont/DupontIntro"
import { BreakEvenChart } from "./breakeven/BreakEvenChart"
import { BreakEvenIntro } from "./breakeven/BreakEvenIntro"
import { NpvAnalysis } from "./npv/NpvAnalysis"
import { NpvIntro } from "./npv/NpvIntro"
import { BalancedScorecard } from "./bsc/BalancedScorecard"
import { BscDragQuiz } from "./bsc/BscDragQuiz"
import { KotterFlow } from "./kotter/KotterFlow"
import { KotterCase } from "./kotter/KotterCase"
import { RaciMatrix } from "./raci/RaciMatrix"
import { RaciIntro } from "./raci/RaciIntro"
import { BusinessModelCanvas } from "./canvas/BusinessModelCanvas"
import { CanvasFiller } from "./canvas/CanvasFiller"
import { DisruptiveTrajectory } from "./disruptive/DisruptiveTrajectory"
import { DisruptiveIntro } from "./disruptive/DisruptiveIntro"
import { DesignThinkingFlow } from "./designthinking/DesignThinkingFlow"
import { DesignThinkingCase } from "./designthinking/DesignThinkingCase"

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
  pyramid: {
    visualization: <PyramidDiagram />,
    interactive: <PyramidBuilder />,
  },
  mece: {
    visualization: <MeceTree />,
    interactive: <MeceJudgeQuiz />,
  },
  hypothesis: {
    visualization: <HypothesisCycle />,
    interactive: <HypothesisCase />,
  },
  issuetree: {
    visualization: <ProfitTreeIntro />,
    interactive: <ProfitTree />,
  },
  pareto: {
    visualization: <ParetoIntro />,
    interactive: <ParetoChart />,
  },
  sevens: {
    visualization: <SevenSIntro />,
    interactive: <SevenSNetwork />,
  },
  dupont: {
    visualization: <DupontIntro />,
    interactive: <DupontTree />,
  },
  breakeven: {
    visualization: <BreakEvenIntro />,
    interactive: <BreakEvenChart />,
  },
  npv: {
    visualization: <NpvIntro />,
    interactive: <NpvAnalysis />,
  },
  bsc: {
    visualization: <BalancedScorecard />,
    interactive: <BscDragQuiz />,
  },
  kotter: {
    visualization: <KotterFlow />,
    interactive: <KotterCase />,
  },
  raci: {
    visualization: <RaciIntro />,
    interactive: <RaciMatrix />,
  },
  canvas: {
    visualization: <BusinessModelCanvas />,
    interactive: <CanvasFiller />,
  },
  disruptive: {
    visualization: <DisruptiveIntro />,
    interactive: <DisruptiveTrajectory />,
  },
  designthinking: {
    visualization: <DesignThinkingFlow />,
    interactive: <DesignThinkingCase />,
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
