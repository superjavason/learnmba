import { notFound } from "next/navigation"
import { frameworks, getFramework } from "@/content/frameworks"
import { TopBar } from "@/components/chrome/TopBar"
import { FrameworkLayout } from "@/components/learn/FrameworkLayout"
import { getWidgets } from "@/components/widgets/registry"

export function generateStaticParams() {
  return frameworks.map((f) => ({ slug: f.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const framework = getFramework(slug)
  if (!framework) return { title: "未找到框架" }
  return {
    title: `${framework.nameZh} · MBA 经典框架`,
    description: framework.tagline || framework.definition.tldr,
  }
}

export default async function FrameworkPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const framework = getFramework(slug)
  if (!framework) notFound()

  const { visualization, interactive } = getWidgets(slug)

  return (
    <>
      <TopBar />
      <FrameworkLayout
        framework={framework}
        visualization={visualization}
        interactive={interactive}
      />
    </>
  )
}
